# Vercel Deployment Guide

This guide will help you deploy Crazy Friend to Vercel.

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed: `npm i -g vercel`
3. Git repository (GitHub, GitLab, or Bitbucket)

## Important Notes

⚠️ **SQLite Limitation**: Vercel's serverless functions have an ephemeral filesystem. SQLite databases will be reset on each deployment. For production, consider:

- Using Vercel Postgres (recommended)
- Using an external database service (Supabase, PlanetScale, etc.)
- Deploying backend separately to Railway/Render

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

3. **Import your repository**
   - Select your Crazy Friend repository
   - Vercel will auto-detect the configuration

4. **Configure Project Settings**
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: `npm run build:vercel`
   - Output Directory: `client/dist`
   - Install Command: `npm run install:all`

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   NODE_ENV=production
   JWT_SECRET=<your-64-char-secret>
   ENCRYPTION_KEY=<your-32-char-key>
   OPENAI_API_KEY=<your-openai-key>
   ADMIN_EMAILS=<admin@email.com>
   CLIENT_URL=https://your-project.vercel.app
   CRISIS_HOTLINE=988
   TOTP_ISSUER=Crazy Friend
   DATABASE_PATH=/tmp/crazyfriend.db
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? (select your account)
   - Link to existing project? No (first time) or Yes (updates)
   - Project name? crazy-friend
   - Directory? ./
   - Override settings? No

5. **Set Environment Variables**
   ```bash
   vercel env add JWT_SECRET
   vercel env add ENCRYPTION_KEY
   vercel env add OPENAI_API_KEY
   vercel env add ADMIN_EMAILS
   vercel env add CLIENT_URL
   # ... add all other variables
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | 64+ character secret for JWT tokens | `openssl rand -hex 32` |
| `ENCRYPTION_KEY` | 32+ character encryption key | `openssl rand -hex 16` |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `ADMIN_EMAILS` | Comma-separated admin emails | `admin@example.com` |
| `CLIENT_URL` | Your Vercel deployment URL | `https://crazy-friend.vercel.app` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `CRISIS_HOTLINE` | `988` | Crisis hotline number |
| `TOTP_ISSUER` | `Crazy Friend` | 2FA issuer name |
| `DATABASE_PATH` | `/tmp/crazyfriend.db` | Database file path (ephemeral) |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

## Database Considerations

### ⚠️ SQLite on Vercel

SQLite databases on Vercel are **ephemeral** - they reset on each deployment. For production:

1. **Use Vercel Postgres** (Recommended)
   - Add Vercel Postgres in dashboard
   - Update database connection in code
   - Migrate schema to PostgreSQL

2. **Use External Database**
   - Supabase (PostgreSQL)
   - PlanetScale (MySQL)
   - MongoDB Atlas
   - Update connection strings in environment variables

3. **Deploy Backend Separately**
   - Deploy backend to Railway/Render
   - Keep frontend on Vercel
   - Update API URLs

## Custom Domain

1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update CLIENT_URL**
   - Update `CLIENT_URL` environment variable
   - Redeploy if needed

## Updating Deployment

### Via Dashboard
- Push changes to your Git repository
- Vercel automatically detects and deploys

### Via CLI
```bash
vercel --prod
```

## Monitoring

1. **Vercel Analytics**
   - Enable in Project Settings
   - View performance metrics

2. **Function Logs**
   - View in Vercel Dashboard → Functions
   - Check for errors and performance

3. **Health Check**
   - Visit: `https://your-project.vercel.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

## Troubleshooting

### Build Fails

1. **Check Build Logs**
   - View in Vercel Dashboard
   - Look for error messages

2. **Common Issues**
   - Missing environment variables
   - Build command incorrect
   - Dependencies not installing

### API Routes Not Working

1. **Check Function Logs**
   - Vercel Dashboard → Functions
   - Look for runtime errors

2. **Verify Routes**
   - Check `vercel.json` configuration
   - Ensure `/api/*` routes point to function

3. **Database Issues**
   - Remember SQLite is ephemeral
   - Consider external database

### Environment Variables Not Working

1. **Redeploy After Adding Variables**
   - Variables require redeployment
   - Use `vercel --prod` or redeploy in dashboard

2. **Check Variable Names**
   - Ensure exact match (case-sensitive)
   - No typos

## Production Checklist

- [ ] All environment variables set
- [ ] Database configured (external or Vercel Postgres)
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Health check endpoint working
- [ ] Admin access verified
- [ ] Error tracking configured (optional)
- [ ] Analytics enabled (optional)

## Alternative: Split Deployment

If you need persistent SQLite or prefer separate deployments:

1. **Frontend on Vercel**
   - Deploy `client/` directory
   - Update API URL to backend

2. **Backend on Railway/Render**
   - Deploy `server/` directory
   - Use persistent storage
   - Update CORS settings

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Project Issues: Check repository issues

