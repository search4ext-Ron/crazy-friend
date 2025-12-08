# Troubleshooting Render Connection

## Issue
Frontend showing error: "Cannot connect to server. The backend at https://crazy-friend-production.up.railway.app/api is not responding."

## Root Cause
The error message was showing the old Railway URL, but the actual issue might be:
1. Browser cache using old build
2. Environment variable not being picked up
3. Render backend not responding

## Solutions

### 1. Clear Browser Cache
- **Chrome/Edge:** Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- **Firefox:** Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- Select "Cached images and files"
- Click "Clear data"

### 2. Hard Refresh
- **Windows:** Ctrl+Shift+R or Ctrl+F5
- **Mac:** Cmd+Shift+R
- This forces browser to reload all assets

### 3. Check Vercel Environment Variable
1. Go to https://vercel.com/dashboard
2. Select `crazy-friend` project
3. Go to **Settings** → **Environment Variables**
4. Verify `VITE_API_URL` = `https://crazy-friend.onrender.com/api`
5. If incorrect, update it
6. Redeploy frontend

### 4. Test Render Backend Directly
Open browser console (F12) and run:
```javascript
// Test health endpoint
fetch('https://crazy-friend.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test characters endpoint
fetch('https://crazy-friend.onrender.com/api/characters')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### 5. Check Render Service Status
1. Go to https://dashboard.render.com
2. Click on `crazy-friend` service
3. Check status - should be "Live"
4. Check logs for any errors
5. Verify environment variables are set

### 6. Verify CORS Settings
Make sure in Render, the `CLIENT_URL` environment variable is set to your Vercel URL:
- Format: `https://crazy-friend-xxxxx.vercel.app`

## Expected Behavior
- Frontend should connect to: `https://crazy-friend.onrender.com/api`
- Error messages should be generic (not mention Railway)
- Backend should respond with health check

## Next Steps
1. Clear browser cache
2. Hard refresh page
3. Try "Ask Me Something" again
4. Check browser console (F12) for actual API calls
5. Verify the Network tab shows requests going to Render URL

