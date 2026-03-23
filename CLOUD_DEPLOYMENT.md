# Cloud Deployment Guide - Render + Vercel + Railway

## Architecture Overview
- **Frontend**: Vercel (React app)
- **Backend**: Render (Spring Boot API)
- **Database**: Railway (PostgreSQL)

## Step 1: Set Up Railway Database

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New Project" → "Provision PostgreSQL"
   - Choose "PostgreSQL" template
   - Name it: `ctms-database`

3. **Get Database Credentials**
   - Go to your database service
   - Click "Connect" tab
   - Copy the DATABASE_URL
   - Note the connection details

## Step 2: Deploy Backend to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `CTMS` repository

3. **Configure Service**
   - **Name**: `ctms-backend`
   - **Environment**: `Docker`
   - **Root Directory**: `backend`
   - **Plan**: Free
   - **Add Environment Variables**:
     ```
     DB_URL=your_railway_database_url
     DB_USERNAME=your_railway_username
     DB_PASSWORD=your_railway_password
     JAVA_OPTS=-Xmx512m
     ```

4. **Deploy Settings**
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
   - **Health Check Path**: `/api/clients`

## Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `CTMS` repository
   - **Root Directory**: `frontend`

3. **Configure Settings**
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install --legacy-peer-deps`

4. **Environment Variables**
   - Add: `REACT_APP_API_BASE_URL=/api`

5. **Update Backend URL**
   - In `frontend/vercel.json`, update the backend URL:
   ```json
   "dest": "https://your-render-app-url.onrender.com/api/$1"
   ```

## Step 4: Update Vercel Routes

After deploying your backend to Render:

1. **Get Backend URL**
   - Go to your Render dashboard
   - Copy your backend URL (e.g., `https://ctms-backend.onrender.com`)

2. **Update vercel.json**
   ```json
   {
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "https://ctms-backend.onrender.com/api/$1"
       }
     ]
   }
   ```

3. **Redeploy Frontend**
   - Push changes to GitHub
   - Vercel will automatically redeploy

## Environment Variables Summary

### Railway (Database)
- Automatically generated DATABASE_URL

### Render (Backend)
```
DB_URL=railway_database_url
DB_USERNAME=railway_username  
DB_PASSWORD=railway_password
JAVA_OPTS=-Xmx512m
```

### Vercel (Frontend)
```
REACT_APP_API_BASE_URL=/api
```

## Access URLs

After deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.onrender.com`
- **Database**: Railway dashboard

## Free Tier Limitations

### Render Free Tier
- Auto-sleeps after 15 minutes of inactivity
- Cold start takes ~30 seconds
- Limited to 750 hours/month

### Vercel Free Tier
- Unlimited static sites
- 100GB bandwidth/month
- Serverless functions for API proxy

### Railway Free Tier
- $5 credit monthly (sufficient for small apps)
- Database sleeps after inactivity
- 500MB storage

## Troubleshooting

### Backend Connection Issues
- Verify Railway DATABASE_URL is correct
- Check Render environment variables
- Ensure backend health check passes

### Frontend API Issues
- Verify Vercel routes configuration
- Check backend URL in vercel.json
- Ensure CORS is configured properly

### Database Issues
- Railway database may be sleeping
- Check connection string format
- Verify credentials are correct

## Production Optimizations

1. **Remove Debug Logs**: Comment out console.log statements
2. **Add Error Handling**: Implement proper error boundaries
3. **Enable Caching**: Add appropriate cache headers
4. **Monitor Usage**: Set up alerts for resource usage
5. **Backup Database**: Regular Railway database backups

## Next Steps

1. Set up custom domains
2. Implement SSL (automatically provided)
3. Add monitoring and logging
4. Set up CI/CD pipelines
5. Consider scaling to paid tiers if needed
