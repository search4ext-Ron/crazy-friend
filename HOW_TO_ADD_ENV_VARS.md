# How to Add Environment Variables in Render.com

## ❌ DON'T Copy These:
- Numbers (1., 2., 3., etc.)
- Labels or descriptions
- The word "Variable:" or "Value:"

## ✅ DO Copy Only This:

### Example 1:
**Copy this:**
```
NODE_ENV
```
**And this:**
```
production
```

### Example 2:
**Copy this:**
```
PORT
```
**And this:**
```
3001
```

---

## 📝 Step-by-Step in Render.com

For each variable:

1. Click **"Add Environment Variable"**
2. In **"Key"** field: Type the variable name (e.g., `NODE_ENV`)
3. In **"Value"** field: Type the value (e.g., `production`)
4. Click **"Save"** or **"Add"**

---

## ✅ Complete List (Copy-Paste Ready)

### Variable 1:
**Key:** `NODE_ENV`
**Value:** `production`

### Variable 2:
**Key:** `PORT`
**Value:** `3001`

### Variable 3:
**Key:** `JWT_SECRET`
**Value:** `acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293`

### Variable 4:
**Key:** `ENCRYPTION_KEY`
**Value:** `f418860e5691f0038a0deb4adca4656c`

### Variable 5:
**Key:** `OPENAI_API_KEY`
**Value:** `YOUR_ACTUAL_OPENAI_API_KEY_HERE` ⚠️ Replace with real key!

### Variable 6:
**Key:** `ADMIN_EMAILS`
**Value:** `your-email@example.com` ⚠️ Replace with your email!

### Variable 7:
**Key:** `CLIENT_URL`
**Value:** `https://your-vercel-url.vercel.app` ⚠️ Replace with your Vercel URL!

### Variable 8:
**Key:** `CRISIS_HOTLINE`
**Value:** `988`

### Variable 9:
**Key:** `TOTP_ISSUER`
**Value:** `Crazy Friend`

### Variable 10:
**Key:** `DATABASE_PATH`
**Value:** `./data/crazyfriend.db`

### Variable 11:
**Key:** `RATE_LIMIT_WINDOW_MS`
**Value:** `900000`

### Variable 12:
**Key:** `RATE_LIMIT_MAX_REQUESTS`
**Value:** `100`

---

## 🎯 Quick Answer

**NO, don't copy the numbers!**

Only copy:
- The **variable name** (left side)
- The **value** (right side)

Ignore:
- Numbers (1., 2., 3.)
- Labels
- Descriptions

---

## Example in Render.com

When you see this in the guide:
```
1. NODE_ENV = production
```

In Render.com, you type:
- **Key:** `NODE_ENV`
- **Value:** `production`

That's it! No "1." and no "=" sign needed - Render has separate fields for Key and Value.

