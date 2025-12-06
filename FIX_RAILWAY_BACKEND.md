# Fix Railway Backend - Step by Step

## Current Issue
Backend at `https://crazy-friend-production.up.railway.app/api` is not responding.

## Quick Fix Steps

### Step 1: Check Railway Service Status

1. **Go to Railway Dashboard:** https://railway.app
2. **Click on your project** (crazy-friend)
3. **Check the service status:**
   - Is it showing **"Active"** (green) or **"Offline"** (gray)?
   - Look at the **Deployments** tab

### Step 2: If Service is Offline/Stopped

1. **Click on the service**
2. **Go to Settings tab**
3. **Check these settings:**
   - **Root Directory:** Should be `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
4. **Go to Variables tab** - Check if these are set:
   - `OPENAI_API_KEY` (REQUIRED - most important!)
   - `NODE_ENV=production`
   - `PORT=3001`
   - `JWT_SECRET`
   - `ENCRYPTION_KEY`
   - `DATABASE_PATH=./data/crazyfriend.db`
   - All other variables

### Step 3: Check Deployment Logs

1. **Go to Deployments tab**
2. **Click on the latest deployment**
3. **Check the logs** for errors:
   - Look for "Error" or "Failed"
   - Common issues:
     - Missing `OPENAI_API_KEY`
     - Database initialization errors
     - Port conflicts
     - Build failures

### Step 4: Redeploy Service

1. **If service is stopped:**
   - Click **"Redeploy"** or **"Deploy"** button
   - Wait 2-3 minutes for deployment

2. **If deployment fails:**
   - Check the error in logs
   - Fix the issue (usually missing environment variable)
   - Redeploy

### Step 5: Verify Service is Running

1. **Check service status** - should be "Active" (green)
2. **Test the health endpoint:**
   - Open: `https://crazy-friend-production.up.railway.app/api/health`
   - Should return: `{"status":"ok",...}`

3. **If health check works:**
   - Your backend is running!
   - The frontend should now work

### Step 6: Common Issues & Fixes

**Issue: "Application not found" (404)**
- Service might be deleted or URL changed
- Check Railway → Settings → Networking for correct URL
- Update Vercel `VITE_API_URL` if URL changed

**Issue: "Connection refused"**
- Service is not running
- Check Railway dashboard - is service Active?
- Redeploy if needed

**Issue: "Build failed"**
- Check deployment logs
- Usually missing environment variables
- Make sure `OPENAI_API_KEY` is set

**Issue: "Database error"**
- Check if Persistent Storage is enabled
- Path should be `./data` or `/app/server/data`
- Database might need initialization

## Quick Test Commands

Test if backend is accessible:
```bash
curl https://crazy-friend-production.up.railway.app/api/health
```

Should return:
```json
{"status":"ok","timestamp":"..."}
```

## After Backend is Running

1. **Test the health endpoint** (see above)
2. **Test characters endpoint:**
   - `https://crazy-friend-production.up.railway.app/api/characters`
   - Should return list of characters

3. **Test your frontend:**
   - Go to your Vercel site
   - Click "Ask Me Something"
   - Should work now!

## Still Not Working?

1. **Check Railway logs** for specific errors
2. **Verify all environment variables** are set
3. **Make sure service is "Active"** (green status)
4. **Try redeploying** the service

Need help? Share the error from Railway logs!

