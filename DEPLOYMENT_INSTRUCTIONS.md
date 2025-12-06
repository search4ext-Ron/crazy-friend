# Complete Deployment Instructions

## Current Status

✅ **Frontend:** Deployed to Vercel
- URL: https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
- Status: Live with all features

⏳ **Backend:** Ready to deploy to Railway
- Status: Configured and ready
- Estimated time: 5-10 minutes

## Railway Backend Deployment

### Method 1: Railway Dashboard (Recommended)

1. **Visit:** https://railway.app
2. **Sign up/Login** (GitHub recommended)
3. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your Crazy Friend repository
   - OR click "Empty Project" and connect repo later

4. **Add Service:**
   - If using GitHub: Service auto-creates
   - If empty project: Click "+ New" → "GitHub Repo" → Select repo

5. **Configure Service:**
   - Click on the service
   - Go to **Settings** tab
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`

6. **Enable Persistent Storage:**
   - Settings → **Persistent Storage**
   - Click **Add Persistent Storage**
   - **Path:** `/app/server/data` or `./data`
   - This keeps your SQLite database

7. **Set Environment Variables:**
   Go to **Variables** tab, click **+ New Variable** for each:

   ```
   NODE_ENV = production
   PORT = 3001
   JWT_SECRET = <generate-with-openssl-rand-hex-32>
   ENCRYPTION_KEY = <generate-with-openssl-rand-hex-16>
   OPENAI_API_KEY = <your-openai-api-key>
   ADMIN_EMAILS = <your-email@example.com>
   CLIENT_URL = https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
   CRISIS_HOTLINE = 988
   TOTP_ISSUER = Crazy Friend
   DATABASE_PATH = ./data/crazyfriend.db
   RATE_LIMIT_WINDOW_MS = 900000
   RATE_LIMIT_MAX_REQUESTS = 100
   ```

   **Generate Secrets:**
   ```bash
   openssl rand -hex 32  # JWT_SECRET
   openssl rand -hex 16  # ENCRYPTION_KEY
   ```

8. **Deploy:**
   - Railway auto-deploys on save
   - OR click **Deploy** button
   - Wait 2-3 minutes for build

9. **Get Backend URL:**
   - Settings → **Networking**
   - Copy **Public Domain** (e.g., `crazy-friend.up.railway.app`)
   - Your API: `https://crazy-friend.up.railway.app/api`

### Method 2: Railway CLI

```bash
# Install CLI (if not installed)
npm install -g @railway/cli

# Login
railway login

# Navigate to server
cd server

# Initialize
railway init

# Set variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$(openssl rand -hex 32)
railway variables set ENCRYPTION_KEY=$(openssl rand -hex 16)
railway variables set OPENAI_API_KEY=your-key-here
railway variables set ADMIN_EMAILS=your-email@example.com
railway variables set CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
# ... set all other variables

# Deploy
railway up
```

## Connect Frontend to Backend

After Railway deployment:

1. **Get Railway Backend URL:**
   - From Railway dashboard
   - Example: `https://crazy-friend.up.railway.app`

2. **Update Vercel Environment Variable:**
   - Go to Vercel Dashboard
   - Your Project → Settings → Environment Variables
   - Add new variable:
     - **Name:** `VITE_API_URL`
     - **Value:** `https://your-backend.up.railway.app/api`
   - **Environment:** Production, Preview, Development (select all)

3. **Redeploy Frontend:**
   ```bash
   vercel --prod
   ```

   OR trigger redeploy from Vercel dashboard

## Verify Deployment

### Backend Health Check
Visit: `https://your-backend.up.railway.app/api/health`
Should return: `{"status":"ok","timestamp":"..."}`

### Test Free Question
1. Visit your Vercel site
2. Click "🎁 Try One Question Free"
3. Select a character
4. Ask a question
5. Should get real AI response!

### Test Full App
1. Register an account
2. Login
3. Start chatting
4. All features should work!

## Troubleshooting

### Backend Issues

**Build Fails:**
- Check Railway build logs
- Verify `server/package.json` has correct scripts
- Ensure all dependencies are listed

**Database Issues:**
- Verify persistent storage is enabled
- Check `DATABASE_PATH` variable
- Check file permissions in logs

**API Not Responding:**
- Check Railway deployment logs
- Verify environment variables are set
- Check health endpoint

### Frontend Issues

**API Calls Fail:**
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors
- Verify Railway backend is running
- Check Railway URL is correct

**Free Question Not Working:**
- Verify backend is deployed
- Check browser console for errors
- Verify `/api/free-question` endpoint exists
- Check Railway logs

## Cost Summary

- **Vercel Frontend:** FREE (forever)
- **Railway Backend:** FREE (within $5/month credit)
- **Total:** $0/month (for most use cases)

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Monitor Railway usage (dashboard shows credit usage)
3. ✅ Set up custom domain (optional)
4. ✅ Configure monitoring/alerts (optional)
5. ✅ Share your app! 🎉

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Project Files:**
  - `RAILWAY_DEPLOYMENT.md` - Detailed Railway guide
  - `RAILWAY_QUICK_START.md` - Quick reference
  - `VERCEL_DEPLOYMENT.md` - Vercel guide

## 🎉 You're Almost There!

Just deploy the backend to Railway and connect it to your frontend. The app will be fully functional!

