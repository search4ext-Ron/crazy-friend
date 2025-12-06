# Crazy Friend - Setup Guide

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for LLM functionality)

## Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   
   Create `server/.env` file:
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `server/.env` and add:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `JWT_SECRET` - A random secret string for JWT tokens
   - `ADMIN_EMAILS` - Comma-separated list of admin email addresses
   - `CRISIS_HOTLINE` - Crisis hotline number (default: 988)
   - Other configuration as needed

3. **Initialize the database:**
   
   The database will be automatically created on first server start. The default location is `server/data/crazyfriend.db`.

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

### Production Build

```bash
npm run build
npm start
```

## First Admin User

To create your first admin user:

1. Register a regular account through the web interface
2. Add your email to `ADMIN_EMAILS` in `server/.env`
3. Restart the server
4. You'll now have admin access

## Features Overview

### Authentication
- User registration and login
- 2FA support (TOTP)
- JWT-based session management
- Privacy disclaimers

### Characters
- 5 default personas (New Yorker, Redneck, Cowboy, Valley Girl, Portlandia Hipster)
- Each with male/female versions
- Customizable comedy styles per character

### Chat Features
- Text and voice input
- Real-time voice visualization
- Haptic feedback (mobile)
- Self-harm detection with crisis intervention
- Feedback system ("This is funny" button)

### Personalization
- User profiles (age, location, etc.)
- AI-suggested comedy styles
- User-selectable style overrides
- Feedback-based learning

### Admin Dashboard
- Analytics and statistics
- Character management
- User search
- Safety alerts monitoring

### Monetization
- Freemium model (10 messages/day for free users)
- Premium subscription support
- Admin-controlled limits

## Safety Features

- Self-harm keyword detection
- Automatic crisis hotline referral
- Session termination on safety alerts
- Admin logging of safety incidents

## SEO Features

- Schema.org markup (WebApplication, Chatbot)
- Open Graph tags
- Meta descriptions
- robots.txt
- Semantic HTML structure

## PWA Features

- Service worker for offline support
- Installable on mobile devices
- App manifest
- Responsive design

## Troubleshooting

### Database Issues
If the database doesn't initialize:
- Check write permissions in `server/data/`
- Ensure SQLite3 is properly installed

### LLM Not Working
- Verify `OPENAI_API_KEY` is set correctly
- Check API quota/limits
- The app will use mock responses if API is unavailable

### Port Conflicts
- Change `PORT` in `server/.env`
- Update `vite.config.ts` proxy target if needed

## Next Steps

1. Set up payment processing for subscriptions (Stripe, PayPal, etc.)
2. Integrate speech-to-text API for voice input
3. Add more characters via admin panel
4. Configure production environment variables
5. Set up SSL/TLS certificates
6. Deploy to hosting platform

## License

MIT

