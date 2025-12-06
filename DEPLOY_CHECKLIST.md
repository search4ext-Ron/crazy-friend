# 🚀 Railway Deployment Checklist

## Follow These Steps (5-10 minutes)

### ✅ Step 1: Railway Setup
- [ ] Go to https://railway.app
- [ ] Sign up/Login (GitHub recommended)
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your Crazy Friend repository

### ✅ Step 2: Configure Service
- [ ] Click on the created service
- [ ] Go to **Settings** tab
- [ ] Set **Root Directory:** `server`
- [ ] Set **Build Command:** `npm install && npm run build`
- [ ] Set **Start Command:** `node dist/index.js`

### ✅ Step 3: Persistent Storage
- [ ] In Settings → **Persistent Storage**
- [ ] Click "Add Persistent Storage"
- [ ] Set path: `/app/server/data`
- [ ] Save

### ✅ Step 4: Environment Variables
Go to **Variables** tab, add these (one by one):

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3001`
- [ ] `JWT_SECRET` = `acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293`
- [ ] `ENCRYPTION_KEY` = `f418860e5691f0038a0deb4adca4656c`
- [ ] `OPENAI_API_KEY` = `<your-openai-key>`
- [ ] `ADMIN_EMAILS` = `<your-email@example.com>`
- [ ] `CLIENT_URL` = `https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app`
- [ ] `CRISIS_HOTLINE` = `988`
- [ ] `TOTP_ISSUER` = `Crazy Friend`
- [ ] `DATABASE_PATH` = `./data/crazyfriend.db`
- [ ] `RATE_LIMIT_WINDOW_MS` = `900000`
- [ ] `RATE_LIMIT_MAX_REQUESTS` = `100`

### ✅ Step 5: Deploy
- [ ] Railway auto-deploys (or click Deploy)
- [ ] Wait for build (2-3 minutes)
- [ ] Check deployment logs for success

### ✅ Step 6: Get Backend URL
- [ ] Go to Settings → **Networking**
- [ ] Copy **Public Domain** URL
- [ ] Example: `https://crazy-friend.up.railway.app`
- [ ] Your API: `https://your-url.up.railway.app/api`

### ✅ Step 7: Connect Frontend
- [ ] Go to Vercel Dashboard
- [ ] Your project → Settings → Environment Variables
- [ ] Add: `VITE_API_URL` = `https://your-railway-url.up.railway.app/api`
- [ ] Redeploy frontend: `vercel --prod`

### ✅ Step 8: Test
- [ ] Visit: `https://your-railway-url.up.railway.app/api/health`
- [ ] Should return: `{"status":"ok"}`
- [ ] Test free question on your Vercel site
- [ ] Should work! 🎉

## Quick Links

- **Railway:** https://railway.app
- **Vercel:** https://vercel.com/dashboard
- **Your Frontend:** https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app

## Need Help?

See `RAILWAY_DEPLOY_NOW.md` for detailed step-by-step instructions.

