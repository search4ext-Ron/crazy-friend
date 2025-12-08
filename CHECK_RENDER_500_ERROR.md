# Troubleshooting Render 500 Error

## Issue
Getting "Server error (500)" from Render backend.

## Common Causes

### 1. Missing Environment Variables
Check Render dashboard → Settings → Environment Variables:

**Required:**
- ✅ `OPENAI_API_KEY` - Most common cause of 500 errors
- ✅ `JWT_SECRET` - Must be at least 32 characters
- ✅ `ENCRYPTION_KEY` - Must be at least 32 characters
- ✅ `DATABASE_PATH` - Usually `./data/crazyfriend.db`
- ✅ `CLIENT_URL` - Your Vercel URL

**Optional but recommended:**
- `NODE_ENV=production`
- `PORT=3001`
- `CRISIS_HOTLINE=988`
- `TOTP_ISSUER=Crazy Friend`
- `RATE_LIMIT_WINDOW_MS=900000`
- `RATE_LIMIT_MAX_REQUESTS=100`
- `ADMIN_EMAILS=your-email@example.com`

### 2. Database Not Initialized
- Check Render logs for database errors
- Database should auto-initialize on first start
- Verify persistent disk is mounted correctly

### 3. OpenAI API Key Issues
- Key might be invalid or expired
- Check OpenAI dashboard for key status
- Make sure key has credits/quota

### 4. CORS Issues (Less Likely Now)
- Should be fixed with latest CORS update
- Verify `CLIENT_URL` matches your Vercel URL

## How to Check Render Logs

1. Go to https://dashboard.render.com
2. Click on `crazy-friend` service
3. Go to **Logs** tab
4. Look for:
   - Error messages (red text)
   - "Missing required environment variables"
   - "Database initialization failed"
   - "OpenAI API error"
   - Stack traces

## Quick Fixes

### Fix 1: Add Missing Environment Variables
1. Go to Render → Settings → Environment Variables
2. Add any missing variables from the list above
3. Redeploy service

### Fix 2: Verify OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Check if your key is active
3. Check if you have credits/quota
4. Copy the key and add to Render

### Fix 3: Check Database
1. Check Render logs for database errors
2. Verify persistent disk is mounted
3. Service should auto-create database on first run

## Test Backend Directly

Open browser console (F12) and run:
```javascript
// Test health endpoint
fetch('https://crazy-friend.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test free question endpoint
fetch('https://crazy-friend.onrender.com/api/free-question', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'Test question',
    characterId: 1
  })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Next Steps

1. Check Render logs for specific error
2. Verify all environment variables are set
3. Test backend endpoints directly
4. Share the error from Render logs so I can help fix it

