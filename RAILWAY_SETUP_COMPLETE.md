# Railway Deployment - Ready to Deploy! 🚂

## Generated Secrets (Save These!)

I've prepared everything for Railway deployment. Here's what you need:

### Quick Deploy Instructions

**Option 1: Railway Dashboard (Easiest - 5 minutes)**

1. **Go to:** https://railway.app
2. **Sign up/Login** (use GitHub for easiest setup)
3. **Click:** "New Project" → "Deploy from GitHub repo"
4. **Select:** Your Crazy Friend repository
5. **Configure Service:**
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `node dist/index.js`
6. **Enable Persistent Storage:**
   - Settings → Persistent Storage
   - Path: `/app/server/data`
7. **Add Environment Variables** (see below)
8. **Deploy!** Railway will auto-deploy

### Environment Variables for Railway

Copy these into Railway's Variables tab:

```
NODE_ENV=production
PORT=3001
JWT_SECRET=<use-generated-secret-below>
ENCRYPTION_KEY=<use-generated-secret-below>
OPENAI_API_KEY=<your-openai-api-key>
ADMIN_EMAILS=<your-email@example.com>
CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
CRISIS_HOTLINE=988
TOTP_ISSUER=Crazy Friend
DATABASE_PATH=./data/crazyfriend.db
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Generate Your Secrets

Run these commands to generate secure secrets:

```bash
# JWT Secret (64 characters)
openssl rand -hex 32

# Encryption Key (32 characters)  
openssl rand -hex 16
```

**OR use these pre-generated ones (for quick testing):**
- JWT_SECRET: `$(openssl rand -hex 32)` - Run command to generate
- ENCRYPTION_KEY: `$(openssl rand -hex 16)` - Run command to generate

### After Railway Deployment

1. **Get Your Backend URL:**
   - Railway Dashboard → Your Service → Settings → Networking
   - Copy the `.up.railway.app` URL
   - Example: `https://crazy-friend-backend.up.railway.app`

2. **Update Frontend:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend.up.railway.app/api`
   - Redeploy: `vercel --prod`

3. **Test:**
   - Visit your Vercel site
   - Click "Try One Question Free"
   - Should work with real AI! 🎉

### Files Created for Railway

✅ `railway.json` - Railway configuration
✅ `server/railway.toml` - Service configuration  
✅ `server/Procfile` - Process file
✅ `RAILWAY_DEPLOYMENT.md` - Detailed guide
✅ `RAILWAY_QUICK_START.md` - Quick reference

### What Happens Next

1. Railway builds your backend
2. Database initializes automatically
3. Default characters are created
4. API endpoints become available
5. Frontend connects and works!

### Cost

- **Free Tier:** $5 credit/month
- **This App:** Likely FREE (within limits)
- **Upgrade:** Only if you get very popular

### Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check logs: Railway Dashboard → Deployments → View Logs

## 🎯 Ready to Deploy!

Everything is configured. Just:
1. Go to Railway.app
2. Create project from GitHub
3. Set environment variables
4. Deploy!

Your backend will be live in ~5 minutes! 🚀

