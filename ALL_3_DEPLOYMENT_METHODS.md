# 🚀 All 3 Methods to Deploy to Railway

## METHOD 1: Railway CLI (Command Line) ⚡

**Best for:** Quick deployment if you're comfortable with terminal

### Step 1: Login to Railway CLI
```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend/server"
railway login
```
This will open your browser to authorize Railway.

### Step 2: Initialize Project
```bash
railway init
```
- Choose "Create new project" or "Link to existing project"
- Name it: `crazy-friend-backend`

### Step 3: Set Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set JWT_SECRET=acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
railway variables set ENCRYPTION_KEY=f418860e5691f0038a0deb4adca4656c
railway variables set OPENAI_API_KEY=your-openai-api-key-here
railway variables set ADMIN_EMAILS=your-email@example.com
railway variables set CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
railway variables set CRISIS_HOTLINE=988
railway variables set TOTP_ISSUER="Crazy Friend"
railway variables set DATABASE_PATH=./data/crazyfriend.db
railway variables set RATE_LIMIT_WINDOW_MS=900000
railway variables set RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** Replace `your-openai-api-key-here` and `your-email@example.com` with real values!

### Step 4: Enable Persistent Storage
```bash
railway add --volume ./data
```

### Step 5: Deploy
```bash
railway up
```

### Step 6: Get Your URL
```bash
railway domain
```
Copy the URL - you'll need it for Vercel!

---

## METHOD 2: Fix GitHub Connection (Dashboard) 🔗

**Best for:** Visual interface, auto-deploy on git push

### Step 1: Connect GitHub in Railway
1. Go to: https://railway.app
2. Click your **profile icon** (top right)
3. Click **"Settings"**
4. Find **"GitHub"** or **"Connected Accounts"**
5. Click **"Connect GitHub"** or **"Reconnect"**
6. Authorize Railway
7. **IMPORTANT:** Grant access to **ALL repositories** (or at least `crazy-friend`)
8. If your repo is **Private**, make sure Railway has access to private repos

### Step 2: Create Project from GitHub
1. Go back to Railway dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Your `crazy-friend` repo should now appear!
5. Select it and click **"Deploy Now"**

### Step 3: Configure Service
1. Click on the service that was created
2. Go to **Settings** tab
3. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`

### Step 4: Enable Persistent Storage
1. In **Settings** tab
2. Scroll to **Persistent Storage**
3. Click **"Add Persistent Storage"**
4. **Path:** `./data`
5. Click **Save**

### Step 5: Set Environment Variables
1. Go to **Variables** tab
2. Click **"+ New Variable"** for each:

```
NODE_ENV = production
PORT = 3001
JWT_SECRET = acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
ENCRYPTION_KEY = f418860e5691f0038a0deb4adca4656c
OPENAI_API_KEY = your-openai-api-key-here
ADMIN_EMAILS = your-email@example.com
CLIENT_URL = https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
CRISIS_HOTLINE = 988
TOTP_ISSUER = Crazy Friend
DATABASE_PATH = ./data/crazyfriend.db
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 100
```

**Important:** Replace `your-openai-api-key-here` and `your-email@example.com` with real values!

### Step 6: Get Your URL
1. Go to **Settings** → **Networking**
2. Copy the **Railway URL** (e.g., `https://crazy-friend-production.up.railway.app`)
3. You'll need this for Vercel!

---

## METHOD 3: Empty Project (No GitHub) 📦

**Best for:** When GitHub connection isn't working

### Step 1: Create Empty Project
1. Go to: https://railway.app
2. Click **"New Project"**
3. Select **"Empty Project"**
4. Name it: `crazy-friend-backend`

### Step 2: Create Service
1. Click **"+ New"**
2. Select **"Empty Service"**

### Step 3: Connect GitHub (Optional)
1. Click on the service
2. Go to **Settings** → **Source**
3. Click **"Connect GitHub"**
4. Select your `crazy-friend` repository
5. Set **Root Directory:** `server`

**OR** use Railway CLI to deploy:
```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend/server"
railway login
railway link  # Links to the empty project you just created
railway up
```

### Step 4: Configure Service
Same as Method 2, Step 3-6:
- Set Root Directory: `server`
- Set Build/Start commands
- Enable Persistent Storage
- Set Environment Variables
- Get Railway URL

---

## ✅ After Any Method: Connect Frontend

Once you have your Railway URL:

1. Go to Vercel dashboard
2. Select your `crazy-friend` project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   - `VITE_API_URL` = `https://your-railway-url.up.railway.app/api`
5. **Redeploy** frontend:
   ```bash
   vercel --prod
   ```

---

## 🎯 Which Method Should You Use?

- **Method 1 (CLI):** Fastest if you're comfortable with terminal
- **Method 2 (GitHub):** Best for auto-deploy on git push
- **Method 3 (Empty):** Fallback when GitHub connection fails

**Recommendation:** Try Method 2 first (fix GitHub connection), it's the easiest long-term!

