# ⚡ Render.com Quick Start - Cheat Sheet

## 🎯 5-Minute Quick Setup

### 1. Sign Up & Connect
- Go to https://render.com
- Sign up with GitHub
- New → Web Service
- Connect `search4ext-Ron/crazy-friend` repo

### 2. Configure (Copy-Paste These)
- **Root Directory:** `server`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node dist/index.js`

### 3. Add Disk
- Add Disk → Mount Path: `/opt/render/project/src/server/data`
- Size: `1 GB`

### 4. Add Variables (See Full Guide for All Values)
- `NODE_ENV=production`
- `PORT=3001`
- `JWT_SECRET=acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293`
- `ENCRYPTION_KEY=f418860e5691f0038a0deb4adca4656c`
- `OPENAI_API_KEY=your-key` ⚠️
- `ADMIN_EMAILS=your-email` ⚠️
- `CLIENT_URL=your-vercel-url` ⚠️
- Plus 5 more (see full guide)

### 5. Deploy & Update Vercel
- Click "Create Web Service"
- Wait for deployment
- Copy Render URL
- Update Vercel `VITE_API_URL`
- Redeploy frontend

---

## 📚 Full Instructions
See **RENDER_DEPLOYMENT_GUIDE.md** for complete step-by-step guide with all details.

---

## ✅ That's It!

Your backend will be live and working!

