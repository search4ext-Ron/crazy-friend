#!/bin/bash
# Automated Railway Deployment Script
# Run this after logging in once with: railway login

set -e

echo "🚂 Automated Railway Deployment"
echo "================================"
echo ""

# Check if logged in
if ! railway whoami &>/dev/null; then
    echo "❌ Not logged in to Railway"
    echo ""
    echo "Please run this first:"
    echo "  railway login"
    echo ""
    echo "This will open your browser once to authorize."
    echo "After that, run this script again!"
    exit 1
fi

echo "✅ Logged in to Railway"
echo ""

# Navigate to server directory
cd "$(dirname "$0")"
echo "📁 Working directory: $(pwd)"
echo ""

# Link to existing project or create new
echo "🔗 Linking to Railway project..."
if railway status &>/dev/null; then
    echo "✅ Already linked to a project"
    PROJECT_NAME=$(railway status 2>/dev/null | grep -i "project" | head -1 || echo "crazy-friend")
else
    echo "📦 Initializing new project..."
    railway init <<EOF
1
crazy-friend-backend
EOF
fi

echo ""
echo "⚙️  Setting environment variables..."
echo ""

# Set all environment variables
railway variables set NODE_ENV=production
railway variables set PORT=3001
railway variables set JWT_SECRET=acb28db907a75840a0aef846bec7efb5bd9be1f587ff896f079526b350da8293
railway variables set ENCRYPTION_KEY=f418860e5691f0038a0deb4adca4656c
railway variables set CLIENT_URL=https://crazy-friend-bai0nb9zr-ronms-projects.vercel.app
railway variables set CRISIS_HOTLINE=988
railway variables set TOTP_ISSUER="Crazy Friend"
railway variables set DATABASE_PATH=./data/crazyfriend.db
railway variables set RATE_LIMIT_WINDOW_MS=900000
railway variables set RATE_LIMIT_MAX_REQUESTS=100

echo ""
echo "⚠️  IMPORTANT: You need to set these manually:"
echo "   railway variables set OPENAI_API_KEY=your-actual-key"
echo "   railway variables set ADMIN_EMAILS=your-email@example.com"
echo ""

# Try to add persistent storage (may not work on all plans)
echo "💾 Attempting to add persistent storage..."
railway add --volume ./data 2>/dev/null || echo "⚠️  Persistent storage may require upgrade or manual setup"
echo ""

# Deploy
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Deployment started!"
echo ""
echo "📋 Next steps:"
echo "1. Set OPENAI_API_KEY and ADMIN_EMAILS (see above)"
echo "2. Get your Railway URL: railway domain"
echo "3. Update Vercel VITE_API_URL with the Railway URL"
echo ""

