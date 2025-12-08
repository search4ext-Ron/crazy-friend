# Update Vercel to Use Render Backend

## Step 1: Get Your Render URL

1. Go to https://dashboard.render.com
2. Click on your `crazy-friend` service
3. Go to **Settings** → **Networking**
4. Copy the **Public Domain** URL
   - Format: `https://crazy-friend-xxxxx.onrender.com`
   - Your API will be at: `https://crazy-friend-xxxxx.onrender.com/api`

## Step 2: Update Vercel Environment Variable

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your `crazy-friend` project
3. Go to **Settings** → **Environment Variables**
4. Find `VITE_API_URL` (or create it if it doesn't exist)
5. Update the value to: `https://YOUR-RENDER-URL.onrender.com/api`
   - Replace `YOUR-RENDER-URL` with your actual Render URL
6. Make sure all environments are selected:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
7. Click **Save**

### Option B: Via Vercel CLI

```bash
vercel env add VITE_API_URL production
# Enter: https://YOUR-RENDER-URL.onrender.com/api

vercel env add VITE_API_URL preview
# Enter: https://YOUR-RENDER-URL.onrender.com/api

vercel env add VITE_API_URL development
# Enter: https://YOUR-RENDER-URL.onrender.com/api
```

## Step 3: Redeploy Frontend

1. In Vercel dashboard, go to **Deployments** tab
2. Click **"..."** (three dots) on the latest deployment
3. Click **"Redeploy"**
   - OR run: `vercel --prod` in terminal

## Step 4: Verify It Works

1. Visit your Vercel site
2. Open browser console (F12)
3. Check Network tab - API calls should go to Render URL
4. Try "Ask Me Something" feature
5. Should connect to Render backend!

## What Changed

- **Before:** `VITE_API_URL` = `https://crazy-friend-production.up.railway.app/api`
- **After:** `VITE_API_URL` = `https://YOUR-RENDER-URL.onrender.com/api`

## Troubleshooting

### API Still Using Railway URL
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check Vercel environment variables are saved
- Verify redeploy completed

### CORS Errors
- Make sure `CLIENT_URL` in Render is set to your Vercel URL
- Format: `https://your-vercel-url.vercel.app`

### 404 Errors
- Verify Render service is "Live"
- Check Render URL is correct
- Test Render health endpoint directly

