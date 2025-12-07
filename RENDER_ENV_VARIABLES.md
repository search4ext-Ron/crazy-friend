# Render.com Environment Variables - Complete List

## Copy-Paste Ready List

Add these one by one in Render.com → Environment Variables section:

---

### 1. NODE_ENV
```
NODE_ENV = production
```

---

### 2. PORT
```
PORT = 3001
```

---

### 3. JWT_SECRET
```
JWT_SECRET = acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
```

---

### 4. ENCRYPTION_KEY
```
ENCRYPTION_KEY = f418860e5691f0038a0deb4adca4656c
```

---

### 5. OPENAI_API_KEY ⚠️ REPLACE THIS!
```
OPENAI_API_KEY = YOUR_ACTUAL_OPENAI_API_KEY_HERE
```
**Action Required:** Replace `YOUR_ACTUAL_OPENAI_API_KEY_HERE` with your real OpenAI API key.

**Where to get it:**
- Go to https://platform.openai.com/api-keys
- Sign in or create account
- Click "Create new secret key"
- Copy the key (starts with `sk-`)

---

### 6. ADMIN_EMAILS ⚠️ REPLACE THIS!
```
ADMIN_EMAILS = your-email@example.com
```
**Action Required:** Replace `your-email@example.com` with your actual email address.

**Note:** If you want multiple admin emails, separate with commas:
```
ADMIN_EMAILS = email1@example.com,email2@example.com
```

---

### 7. CLIENT_URL ⚠️ REPLACE THIS!
```
CLIENT_URL = https://crazy-friend-XXXXX.vercel.app
```
**Action Required:** Replace with your actual Vercel URL.

**To find your Vercel URL:**
1. Go to https://vercel.com/dashboard
2. Click on your `crazy-friend` project
3. Look at the top - you'll see your URL
4. It will be something like: `https://crazy-friend-abc123.vercel.app`
5. Copy that entire URL (including `https://`)

---

### 8. CRISIS_HOTLINE
```
CRISIS_HOTLINE = 988
```

---

### 9. TOTP_ISSUER
```
TOTP_ISSUER = Crazy Friend
```

---

### 10. DATABASE_PATH
```
DATABASE_PATH = ./data/crazyfriend.db
```

---

### 11. RATE_LIMIT_WINDOW_MS
```
RATE_LIMIT_WINDOW_MS = 900000
```

---

### 12. RATE_LIMIT_MAX_REQUESTS
```
RATE_LIMIT_MAX_REQUESTS = 100
```

---

## 📋 Quick Checklist

Copy each variable above and paste into Render.com. For each one:

- [ ] Variable name (left side)
- [ ] Value (right side)
- [ ] Click "Save" or "Add"

**Important:** Make sure to replace the 3 variables marked with ⚠️:
- [ ] `OPENAI_API_KEY` - Your real OpenAI key
- [ ] `ADMIN_EMAILS` - Your email
- [ ] `CLIENT_URL` - Your Vercel URL

---

## 🎯 Summary

**Total Variables:** 12

**Ready to use (copy-paste):** 9
- NODE_ENV
- PORT
- JWT_SECRET
- ENCRYPTION_KEY
- CRISIS_HOTLINE
- TOTP_ISSUER
- DATABASE_PATH
- RATE_LIMIT_WINDOW_MS
- RATE_LIMIT_MAX_REQUESTS

**Need your values:** 3
- OPENAI_API_KEY (get from OpenAI)
- ADMIN_EMAILS (your email)
- CLIENT_URL (your Vercel URL)

---

## 💡 Pro Tip

In Render.com, you can add variables one at a time, or use the "Add Multiple" option if available.

After adding all variables, your service will be ready to deploy!

