#!/bin/bash

# Railway Backend Deployment Script

set -e

echo "🚂 Deploying backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    echo "This will open a browser window for authentication"
    railway login
fi

echo "✅ Logged in to Railway"

# Navigate to server directory
cd server

# Initialize Railway project (if not already initialized)
if [ ! -f ".railway/config.json" ]; then
    echo "📝 Initializing Railway project..."
    railway init
fi

# Generate secure keys if not set
if [ -z "$JWT_SECRET" ]; then
    echo "🔑 Generating JWT_SECRET..."
    JWT_SECRET=$(openssl rand -hex 32)
    railway variables set JWT_SECRET="$JWT_SECRET"
    echo "✅ JWT_SECRET set"
fi

if [ -z "$ENCRYPTION_KEY" ]; then
    echo "🔑 Generating ENCRYPTION_KEY..."
    ENCRYPTION_KEY=$(openssl rand -hex 16)
    railway variables set ENCRYPTION_KEY="$ENCRYPTION_KEY"
    echo "✅ ENCRYPTION_KEY set"
fi

# Set required environment variables
echo "📋 Setting environment variables..."

# Check if variables need to be set
read -p "Enter your OPENAI_API_KEY: " OPENAI_API_KEY
railway variables set OPENAI_API_KEY="$OPENAI_API_KEY"

read -p "Enter admin email(s) (comma-separated): " ADMIN_EMAILS
railway variables set ADMIN_EMAILS="$ADMIN_EMAILS"

# Set other required variables
railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
railway variables set CRISIS_HOTLINE=988
railway variables set TOTP_ISSUER="Crazy Friend"
railway variables set DATABASE_PATH=./data/crazyfriend.db
railway variables set RATE_LIMIT_WINDOW_MS=900000
railway variables set RATE_LIMIT_MAX_REQUESTS=100

echo "✅ Environment variables set"

# Deploy
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Get your Railway URL from the dashboard"
echo "2. Update Vercel environment variable VITE_API_URL with your Railway URL"
echo "3. Redeploy frontend: vercel --prod"

