#!/bin/bash

# Crazy Friend Setup Script

echo "🤪 Setting up Crazy Friend..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Create server .env if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cat > server/.env << EOF
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=$(openssl rand -hex 32)
JWT_EXPIRES_IN=7d

# Database
DATABASE_PATH=./data/crazyfriend.db

# OpenAI API (REQUIRED - Add your key here)
OPENAI_API_KEY=your-openai-api-key-here

# 2FA
TOTP_ISSUER=Crazy Friend

# Crisis Hotline
CRISIS_HOTLINE=988

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Admin Emails (comma-separated)
ADMIN_EMAILS=admin@example.com

# Encryption Key (CHANGE THIS IN PRODUCTION!)
ENCRYPTION_KEY=$(openssl rand -hex 16)
EOF
    echo "✅ Created server/.env - Please edit it and add your OPENAI_API_KEY"
else
    echo "ℹ️  server/.env already exists, skipping..."
fi

# Create data directory
mkdir -p server/data

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env and add your OPENAI_API_KEY"
echo "2. Run 'npm run dev' to start development servers"
echo "3. Visit http://localhost:5173"
echo ""
echo "For more information, see SETUP.md"

