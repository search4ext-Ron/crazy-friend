# Backend Not Running - Quick Fix

## Problem
Getting "Failed to get response" error because Railway backend is not running.

## Solution Options

### Option 1: Start Railway Backend (Recommended)

1. **Go to Railway Dashboard:** https://railway.app
2. **Check your service:**
   - Is it showing as "Offline" or "Stopped"?
   - Click on the service
   - Check the **Deployments** tab
   - Look for errors in logs

3. **If service is stopped:**
   - Go to **Settings** → **Service Settings**
   - Make sure **Root Directory** is set to `server`
   - Make sure **Start Command** is `node dist/index.js`
   - Click **Redeploy** or **Deploy**

4. **Check Environment Variables:**
   - Go to **Variables** tab
   - Make sure all required variables are set:
     - `OPENAI_API_KEY` (most important!)
     - `JWT_SECRET`
     - `ENCRYPTION_KEY`
     - `DATABASE_PATH`
     - etc.

5. **Get the correct URL:**
   - Go to **Settings** → **Networking**
   - Copy the **Public Domain** URL
   - Should be like: `https://crazy-friend-xxxxx.up.railway.app`

6. **Update Vercel:**
   - Go to Vercel → Settings → Environment Variables
   - Update `VITE_API_URL` = `https://your-railway-url.up.railway.app/api`
   - Redeploy frontend

### Option 2: Test Backend Directly

Open browser console and test:
```javascript
// Test if backend is accessible
fetch('https://crazy-friend-production.up.railway.app/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test characters endpoint
fetch('https://crazy-friend-production.up.railway.app/api/characters')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Option 3: Check Railway Logs

1. Go to Railway dashboard
2. Click on your service
3. Go to **Deployments** tab
4. Click on latest deployment
5. Check **Logs** for errors

Common issues:
- Missing `OPENAI_API_KEY`
- Database not initialized
- Port conflicts
- Build failures

## Quick Status Check

Run this to check Railway status:
```bash
railway status
railway logs
```

## Next Steps

Once backend is running:
1. Test the health endpoint
2. Update Vercel `VITE_API_URL`
3. Redeploy frontend
4. Test the "Ask Me Something" feature

