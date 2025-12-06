# Railway Backend Deployment Guide

## Quick Deploy Steps

### Option 1: Railway Dashboard (Recommended - Easiest)

1. **Go to Railway Dashboard**
   - Visit https://railway.app
   - Sign up or log in (can use GitHub)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (if connected)
   - OR select "Empty Project" and we'll set it up manually

3. **Add Service**
   - Click "+ New" → "GitHub Repo"
   - Select your Crazy Friend repository
   - OR click "+ New" → "Empty Service"

4. **Configure Service**
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
   - **Health Check Path:** `/api/health`

5. **Set Environment Variables**
   Click on the service → Variables tab, add:
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=<generate-with-openssl-rand-hex-32>
   ENCRYPTION_KEY=<generate-with-openssl-rand-hex-16>
   OPENAI_API_KEY=<your-openai-key>
   ADMIN_EMAILS=<your-email@example.com>
   CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
   CRISIS_HOTLINE=988
   TOTP_ISSUER=Crazy Friend
   DATABASE_PATH=./data/crazyfriend.db
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. **Enable Persistent Storage**
   - Go to service settings
   - Enable "Persistent Storage" for `/app/server/data` directory
   - This keeps your SQLite database between deployments

7. **Deploy**
   - Railway will automatically detect and deploy
   - Wait for build to complete
   - Your backend will be live at: `https://your-project.up.railway.app`

8. **Get Backend URL**
   - Copy the generated URL from Railway dashboard
   - Update Vercel environment variable: `VITE_API_URL` = your Railway URL

### Option 2: Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd server
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set JWT_SECRET=$(openssl rand -hex 32)
   railway variables set ENCRYPTION_KEY=$(openssl rand -hex 16)
   railway variables set OPENAI_API_KEY=your-key-here
   railway variables set ADMIN_EMAILS=your-email@example.com
   railway variables set CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
   # ... set all other variables
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## Generate Secure Keys

```bash
# JWT Secret (64 characters)
openssl rand -hex 32

# Encryption Key (32 characters)
openssl rand -hex 16
```

## Important Configuration

### Persistent Storage
- **Path:** `/app/server/data` or `./data`
- **Purpose:** Keep SQLite database between deployments
- **How to enable:** Railway Dashboard → Service Settings → Persistent Storage

### Health Check
- **Path:** `/api/health`
- **Railway automatically monitors this**

### Port
- Railway automatically assigns a port via `PORT` environment variable
- Your app should use `process.env.PORT` (already configured)

## After Deployment

1. **Get Backend URL**
   - Railway Dashboard → Your Service → Settings → Domains
   - Copy the `.up.railway.app` URL

2. **Update Frontend API URL**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend.up.railway.app/api`
   - Redeploy frontend: `vercel --prod`

3. **Test Connection**
   - Visit: `https://your-backend.up.railway.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

4. **Test Free Question**
   - Visit your Vercel site
   - Click "Try One Question Free"
   - Should now work with real AI responses!

## Troubleshooting

### Build Fails
- Check Railway build logs
- Ensure `server/package.json` has correct build script
- Verify all dependencies are in `package.json`

### Database Issues
- Enable persistent storage
- Check file permissions
- Verify `DATABASE_PATH` is correct

### API Not Working
- Verify `CLIENT_URL` matches your Vercel URL
- Check CORS settings
- Verify environment variables are set

### Health Check Failing
- Check if server is starting correctly
- Verify `/api/health` route exists
- Check Railway logs for errors

## Cost

- **Free Tier:** $5 credit/month (usually enough for small apps)
- **Hobby Plan:** $5/month (if you exceed free tier)
- **For this app:** Likely **FREE** on free tier

## Next Steps

1. Deploy backend to Railway
2. Get backend URL
3. Update Vercel `VITE_API_URL` environment variable
4. Redeploy frontend
5. Test full application!

