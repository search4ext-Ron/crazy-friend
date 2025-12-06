#!/bin/bash
# Set all Railway environment variables

echo "⚙️  Setting Railway environment variables..."
echo ""

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
echo "✅ All variables set!"
echo ""
echo "⚠️  Don't forget to set:"
echo "   railway variables set OPENAI_API_KEY=your-key"
echo "   railway variables set ADMIN_EMAILS=your-email@example.com"
echo ""

