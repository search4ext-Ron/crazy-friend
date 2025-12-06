# 🚂 Deploy to Railway NOW - Step by Step

## ⚡ Fastest Method (5 minutes)

### Step 1: Open Railway
**Go to:** https://railway.app

### Step 2: Sign Up / Login
- Click "Start a New Project" or "Login"
- **Best option:** Sign up with GitHub (one click)

### Step 3: Create Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub (if needed)
4. Select your **Crazy Friend** repository
5. Click **"Deploy Now"**

### Step 4: Configure Service
Railway will auto-detect Node.js, but you need to configure:

1. Click on the service that was created
2. Go to **Settings** tab
3. Scroll to **Service Settings**
4. Set these values:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`

### Step 5: Enable Persistent Storage
1. Still in **Settings** tab
2. Scroll to **Persistent Storage**
3. Click **"Add Persistent Storage"**
4. **Path:** `/app/server/data` or `./data`
5. Click **Save**

### Step 6: Set Environment Variables
1. Go to **Variables** tab
2. Click **"+ New Variable"** for each:

**Copy and paste these one by one:**

```
NODE_ENV = production
```

```
PORT = 3001
```

```
JWT_SECRET = acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
```

```
ENCRYPTION_KEY = f418860e5691f0038a0deb4adca4656c
```

```
OPENAI_API_KEY = <YOUR_OPENAI_KEY_HERE>
```
*(Replace with your actual OpenAI API key)*

```
ADMIN_EMAILS = <your-email@example.com>
```
*(Replace with your email)*

```
CLIENT_URL = https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
```

```
CRISIS_HOTLINE = 988
```

```
TOTP_ISSUER = Crazy Friend
```

```
DATABASE_PATH = ./data/crazyfriend.db
```

```
RATE_LIMIT_WINDOW_MS = 900000
```

```
RATE_LIMIT_MAX_REQUESTS = 100
```

### Step 7: Deploy
- Railway will **automatically deploy** when you save settings
- OR click **"Deploy"** button if available
- Wait 2-3 minutes for build to complete

### Step 8: Get Your Backend URL
1. Go to **Settings** → **Networking**
2. Find **"Public Domain"**
3. Copy the URL (e.g., `crazy-friend-production.up.railway.app`)
4. Your API will be at: `https://your-url.up.railway.app/api`

### Step 9: Connect Frontend
1. Go to **Vercel Dashboard:** https://vercel.com/dashboard
2. Select your **crazy-friend** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Set:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app/api`
   - **Environments:** Select all (Production, Preview, Development)
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click **"..."** on latest deployment → **"Redeploy"**

### Step 10: Test!
1. Visit: https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
2. Click **"🎁 Try One Question Free"**
3. Select a character
4. Ask a question
5. **It should work!** 🎉

## ✅ Verification

**Test Backend:**
- Visit: `https://your-railway-url.up.railway.app/api/health`
- Should return: `{"status":"ok","timestamp":"..."}`

**Test Free Question:**
- Should get real AI responses
- Audio should play
- Text should scroll

**Test Full App:**
- Register account
- Login
- Start chatting
- All features work!

## 🆘 Troubleshooting

**Build fails:**
- Check Railway **Deployments** → **View Logs**
- Verify Root Directory is `server`
- Check build command is correct

**Database issues:**
- Verify Persistent Storage is enabled
- Check path is `/app/server/data`

**API not connecting:**
- Verify `VITE_API_URL` is set in Vercel
- Check Railway URL is correct
- Verify CORS settings

**Health check fails:**
- Check Railway logs
- Verify environment variables are set
- Check if server started successfully

## 💰 Cost

- **FREE** on Railway free tier ($5 credit/month)
- Usually enough for small-medium apps
- You'll only pay if you exceed $5/month

## 🎉 Done!

Your full-stack app is now live:
- ✅ Frontend: Vercel
- ✅ Backend: Railway  
- ✅ Cost: $0/month

Enjoy your Crazy Friend app! 🚀

