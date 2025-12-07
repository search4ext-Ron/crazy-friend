# Use Nixpacks Instead of Dockerfile in Render

## Problem
Render is detecting and using the Dockerfile, but for backend-only deployment, Nixpacks is better.

## Solution: Switch to Nixpacks

### Option 1: In Render Settings (Recommended)

1. Go to your Render service page
2. Click **"Settings"** tab
3. Scroll to **"Build & Deploy"** section
4. Look for **"Dockerfile Path"** or **"Build Method"**
5. Change it to:
   - **"Nixpacks"** or
   - **"Auto-detect"** or
   - **Clear/delete the Dockerfile path field**

This will make Render use the build commands you specified instead of the Dockerfile.

### Option 2: Rename Dockerfile (Alternative)

If you can't find the setting, we can rename the Dockerfile so Render doesn't detect it:

1. Rename `Dockerfile` to `Dockerfile.backup`
2. Render will then use Nixpacks automatically

---

## What I Already Fixed

✅ Changed Dockerfile to use `npm install` instead of `npm ci`
✅ Generated package-lock.json files (just in case)

But **Nixpacks is still better** for your use case!

---

## Why Nixpacks is Better

- ✅ Uses your specified build commands
- ✅ Simpler (no Dockerfile needed)
- ✅ Better for Node.js apps
- ✅ Automatic detection

---

## Quick Fix

**In Render Settings:**
- Find "Dockerfile Path" or "Build Method"
- Change to "Nixpacks" or clear the field
- Save
- Redeploy

This should fix the build issue!

