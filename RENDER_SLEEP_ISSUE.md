# Render Free Tier Sleep Issue

## Problem
Render free tier services **sleep after 15 minutes of inactivity** and take 30-60 seconds to wake up on the first request.

## Symptoms
- First request times out or fails
- Subsequent requests work fine
- Error: "Cannot connect to server"

## Solutions

### Option 1: Wait for Service to Wake Up (Free)
- First request after sleep takes 30-60 seconds
- Subsequent requests are fast
- No cost, but slow first load

### Option 2: Upgrade to Starter Plan ($7/month)
- Services don't sleep
- Always responsive
- Better for production

### Option 3: Use Render Cron Job (Free)
- Set up a cron job to ping your service every 10 minutes
- Keeps service awake
- Free but uses some resources

## Immediate Fix

1. **Check Render Dashboard:**
   - Go to https://dashboard.render.com
   - Click on `crazy-friend` service
   - Check if status is "Live" or "Sleeping"
   - Check logs for startup messages

2. **Verify Environment Variables:**
   - Make sure `CLIENT_URL` is set to your Vercel URL
   - Format: `https://crazy-friend-xxxxx.vercel.app`
   - This is needed for CORS

3. **Test After Wake Up:**
   - Wait 30-60 seconds after first request
   - Try again - should work on second attempt

## CORS Configuration

The backend uses `CLIENT_URL` for CORS. Make sure it's set correctly in Render:
- **Name:** `CLIENT_URL`
- **Value:** Your Vercel URL (e.g., `https://crazy-friend-xxxxx.vercel.app`)

## Check Render Logs

1. Go to Render dashboard
2. Click on `crazy-friend` service
3. Go to **Logs** tab
4. Look for:
   - "Server running on port 3001"
   - Any CORS errors
   - Startup messages

