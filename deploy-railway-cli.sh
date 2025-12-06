#!/bin/bash
# Railway CLI Deployment Script

echo "🚂 Railway CLI Deployment"
echo "========================="
echo ""

cd server

echo "Step 1: Login to Railway..."
railway login

echo ""
echo "Step 2: Initialize project..."
railway init

echo ""
echo "Step 3: Setting environment variables..."
echo "⚠️  You'll need to set OPENAI_API_KEY and ADMIN_EMAILS manually!"

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
echo "⚠️  Don't forget to set:"
echo "   railway variables set OPENAI_API_KEY=your-key"
echo "   railway variables set ADMIN_EMAILS=your-email@example.com"

echo ""
echo "Step 4: Adding persistent storage..."
railway add --volume ./data

echo ""
echo "Step 5: Deploying..."
railway up

echo ""
echo "✅ Deployment complete!"
echo "Get your URL with: railway domain"
