#!/bin/bash

# Vercel Deployment Script

set -e

echo "🚀 Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Check environment variables
echo "📋 Checking environment variables..."
REQUIRED_VARS=("JWT_SECRET" "OPENAI_API_KEY" "ENCRYPTION_KEY" "ADMIN_EMAILS")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if ! vercel env ls | grep -q "$var"; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo "⚠️  Missing environment variables:"
    printf '   %s\n' "${MISSING_VARS[@]}"
    echo ""
    echo "Please set them with: vercel env add <VARIABLE_NAME>"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build client
echo "📦 Building client..."
cd client
npm install
npm run build
cd ..

# Deploy
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Verify deployment at your Vercel URL"
echo "2. Test health endpoint: https://your-project.vercel.app/api/health"
echo "3. Check function logs in Vercel dashboard"

