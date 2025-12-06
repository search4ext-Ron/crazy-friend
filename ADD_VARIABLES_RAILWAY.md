# Adding Variables in Railway - Step by Step

Railway found your variables! Now let's add them with the correct values.

## Step 1: Add Each Suggested Variable

For each variable in the "Suggested Variables" list, click **"Add"** and enter these values:

### 1. ENCRYPTION_KEY
- Click **"Add"** next to ENCRYPTION_KEY
- **Value:** `f418860e5691f0038a0deb4adca4656c`
- Click **"Add"** or **"Save"**

### 2. JWT_SECRET
- Click **"Add"** next to JWT_SECRET
- **Value:** `acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293`
- Click **"Add"** or **"Save"`

### 3. DATABASE_PATH
- Click **"Add"** next to DATABASE_PATH
- **Value:** `./data/crazyfriend.db`
- Click **"Add"** or **"Save"**

### 4. OPENAI_API_KEY
- Click **"Add"** next to OPENAI_API_KEY
- **Value:** `YOUR_ACTUAL_OPENAI_API_KEY_HERE`
- ⚠️ **Replace with your real OpenAI API key!**
- Click **"Add"** or **"Save"**

### 5. TOTP_ISSUER
- Click **"Add"** next to TOTP_ISSUER
- **Value:** `Crazy Friend`
- Click **"Add"** or **"Save"**

### 6. CLIENT_URL
- Click **"Add"** next to CLIENT_URL
- **Value:** `https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app`
- Click **"Add"** or **"Save"**

### 7. CRISIS_HOTLINE
- Click **"Add"** next to CRISIS_HOTLINE
- **Value:** `988`
- Click **"Add"** or **"Save"**

### 8. ADMIN_EMAILS
- Click **"Add"** next to ADMIN_EMAILS
- **Value:** `your-email@example.com`
- ⚠️ **Replace with your actual email!**
- Click **"Add"** or **"Save"**

### 9. RATE_LIMIT_WINDOW_MS
- Click **"Add"** next to RATE_LIMIT_WINDOW_MS
- **Value:** `900000`
- Click **"Add"** or **"Save"**

### 10. RATE_LIMIT_MAX_REQUESTS
- Click **"Add"** next to RATE_LIMIT_MAX_REQUESTS
- **Value:** `100`
- Click **"Add"** or **"Save"**

### 11. JWT_EXPIRES_IN (if needed)
- Click **"Add"** next to JWT_EXPIRES_IN
- **Value:** `7d` (7 days)
- Click **"Add"** or **"Save"**

## Step 2: Add Missing Variables

You also need these (click **"New Variable"** at the top):

### NODE_ENV
- Click **"New Variable"**
- **Name:** `NODE_ENV`
- **Value:** `production`
- Click **"Add"**

### PORT
- Click **"New Variable"**
- **Name:** `PORT`
- **Value:** `3001`
- Click **"Add"**

## Step 3: Verify All Variables

After adding all variables, you should see them listed under **"Service Variables"** section.

## Step 4: Find Persistent Storage

Now let's find Persistent Storage:

1. Go back to **"Settings"** tab
2. Scroll down and look for:
   - **"Persistent Storage"**
   - **"Volumes"**
   - **"Storage"**
   - **"Data Persistence"**

If you can't find it, we can add it via Railway CLI or it might not be available on the free tier (we can work around this).

---

## Quick Checklist:

- [ ] ENCRYPTION_KEY = `f418860e5691f0038a0deb4adca4656c`
- [ ] JWT_SECRET = `acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293`
- [ ] DATABASE_PATH = `./data/crazyfriend.db`
- [ ] OPENAI_API_KEY = (your real key)
- [ ] TOTP_ISSUER = `Crazy Friend`
- [ ] CLIENT_URL = `https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app`
- [ ] CRISIS_HOTLINE = `988`
- [ ] ADMIN_EMAILS = (your email)
- [ ] RATE_LIMIT_WINDOW_MS = `900000`
- [ ] RATE_LIMIT_MAX_REQUESTS = `100`
- [ ] NODE_ENV = `production`
- [ ] PORT = `3001`

Once all variables are added, Railway should auto-deploy or you can manually redeploy!

