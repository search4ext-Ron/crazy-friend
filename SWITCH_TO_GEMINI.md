# Switching to Google Gemini (Free Tier)

## ✅ What I Changed

1. **Updated dependencies:**
   - Removed: `@langchain/openai`
   - Added: `@langchain/google-genai`

2. **Updated LLM service:**
   - Changed from `ChatOpenAI` to `ChatGoogleGenerativeAI`
   - Using `gemini-pro` model
   - Updated environment variable from `OPENAI_API_KEY` to `GEMINI_API_KEY`

3. **Updated environment variables:**
   - Changed `OPENAI_API_KEY` to `GEMINI_API_KEY` in validation

## 🆓 Gemini Free Tier

**Benefits:**
- ✅ **60 requests per minute** (free tier)
- ✅ **No credit card required** initially
- ✅ **Good quality responses**
- ✅ **Free for reasonable usage**

**Limits:**
- 60 requests/minute
- After heavy usage, may require billing setup
- Still much more generous than OpenAI

## 📋 Next Steps

### 1. Get Your Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

### 2. Update Render Environment Variable

1. Go to https://dashboard.render.com
2. Click on your `crazy-friend` service
3. Go to **Settings** → **Environment Variables**
4. **Remove** `OPENAI_API_KEY` (if it exists)
5. **Add** new variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key (from step 1)
6. Click **Save**

### 3. Redeploy

Render should auto-deploy, or manually trigger:
1. Go to **Deployments** tab
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### 4. Test

1. Go to your Vercel site
2. Try "Ask Me Something"
3. Should work with Gemini! 🎉

## 💰 Cost Comparison

| Service | Free Tier | After Free |
|---------|-----------|------------|
| **Gemini** | 60 req/min | Pay per use (cheaper than OpenAI) |
| **OpenAI** | $5 credit | ~$0.03-0.09/question |
| **Anthropic** | None | Paid only |

## ✅ Benefits of Gemini

- **Free tier:** 60 requests/minute
- **No upfront cost:** No credit card needed initially
- **Good quality:** Comparable to GPT-3.5
- **Cheaper:** Lower cost than OpenAI after free tier

## 🎉 You're All Set!

Your app now uses Google Gemini instead of OpenAI, which means:
- ✅ Free tier available
- ✅ No credit card required initially
- ✅ Good quality responses
- ✅ Lower costs if you exceed free tier

