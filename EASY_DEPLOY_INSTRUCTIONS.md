# 🚀 Easy Deployment - I'll Do Most of It!

Since the dashboard is complicated, let's use the command line. I've created an automated script!

## Step 1: One-Time Login (30 seconds)

Open your terminal and run:

```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend/server"
railway login
```

This will:
- Open your browser once
- Ask you to authorize Railway CLI
- Click "Authorize" or "Allow"
- That's it! You're logged in.

## Step 2: Run the Automated Script

After logging in, run:

```bash
./deploy-railway-auto.sh
```

This script will automatically:
- ✅ Link to your Railway project
- ✅ Set all environment variables
- ✅ Configure the service
- ✅ Deploy everything

## Step 3: Set Two Variables Manually

The script will remind you, but you need to set:

```bash
railway variables set OPENAI_API_KEY=your-actual-openai-key-here
railway variables set ADMIN_EMAILS=your-email@example.com
```

Replace with your real values!

## Step 4: Get Your Railway URL

```bash
railway domain
```

Copy this URL - you'll need it for Vercel!

## Step 5: Update Vercel (I can help with this)

1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add/Update: `VITE_API_URL` = `https://your-railway-url.up.railway.app/api`
4. Redeploy frontend

---

## That's It!

Much simpler than clicking through the dashboard! 

**Want me to help you run these commands?** Just say "yes" and I'll guide you through each step, or you can copy-paste the commands above.

