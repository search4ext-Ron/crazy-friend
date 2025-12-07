# How to Add Persistent Disk in Render.com

## Why You Need This

Your SQLite database needs persistent storage. Without a disk, your database will be deleted every time the service restarts!

---

## Step-by-Step Instructions

### Step 1: Find the Disk Section

1. In your Render.com service page
2. Scroll down past the Environment Variables section
3. Look for a section called **"Disk"** or **"Persistent Disk"**
4. You should see a button like **"Add Disk"** or **"Attach Disk"**

### Step 2: Click Add Disk

1. Click **"Add Disk"** or **"Attach Disk"** button
2. A form or modal will appear

### Step 3: Fill in Disk Details

Fill in these fields:

**Name:**
```
data-disk
```
(Or any name you like - this is just for your reference)

**Mount Path:**
```
/opt/render/project/src/server/data
```
⚠️ **IMPORTANT:** This exact path is needed for Render.com!

**Size:**
```
1
```
(Or select `1 GB` from dropdown if available)

**Note:** Free tier allows up to 1 GB, which is plenty for your SQLite database.

### Step 4: Disk Added

1. After filling in the fields, the disk will be added to your configuration
2. **You don't need to click "Save" separately!**
3. The disk will be saved when you click **"Create Web Service"** at the bottom of the page
4. You should see the disk listed in the Disk section

---

## Visual Guide

```
Render Service Page
├── Settings
├── Environment Variables
├── Disk                    ← Find this section
│   └── [Add Disk]          ← Click this button
│       ├── Name: data-disk
│       ├── Mount Path: /opt/render/project/src/server/data
│       └── Size: 1 GB
└── ...
```

---

## Important Notes

### Mount Path Explanation

The mount path tells Render where to mount the disk in your service:

- **Render's project path:** `/opt/render/project/src/`
- **Your server folder:** `server/`
- **Your data folder:** `data/`
- **Full path:** `/opt/render/project/src/server/data`

This matches your `DATABASE_PATH` environment variable: `./data/crazyfriend.db`

### Why This Path?

When Render builds your service:
1. It clones your repo
2. Copies files to `/opt/render/project/src/`
3. Your `server/` folder becomes `/opt/render/project/src/server/`
4. The disk at `/opt/render/project/src/server/data` will store your database

---

## Verification

After adding the disk:

1. The disk should appear in the Disk section
2. You should see:
   - Name: `data-disk`
   - Mount Path: `/opt/render/project/src/server/data`
   - Size: `1 GB`
   - Status: `Attached` or `Active`

---

## Troubleshooting

### Can't Find Disk Section?

- Make sure you're in the **service settings** page
- Scroll down - it's usually below Environment Variables
- Some Render interfaces have it under "Advanced" or "Resources"

### Wrong Mount Path?

If you used a different path, you may need to:
1. Update `DATABASE_PATH` environment variable to match
2. Or update the mount path to match your `DATABASE_PATH`

### Disk Not Showing?

- Refresh the page
- Check if the service needs to be redeployed
- Make sure you saved the disk settings

---

## Quick Reference

**Disk Name:** `data-disk` (or any name)
**Mount Path:** `/opt/render/project/src/server/data`
**Size:** `1 GB`

That's it! Your database will now persist across deployments.

---

## After Adding Disk

Once the disk is added:
1. Your database will be stored on the persistent disk
2. Data won't be lost when service restarts
3. You're ready to deploy!

---

## ✅ Checklist

- [ ] Found Disk section in Render
- [ ] Clicked "Add Disk"
- [ ] Set Name: `data-disk`
- [ ] Set Mount Path: `/opt/render/project/src/server/data`
- [ ] Set Size: `1 GB`
- [ ] Clicked Save
- [ ] Disk shows as "Attached" or "Active"

---

You're all set! 🎉

