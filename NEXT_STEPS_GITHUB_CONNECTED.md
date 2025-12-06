# ✅ GitHub Connected! Next Steps

Since GitHub is already connected, let's deploy!

## Step 1: Create Project from GitHub (1 minute)

1. **In Railway Dashboard**
   - Click **"New Project"** (or the "+" button at the top)

2. **Select GitHub Repo**
   - Click **"Deploy from GitHub repo"**
   - Your repositories should load
   - Look for: **`search4ext-Ron/crazy-friend`**
   - Click on it

3. **Deploy**
   - Click **"Deploy Now"** or it may auto-deploy

## Step 2: Configure Service (2 minutes)

Once the service is created:

1. **Click on the Service**
   - Railway will create a service automatically
   - Click on it to open

2. **Go to Settings Tab**
   - Click the **"Settings"** tab at the top

3. **Set Root Directory**
   - Scroll to **"Service Settings"**
   - Find **"Root Directory"**
   - Change it to: `server`
   - It should auto-save

4. **Verify Build Commands**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
   - These should auto-detect, but verify

## Step 3: Enable Persistent Storage (1 minute)

1. **Still in Settings Tab**
   - Scroll down to **"Persistent Storage"** section

2. **Add Storage**
   - Click **"Add Persistent Storage"** or **"+ New"**
   - **Path:** `./data`
   - Click **"Save"**

## Step 4: Set Environment Variables (3 minutes)

1. **Go to Variables Tab**
   - Click the **"Variables"** tab at the top

2. **Add Each Variable**
   - Click **"+ New Variable"** for each one
   - Copy and paste these:

```
NODE_ENV = production
PORT = 3001
JWT_SECRET = acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
ENCRYPTION_KEY = f418860e5691f0038a0deb4adca4656c
OPENAI_API_KEY = YOUR_ACTUAL_OPENAI_KEY_HERE
ADMIN_EMAILS = your-email@example.com
CLIENT_URL = https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
CRISIS_HOTLINE = 988
TOTP_ISSUER = Crazy Friend
DATABASE_PATH = ./data/crazyfriend.db
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 100
```

⚠️ **IMPORTANT:** Replace:
- `YOUR_ACTUAL_OPENAI_KEY_HERE` with your real OpenAI API key
- `your-email@example.com` with your actual email

## Step 5: Get Railway URL (30 seconds)

1. **Go to Settings → Networking**
   - Click **"Settings"** tab
   - Scroll to **"Networking"** section
   - You'll see a URL like: `https://crazy-friend-production-xxxx.up.railway.app`

2. **Copy the URL**
   - This is your backend API URL
   - Save it for the next step!

## Step 6: Connect Frontend (2 minutes)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your `crazy-friend` project

2. **Add Environment Variable**
   - Go to **Settings** → **Environment Variables**
   - Click **"+ Add New"**
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app/api`
     (Replace with your actual Railway URL from Step 5)
   - Select **Production**, **Preview**, and **Development**
   - Click **"Save"**

3. **Redeploy Frontend**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment → **"Redeploy"**
   - OR run: `vercel --prod` in terminal

## ✅ You're Done!

Your backend will be live on Railway and connected to your Vercel frontend!

---

## 🆘 If Repository Still Doesn't Appear

- Wait 10-20 seconds and refresh the page
- Try clicking "Deploy from GitHub repo" again
- Check that the repo exists: https://github.com/search4ext-Ron/crazy-friend

