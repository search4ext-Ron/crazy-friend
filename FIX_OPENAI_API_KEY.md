# Fix OpenAI API Key in Render

## Problem
Render has a placeholder OpenAI API key instead of a real one.

## Solution: Add Your Real OpenAI API Key

### Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in to your OpenAI account (or create one)
3. Click **"Create new secret key"**
4. Give it a name (e.g., "Crazy Friend")
5. **Copy the key immediately** (you won't see it again!)
   - Format: `sk-...` (starts with `sk-`)

### Step 2: Add Key to Render

1. Go to https://dashboard.render.com
2. Click on your `crazy-friend` service
3. Go to **Settings** → **Environment Variables**
4. Find `OPENAI_API_KEY` in the list
5. Click on it to edit
6. **Delete the placeholder value** (`your-act...`)
7. **Paste your real OpenAI API key** (the `sk-...` one)
8. Click **Save**

### Step 3: Redeploy (if needed)

Render should auto-update, but if it doesn't:
1. Go to **Deployments** tab
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Step 4: Test

1. Go to your Vercel site
2. Try "Ask Me Something" again
3. Should work now! 🎉

## Important Notes

- **Keep your API key secret** - don't share it publicly
- **OpenAI charges per use** - check pricing at https://openai.com/pricing
- **Free tier:** OpenAI gives $5 free credit to start
- **Monitor usage:** Check usage at https://platform.openai.com/usage

## Cost Estimate

- **GPT-4:** ~$0.03 per 1K tokens (input) + $0.06 per 1K tokens (output)
- **Average question:** ~500-1000 tokens = ~$0.03-0.09 per question
- **$5 free credit:** ~50-150 questions free

## Troubleshooting

### "Invalid API key" error
- Make sure you copied the entire key (starts with `sk-`)
- Check for extra spaces before/after the key
- Verify the key is active in OpenAI dashboard

### "Insufficient quota" error
- Check your OpenAI account has credits
- Go to https://platform.openai.com/account/billing
- Add payment method if needed

### Still getting 500 error
- Check Render logs for other errors
- Verify all other environment variables are set
- Make sure Render service is "Live"

