# Railway Backend Deployment - Quick Start

## 🚀 Fastest Way to Deploy

### Step 1: Create Railway Account & Project

1. Go to https://railway.app
2. Sign up with GitHub (easiest)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your Crazy Friend repository
6. Railway will auto-detect it's a Node.js project

### Step 2: Configure Service

1. Click on the service that was created
2. Go to **Settings** tab
3. Set **Root Directory** to: `server`
4. Set **Build Command** to: `npm install && npm run build`
5. Set **Start Command** to: `node dist/index.js`

### Step 3: Enable Persistent Storage

1. In service **Settings**
2. Scroll to **Persistent Storage**
3. Click **Add Persistent Storage**
4. Set path to: `/app/server/data` or `./data`
5. This keeps your database between deployments

### Step 4: Set Environment Variables

Go to **Variables** tab and add these:

**Required:**
```
NODE_ENV=production
PORT=3001
JWT_SECRET=<generate-64-char-secret>
ENCRYPTION_KEY=<generate-32-char-key>
OPENAI_API_KEY=<your-openai-key>
ADMIN_EMAILS=<your-email@example.com>
CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
```

**Optional (with defaults):**
```
CRISIS_HOTLINE=988
TOTP_ISSUER=Crazy Friend
DATABASE_PATH=./data/crazyfriend.db
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Generate Secrets:**
```bash
# Run these in terminal:
openssl rand -hex 32  # For JWT_SECRET
openssl rand -hex 16  # For ENCRYPTION_KEY
```

### Step 5: Deploy

1. Railway will automatically deploy when you:
   - Push to GitHub (if connected)
   - Or click **Deploy** button
2. Wait for build to complete (2-3 minutes)
3. Your backend will be live!

### Step 6: Get Backend URL

1. Go to service **Settings** → **Networking**
2. Copy the **Public Domain** (e.g., `your-project.up.railway.app`)
3. Your API will be at: `https://your-project.up.railway.app/api`

### Step 7: Connect Frontend

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-project.up.railway.app/api`
3. Redeploy frontend:
   ```bash
   vercel --prod
   ```

### Step 8: Test!

1. Visit your Vercel site
2. Click "Try One Question Free"
3. It should now work with real AI responses! 🎉

## ✅ Verification Checklist

- [ ] Backend deployed to Railway
- [ ] Health check works: `https://your-backend.up.railway.app/api/health`
- [ ] Environment variables set
- [ ] Persistent storage enabled
- [ ] Frontend `VITE_API_URL` updated
- [ ] Frontend redeployed
- [ ] Free question feature tested

## 🆘 Troubleshooting

**Build fails:**
- Check Railway build logs
- Verify `server/package.json` has build script
- Ensure all dependencies are listed

**Database issues:**
- Verify persistent storage is enabled
- Check `DATABASE_PATH` variable

**API not connecting:**
- Verify `CLIENT_URL` matches Vercel URL
- Check CORS settings
- Verify Railway URL is correct in `VITE_API_URL`

**Health check:**
- Visit: `https://your-backend.up.railway.app/api/health`
- Should return: `{"status":"ok","timestamp":"..."}`

## 💰 Cost

- **Free Tier:** $5 credit/month (usually enough!)
- **This app:** Likely **FREE** on free tier
- **Upgrade:** Only if you exceed $5/month

## 🎯 You're Done!

Your full-stack app is now live:
- **Frontend:** Vercel (already deployed)
- **Backend:** Railway (just deployed)
- **Total Cost:** $0/month (free tier)

Enjoy your fully functional Crazy Friend app! 🎉

