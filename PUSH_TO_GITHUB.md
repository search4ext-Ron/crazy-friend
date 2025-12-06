# Push to GitHub - Quick Guide

Your code is ready! Now push it to GitHub so Railway can see it.

## Option 1: Create GitHub Repo & Push (Recommended)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `crazy-friend` (or any name you like)
3. **Make it Private or Public** (your choice)
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

### Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Use these:

```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/crazy-friend.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Connect to Railway

1. Go back to Railway
2. Refresh the repository list
3. Your `crazy-friend` repository should now appear!
4. Select it and continue with deployment

---

## Option 2: Use Railway Empty Project (No GitHub Needed)

If you don't want to use GitHub, you can deploy directly:

### In Railway Dashboard:

1. Click "New Project"
2. Select **"Empty Project"**
3. Click **"+ New"** → **"Empty Service"**
4. Go to service **Settings**
5. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/index.js`
6. Enable **Persistent Storage** (path: `./data`)
7. Add environment variables
8. **Upload your code** or connect via Railway CLI

### Using Railway CLI:

```bash
# Login
railway login

# Navigate to server
cd "/Users/ronaldmoore/Cursor/Crazy Friend/server"

# Initialize
railway init

# Set variables (see RAILWAY_DEPLOY_NOW.md for all variables)
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
# ... (set all other variables)

# Deploy
railway up
```

---

## Which Should You Choose?

**Option 1 (GitHub):** 
- ✅ Easier to manage
- ✅ Version control
- ✅ Auto-deploy on push
- ✅ Better for collaboration

**Option 2 (Empty Project):**
- ✅ Faster (no GitHub needed)
- ✅ Good for quick testing
- ⚠️ Manual deployments

**Recommendation:** Use Option 1 (GitHub) for better long-term management.

---

## Quick Commands (After Creating GitHub Repo)

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
cd "/Users/ronaldmoore/Cursor/Crazy Friend"
git remote add origin https://github.com/YOUR_USERNAME/crazy-friend.git
git branch -M main
git push -u origin main
```

Then refresh Railway and your repo will appear!

