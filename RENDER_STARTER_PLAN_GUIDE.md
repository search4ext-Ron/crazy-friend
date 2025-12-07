# Render Starter Plan Deployment Guide

## ✅ You're Using: Render Starter Plan ($7/month)

This plan includes everything you need:
- ✅ Web service (24/7)
- ✅ 1 GB RAM
- ✅ 1 vCPU
- ✅ **10 GB persistent disk** (for your database)
- ✅ All features

**Cost:** $7/month

---

## Step-by-Step Deployment

### Step 1: Sign Up & Select Plan

1. Go to: **https://render.com**
2. Sign up with GitHub
3. When asked about plan, select **"Starter Plan"** ($7/month)
4. Add your credit card
5. You'll be charged $7/month (cancel anytime)

---

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect repository: **`search4ext-Ron/crazy-friend`**
3. Click **"Connect"**

---

### Step 3: Configure Service

**Basic Settings:**
- **Name:** `crazy-friend-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `server` ⚠️ **IMPORTANT!**

**Build & Start:**
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/index.js`

**Plan:**
- Select **"Starter"** plan ($7/month)
- This enables persistent disk access

---

### Step 4: Add Environment Variables

Add all 12 variables (see RENDER_ENV_VARIABLES.md for complete list):

1. `NODE_ENV` = `production`
2. `PORT` = `3001`
3. `JWT_SECRET` = `acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293`
4. `ENCRYPTION_KEY` = `f418860e5691f0038a0deb4adca4656c`
5. `OPENAI_API_KEY` = `your-actual-key` ⚠️
6. `ADMIN_EMAILS` = `your-email@example.com` ⚠️
7. `CLIENT_URL` = `https://your-vercel-url.vercel.app` ⚠️
8. `CRISIS_HOTLINE` = `988`
9. `TOTP_ISSUER` = `Crazy Friend`
10. `DATABASE_PATH` = `./data/crazyfriend.db`
11. `RATE_LIMIT_WINDOW_MS` = `900000`
12. `RATE_LIMIT_MAX_REQUESTS` = `100`

---

### Step 5: Add Persistent Disk

1. Scroll to **"Disk"** section
2. Click **"Add Disk"**
3. Fill in:
   - **Name:** `data-disk`
   - **Mount Path:** `/opt/render/project/src/server/data`
   - **Size:** `1 GB` (or up to 10 GB - you have 10 GB available)
4. Disk will be added to configuration

---

### Step 6: Deploy!

1. Scroll to bottom
2. Review all settings
3. Click **"Create Web Service"**
4. Wait 3-5 minutes for deployment
5. Watch build logs in real-time

---

### Step 7: Get Your Render URL

Once deployed:
1. At top of service page, you'll see your URL
2. Example: `https://crazy-friend-backend.onrender.com`
3. **Copy this URL**

---

### Step 8: Update Vercel

1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Update `VITE_API_URL` = `https://your-render-url.onrender.com/api`
4. Redeploy frontend

---

### Step 9: Test!

1. Go to your Vercel site
2. Click "Ask Me Something"
3. Should work now! 🎉

---

## 💰 Billing

- **Cost:** $7/month
- **Billed:** Monthly
- **Cancel:** Anytime (service stops, no further charges)
- **Upgrade:** Can upgrade to Standard ($25/mo) if needed later

---

## ✅ You're All Set!

Your backend will be live on Render Starter Plan with persistent storage!

