# Fix Offline Service - Step by Step

Your service exists but needs configuration! Let's fix it:

## Step 1: Open the Service (30 seconds)

1. **Click on the `crazy-friend` service** (the one showing as offline)
2. This will open the service dashboard

## Step 2: Configure Service Settings (2 minutes)

1. **Click the "Settings" tab** at the top

2. **Set Root Directory**
   - Scroll to **"Service Settings"** section
   - Find **"Root Directory"**
   - Change it to: `server`
   - It should auto-save

3. **Set Build Commands**
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
   - These might auto-detect, but verify they're correct

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

## Step 5: Deploy/Start the Service (1 minute)

1. **Go to Deployments Tab**
   - Click the **"Deployments"** tab
   - Or look for a **"Deploy"** or **"Redeploy"** button

2. **Trigger Deployment**
   - Click **"Redeploy"** or **"Deploy"** button
   - OR Railway might auto-deploy when you save settings
   - Watch the logs - it should start building

3. **Wait for Build**
   - Build takes 2-3 minutes
   - Watch the logs in the **"Logs"** tab
   - Status should change from "Offline" to "Building" to "Active"

## Step 6: Get Your Railway URL (30 seconds)

1. **Go to Settings → Networking**
   - Click **"Settings"** tab
   - Scroll to **"Networking"** section
   - You'll see a URL like: `https://crazy-friend-production-xxxx.up.railway.app`

2. **Copy the URL**
   - This is your backend API URL
   - Save it!

## Step 7: Connect Frontend (2 minutes)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your `crazy-friend` project

2. **Add Environment Variable**
   - Go to **Settings** → **Environment Variables**
   - Click **"+ Add New"**
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app/api`
     (Replace with your actual Railway URL from Step 6)
   - Select **Production**, **Preview**, and **Development**
   - Click **"Save"**

3. **Redeploy Frontend**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment → **"Redeploy"**

## ✅ Success!

Once the service shows as "Active" (green), your backend is live!

---

## 🆘 Troubleshooting

**If build fails:**
- Check the **Logs** tab for errors
- Verify Root Directory is `server`
- Make sure all environment variables are set

**If service stays offline:**
- Try clicking **"Redeploy"** again
- Check that Build Command and Start Command are correct
- Verify environment variables are saved

**If you see errors in logs:**
- Share the error message and I'll help fix it!

