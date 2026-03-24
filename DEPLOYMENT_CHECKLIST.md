# Deployment Checklist ✅

## Backend (Railway)

- [x] `railway.toml` configured with correct health check
- [x] `Dockerfile` properly builds Spring Boot JAR
- [x] `application.yaml` uses Railway's auto-injected database env vars: `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`
- [x] `application-prod.yaml` (not used for Railway, but ready for other platforms)
- [x] SecurityConfig.java fixed with Spring Security 6+ syntax
- [x] CORS configured for `https://ctms-nu.vercel.app`

## Frontend (Vercel)

- [x] `vercel.json` configured to proxy `/api/*` requests to Railway backend
- [x] `frontend/src/services/api.js` uses `REACT_APP_API_BASE_URL=/api` (relative URL)
- [x] React app set to use relative paths for API calls

## Database (Railway)

- [x] PostgreSQL running on Railway
- [x] Auto-injected environment variables available

## Deployment Steps

### 1. Update Railway Backend URL in vercel.json
```bash
# Replace YOUR-RAILWAY-URL in frontend/vercel.json with your actual Railway backend URL
# Example: https://ctms-production.up.railway.app
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Fix CORS and deployment config"
git push
```

### 3. Railway will auto-deploy backend
- Watch Railway dashboard for build completion
- Note the public URL provided

### 4. Vercel will auto-deploy frontend
- It will pick up the updated vercel.json
- API calls will be proxied through Vercel to Railway

## Verify Deployment

1. Frontend: https://ctms-nu.vercel.app
2. Check browser console for API calls
3. Should see successful requests to `/api/*` endpoints
4. No more CORS errors ✅

## Key Fixes Applied

1. **CSRF Configuration**: Updated to Spring Security 6+ lambda syntax
2. **CORS Setup**: Properly configured for Vercel frontend origin
3. **API Proxying**: vercel.json now properly routes API calls to Railway backend
4. **Database Config**: Using Railway's auto-injected environment variables
5. **Documentation**: Updated to reflect Railway platform instead of Render

