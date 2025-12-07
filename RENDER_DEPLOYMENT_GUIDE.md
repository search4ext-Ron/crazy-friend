# 🚀 Render.com Deployment Guide - Step by Step

## Overview
This guide will help you deploy your Crazy Friend backend to Render.com, which is easier and more reliable than Railway.

---

## 📋 Prerequisites
- GitHub account (your code is already there: `search4ext-Ron/crazy-friend`)
- Render.com account (free signup)
- 15-20 minutes

---

## Step 1: Sign Up for Render (2 minutes)

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (easiest option)
4. Authorize Render to access your GitHub repositories

---

## Step 2: Create New Web Service (3 minutes)

1. In Render dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. You'll see "Connect a repository"
4. Find and select: **`search4ext-Ron/crazy-friend`**
5. Click **"Connect"**

---

## Step 3: Configure Service Settings (5 minutes)

After connecting, you'll see configuration options. Fill these in:

### Basic Settings:
- **Name:** `crazy-friend-backend` (or any name you like)
- **Region:** Choose closest to you (e.g., `Oregon (US West)` or `Ohio (US East)`)
- **Branch:** `main` (should be default)
- **Root Directory:** `server` ⚠️ **IMPORTANT!**

### Build & Start:
- **Runtime:** `Node`
- **Build Command:** 
  ```
  npm install && npm run build
  ```
- **Start Command:**
  ```
  node dist/index.js
  ```

### Advanced Settings (click "Advanced"):
- **Auto-Deploy:** `Yes` (deploys automatically on git push)

---

## Step 4: Add Environment Variables (5 minutes)

Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"** for each:

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
OPENAI_API_KEY = YOUR_ACTUAL_OPENAI_API_KEY_HERE
```
⚠️ **Replace with your real OpenAI API key!**

```
ADMIN_EMAILS = your-email@example.com
```
⚠️ **Replace with your actual email!**

```
CLIENT_URL = https://crazy-friend-XXXXX.vercel.app
```
⚠️ **Replace with your actual Vercel URL!**

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

---

## Step 5: Add Persistent Disk (2 minutes)

**IMPORTANT:** This is needed for your SQLite database!

1. Scroll to **"Disk"** section
2. Click **"Add Disk"** button
3. Fill in:
   - **Name:** `data-disk` (or any name)
   - **Mount Path:** `/opt/render/project/src/server/data`
   - **Size:** `1 GB` (free tier allows this)
4. The disk will be added to your configuration
   - **Note:** You don't need to "Save" separately - everything saves when you click "Create Web Service" at the end!

---

## Step 6: Deploy! (3 minutes)

1. Scroll to the bottom of the page
2. Review all your settings:
   - ✅ Root Directory: `server`
   - ✅ Build Command: `npm install && npm run build`
   - ✅ Start Command: `node dist/index.js`
   - ✅ Environment Variables: All 12 added
   - ✅ Disk: Added with correct mount path
3. Click **"Create Web Service"** (or **"Deploy"** button)
   - **This saves ALL your settings at once!**
4. Render will start building and deploying
5. Wait 3-5 minutes for deployment to complete
6. You'll see build logs in real-time

---

## Step 7: Get Your Render URL (1 minute)

Once deployment is complete:

1. At the top of the service page, you'll see:
   - **"Your service is live at:"**
   - URL like: `https://crazy-friend-backend.onrender.com`
2. **Copy this URL** - you'll need it for the next step!

---

## Step 8: Update Vercel Frontend (2 minutes)

1. Go to **Vercel Dashboard:** https://vercel.com/dashboard
2. Select your **`crazy-friend`** project
3. Go to **Settings** → **Environment Variables**
4. Find or add: **`VITE_API_URL`**
5. Update the value to: `https://your-render-url.onrender.com/api`
   (Replace with your actual Render URL from Step 7)
6. Make sure it's enabled for **Production**, **Preview**, and **Development**
7. Click **"Save"**

---

## Step 9: Redeploy Frontend (1 minute)

1. In Vercel, go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

---

## Step 10: Test It! (2 minutes)

1. Go to your Vercel site
2. Click **"Ask Me Something"** button
3. Type or speak a question
4. **It should work now!** 🎉

---

## ✅ Verification Checklist

- [ ] Render service is "Live" (green status)
- [ ] Build completed successfully (check logs)
- [ ] Environment variables all set
- [ ] Persistent disk added
- [ ] Render URL copied
- [ ] Vercel `VITE_API_URL` updated
- [ ] Frontend redeployed
- [ ] Tested "Ask Me Something" feature

---

## 🆘 Troubleshooting

### Build Fails:
- Check build logs in Render
- Verify Root Directory is `server`
- Verify Build Command is correct
- Check for TypeScript errors (should be fixed now)

### Service Won't Start:
- Check deployment logs
- Verify Start Command: `node dist/index.js`
- Check environment variables are set
- Verify PORT is set to `3001`

### Database Issues:
- Verify persistent disk is mounted
- Check DATABASE_PATH is `./data/crazyfriend.db`
- Check disk mount path is correct

### Frontend Can't Connect:
- Verify `VITE_API_URL` in Vercel matches Render URL
- Make sure URL ends with `/api`
- Check Render service is running (green status)
- Test Render URL directly: `https://your-url.onrender.com/api/health`

---

## 📊 Render Free Tier Limits

- **750 hours/month** (enough for 24/7 operation)
- **512 MB RAM** (plenty for your app)
- **1 GB disk** (enough for SQLite database)
- **Auto-sleeps after 15 min inactivity** (wakes on request)

**Note:** First request after sleep takes ~30 seconds (cold start). Subsequent requests are fast.

---

## 💰 Cost

**FREE!** Render's free tier is very generous and should be enough for your app.

---

## 🎯 Quick Reference

**Render Service URL Format:**
```
https://crazy-friend-backend.onrender.com
```

**API Endpoints:**
```
https://crazy-friend-backend.onrender.com/api/health
https://crazy-friend-backend.onrender.com/api/characters
https://crazy-friend-backend.onrender.com/api/free-question
```

**Vercel Environment Variable:**
```
VITE_API_URL = https://crazy-friend-backend.onrender.com/api
```

---

## 🚀 You're Ready!

Follow these steps tomorrow and your backend will be live on Render.com!

**Estimated Time:** 15-20 minutes total

**Need Help?** If you get stuck on any step, let me know and I'll help you through it!

---

## 📝 Notes

- Render auto-deploys when you push to GitHub
- Build logs are visible in real-time
- Service automatically restarts if it crashes
- Free tier includes everything you need

Good luck! 🎉

