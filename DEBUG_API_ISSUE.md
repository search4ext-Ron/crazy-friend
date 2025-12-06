# Debugging API Connection Issue

## Problem
Characters show "Loading..." but never load. No error message.

## Likely Causes

1. **VITE_API_URL not set in Vercel**
   - Check Vercel → Settings → Environment Variables
   - Should be: `VITE_API_URL` = `https://crazy-friend-production.up.railway.app/api`

2. **Railway backend not running**
   - Check Railway dashboard → Deployments
   - Verify service is "Active" (green)

3. **CORS issues**
   - Backend might not allow requests from Vercel domain

4. **API endpoint not accessible**
   - Test: `https://crazy-friend-production.up.railway.app/api/characters`

## Quick Fix Steps

### Step 1: Verify Railway Backend
1. Go to Railway dashboard
2. Check if service is running
3. Check logs for errors
4. Test URL: `https://crazy-friend-production.up.railway.app/api/health`

### Step 2: Check Vercel Environment Variable
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Verify `VITE_API_URL` exists
4. Value should be: `https://crazy-friend-production.up.railway.app/api`
5. If missing, add it and redeploy

### Step 3: Test API Directly
Open browser console and run:
```javascript
fetch('https://crazy-friend-production.up.railway.app/api/characters')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Step 4: Check Browser Console
1. Open site
2. Open DevTools (F12)
3. Go to Console tab
4. Click "Ask Me Something"
5. Look for error messages
6. Check Network tab for failed requests

## Temporary Fix: Add Mock Characters

If API is down, we can add mock characters for testing.

