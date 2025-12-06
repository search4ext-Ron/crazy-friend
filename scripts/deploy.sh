#!/bin/bash

# Production Deployment Script

set -e

echo "🚀 Starting deployment..."

# Check if we're in production mode
if [ "$NODE_ENV" != "production" ]; then
    echo "⚠️  Warning: NODE_ENV is not set to 'production'"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check required environment variables
REQUIRED_VARS=("JWT_SECRET" "OPENAI_API_KEY" "ENCRYPTION_KEY" "ADMIN_EMAILS")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    printf '   %s\n' "${MISSING_VARS[@]}"
    exit 1
fi

# Validate JWT_SECRET length
if [ ${#JWT_SECRET} -lt 32 ]; then
    echo "❌ JWT_SECRET must be at least 32 characters"
    exit 1
fi

# Build application
echo "📦 Building application..."
npm run build

# Check if PM2 is installed
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting with PM2..."
    pm2 restart ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production
    pm2 save
    echo "✅ Application restarted with PM2"
else
    echo "⚠️  PM2 not found. Install with: npm install -g pm2"
    echo "Starting with node directly..."
    cd server
    node dist/index.js &
    echo "✅ Application started"
fi

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Check application logs"
echo "2. Verify health endpoint: curl http://localhost:3001/api/health"
echo "3. Monitor application performance"

