#!/bin/bash

# Script to update Vercel to use Render backend
# Usage: ./update-vercel-to-render.sh YOUR_RENDER_URL

set -e

RENDER_URL="$1"

if [ -z "$RENDER_URL" ]; then
    echo "❌ Error: Please provide your Render URL"
    echo ""
    echo "Usage: ./update-vercel-to-render.sh https://your-service.onrender.com"
    echo ""
    echo "To get your Render URL:"
    echo "1. Go to https://dashboard.render.com"
    echo "2. Click on your 'crazy-friend' service"
    echo "3. Go to Settings → Networking"
    echo "4. Copy the Public Domain URL"
    exit 1
fi

# Remove trailing slash if present
RENDER_URL="${RENDER_URL%/}"

# Ensure it includes /api
if [[ ! "$RENDER_URL" == *"/api" ]]; then
    RENDER_URL="${RENDER_URL}/api"
fi

echo "🔄 Updating Vercel to use Render backend..."
echo "   Render URL: $RENDER_URL"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel"
    echo "   Please run: vercel login"
    exit 1
fi

echo "✅ Logged in to Vercel"
echo ""

# Update environment variables for all environments
echo "📝 Setting VITE_API_URL for Production..."
vercel env add VITE_API_URL production <<< "$RENDER_URL" 2>&1 || \
    vercel env rm VITE_API_URL production --yes 2>&1 && \
    vercel env add VITE_API_URL production <<< "$RENDER_URL"

echo "📝 Setting VITE_API_URL for Preview..."
vercel env add VITE_API_URL preview <<< "$RENDER_URL" 2>&1 || \
    vercel env rm VITE_API_URL preview --yes 2>&1 && \
    vercel env add VITE_API_URL preview <<< "$RENDER_URL"

echo "📝 Setting VITE_API_URL for Development..."
vercel env add VITE_API_URL development <<< "$RENDER_URL" 2>&1 || \
    vercel env rm VITE_API_URL development --yes 2>&1 && \
    vercel env add VITE_API_URL development <<< "$RENDER_URL"

echo ""
echo "✅ Environment variables updated!"
echo ""
echo "🚀 Redeploying frontend..."
vercel --prod

echo ""
echo "✅ Done! Your Vercel frontend is now connected to Render backend!"
echo ""
echo "📋 Test it:"
echo "   1. Visit your Vercel site"
echo "   2. Try 'Ask Me Something' feature"
echo "   3. Should connect to: $RENDER_URL"

