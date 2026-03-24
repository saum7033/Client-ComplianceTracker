# Cloud Deployment Guide - Railway + Vercel

## Architecture Overview
- **Frontend**: Vercel (React app)
- **Backend**: Railway (Spring Boot API)
- **Database**: Railway (PostgreSQL)

## Step 1: Railway Database Setup

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New Project" → "Provision PostgreSQL"
   - Choose "PostgreSQL" template
   - Railway automatically generates `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

## Step 2: Deploy Backend to Railway

1. **Connect Repository**
   - In Railway, click "New Project" → "Deploy from GitHub"
   - Select your `CTMS` repository
   - Railway automatically detects `railway.toml` in root directory

2. **Configure Service**
   - **Service Name**: `ctms-backend`
   - **Root Directory**: `backend` (configured in railway.toml)
   - Railway automatically sets Java environment

3. **Environment Variables**
   - Railway automatically injects: `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`
   - Your `application.yaml` automatically picks these up
   - Set: `PORT=8080` (for health checks)

4. **Get Backend URL**
   - Once deployed, Railway provides a public URL
   - Example: `https://ctms-production.up.railway.app`
   - Copy this for Vercel configuration

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
   - `REACT_APP_API_BASE_URL=/api` (uses Vercel rewrites to proxy)

## Step 4: Update vercel.json

Update `frontend/vercel.json` with your Railway backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://YOUR-RAILWAY-URL/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Replace `YOUR-RAILWAY-URL` with your actual Railway backend URL.

## Deployment Flow

1. Push to GitHub
2. Railway automatically builds & deploys backend
3. Vercel automatically builds & deploys frontend
4. Frontend requests to `/api/*` are proxied to Railway backend
5. Database connections handled automatically by Railway environment variables
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
