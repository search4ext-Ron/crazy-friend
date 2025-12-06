# ✅ Railway URL Ready!

## Your Railway Backend URL:
**https://crazy-friend-production.up.railway.app**

## Next Steps:

### 1. Set Environment Variables in Railway Dashboard

Since the CLI syntax changed, let's use the dashboard:

1. Go to Railway dashboard
2. Click on your `crazy-friend` service
3. Go to **Variables** tab
4. Add these variables (click "Add" for each):

```
NODE_ENV = production
PORT = 3001
JWT_SECRET = acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
ENCRYPTION_KEY = f418860e5691f0038a0deb4adca4656c
CLIENT_URL = https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
CRISIS_HOTLINE = 988
TOTP_ISSUER = Crazy Friend
DATABASE_PATH = ./data/crazyfriend.db
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 100
OPENAI_API_KEY = your-actual-openai-key-here
ADMIN_EMAILS = your-email@example.com
```

### 2. Update Vercel Frontend

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Select your `crazy-friend` project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://crazy-friend-production.up.railway.app/api`
   - Select **Production**, **Preview**, and **Development**
   - Click **Save**

### 3. Redeploy Frontend

1. In Vercel, go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
   - OR run: `vercel --prod` in terminal

### 4. Test It!

1. Go to your Vercel site
2. Try the "Try One Question Free" feature
3. It should connect to your Railway backend!

---

## ✅ Summary

- ✅ Railway project linked
- ✅ Railway URL: https://crazy-friend-production.up.railway.app
- ⏳ Need to: Set variables in Railway dashboard
- ⏳ Need to: Update Vercel VITE_API_URL
- ⏳ Need to: Redeploy frontend

---

## 🎉 Almost Done!

Just set the variables in Railway dashboard and update Vercel, then you're live!

