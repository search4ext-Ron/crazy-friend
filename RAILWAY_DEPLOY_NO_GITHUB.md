# Deploy to Railway Without GitHub (Alternative Method)

If your repository isn't on GitHub yet, here are two options:

## Option 1: Push to GitHub First (Recommended)

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. Name it: `crazy-friend` (or any name)
4. **Don't** initialize with README
5. Click "Create repository"

### Step 2: Push Your Code

Run these commands in your terminal:

```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend"

# Initialize git if not already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Crazy Friend app"

# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Railway

1. Go back to Railway
2. Refresh the repository list
3. Your repository should now appear
4. Select it and deploy!

---

## Option 2: Deploy Without GitHub (Railway CLI)

### Step 1: Login to Railway

```bash
railway login
```

### Step 2: Initialize Project

```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend/server"
railway init
```

### Step 3: Set Variables

```bash
railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set JWT_SECRET=acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
railway variables set ENCRYPTION_KEY=f418860e5691f0038a0deb4adca4656c
railway variables set OPENAI_API_KEY=your-key-here
railway variables set ADMIN_EMAILS=your-email@example.com
railway variables set CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
railway variables set CRISIS_HOTLINE=988
railway variables set TOTP_ISSUER="Crazy Friend"
railway variables set DATABASE_PATH=./data/crazyfriend.db
railway variables set RATE_LIMIT_WINDOW_MS=900000
railway variables set RATE_LIMIT_MAX_REQUESTS=100
```

### Step 4: Deploy

```bash
railway up
```

---

## Option 3: Empty Project + Manual Upload

1. In Railway, click "New Project"
2. Select "Empty Project"
3. Click "+ New" → "GitHub Repo"
4. If still no repos, click "Empty Service"
5. Go to Settings → Source
6. You can connect GitHub later or use Railway CLI

---

## Quick Fix: Create GitHub Repo Now

I can help you create and push to GitHub. Would you like me to:
1. Initialize git repository
2. Create a GitHub repository (you'll need to create it on GitHub.com)
3. Push the code

Or you can use Railway's "Empty Project" option and deploy via CLI.

Which method would you prefer?

