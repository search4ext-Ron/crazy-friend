# Deployment Guide

This guide covers deploying Crazy Friend to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Strong JWT_SECRET and ENCRYPTION_KEY generated
- [ ] OpenAI API key configured
- [ ] Admin emails set
- [ ] SSL certificates obtained (for HTTPS)
- [ ] Domain name configured
- [ ] Database backup strategy planned

## Option 1: Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- Domain name pointing to your server

### Steps

1. **Clone and configure:**
   ```bash
   git clone <your-repo>
   cd Crazy\ Friend
   ```

2. **Set environment variables:**
   ```bash
   # Create .env file with production values
   cp server/.env.production.example .env
   # Edit .env with your production values
   ```

3. **Build and start:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

4. **With Nginx reverse proxy:**
   ```bash
   docker-compose --profile with-nginx up -d
   ```

5. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

6. **Update application:**
   ```bash
   docker-compose pull
   docker-compose up -d --build
   ```

## Option 2: PM2 Deployment

### Prerequisites
- Node.js 18+ installed
- PM2 installed globally: `npm install -g pm2`

### Steps

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set production environment:**
   ```bash
   export NODE_ENV=production
   # Or create .env.production file
   ```

3. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

4. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup  # Follow instructions to enable auto-start on boot
   ```

5. **Monitor:**
   ```bash
   pm2 status
   pm2 logs crazy-friend-server
   pm2 monit
   ```

6. **Update application:**
   ```bash
   npm run build
   pm2 restart crazy-friend-server
   ```

## Option 3: Cloud Platform Deployment

### Vercel/Netlify (Frontend) + Railway/Render (Backend)

#### Frontend (Vercel)
1. Connect your GitHub repository
2. Set build command: `cd client && npm install && npm run build`
3. Set output directory: `client/dist`
4. Add environment variables

#### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set build command: `cd server && npm install && npm run build`
3. Set start command: `cd server && node dist/index.js`
4. Add environment variables
5. Configure persistent storage for database

### AWS/GCP/Azure

See cloud-specific deployment guides in `docs/` directory.

## SSL/HTTPS Setup

### Using Let's Encrypt (Certbot)

1. **Install Certbot:**
   ```bash
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. **Obtain certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal:**
   Certbot sets up auto-renewal automatically.

### Using Cloudflare

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption mode: Full
4. Cloudflare provides free SSL certificates

## Environment Variables

### Required for Production

```bash
NODE_ENV=production
JWT_SECRET=<64-character-random-string>
ENCRYPTION_KEY=<32-character-random-string>
OPENAI_API_KEY=<your-openai-key>
ADMIN_EMAILS=<comma-separated-emails>
CLIENT_URL=https://yourdomain.com
```

### Generate Secure Keys

```bash
# JWT Secret (64 characters)
openssl rand -hex 32

# Encryption Key (32 characters)
openssl rand -hex 16
```

## Database Management

### Backup

```bash
# SQLite backup
cp server/data/crazyfriend.db server/data/backup-$(date +%Y%m%d).db
```

### Migration to PostgreSQL (Optional)

For production, consider migrating to PostgreSQL:

1. Install PostgreSQL
2. Create database
3. Use migration script (see `scripts/migrate-to-postgres.js`)

## Monitoring

### Health Checks

The application includes a health check endpoint:
```
GET /api/health
```

### Logs

- Application logs: `server/logs/app-YYYY-MM-DD.log`
- PM2 logs: `logs/pm2-*.log`
- Docker logs: `docker-compose logs`

### Monitoring Tools

- **PM2 Monitoring:** `pm2 monit`
- **Docker Stats:** `docker stats`
- **Application Metrics:** Consider integrating with:
  - New Relic
  - Datadog
  - Sentry (error tracking)

## Scaling

### Horizontal Scaling

1. **Load Balancer:** Use Nginx or cloud load balancer
2. **Multiple Instances:** Run multiple PM2 instances or Docker containers
3. **Database:** Consider PostgreSQL with connection pooling

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize database queries
- Enable caching (Redis)

## Security Hardening

1. **Firewall:**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Fail2Ban:**
   Install and configure to prevent brute force attacks

3. **Regular Updates:**
   Keep system and dependencies updated

4. **Backup Strategy:**
   - Daily database backups
   - Off-site backup storage
   - Test restore procedures

## Troubleshooting

### Application won't start
- Check environment variables
- Verify database permissions
- Check logs for errors

### High memory usage
- Reduce PM2 instances
- Check for memory leaks
- Consider upgrading server

### Database locked
- Check for long-running queries
- Verify file permissions
- Consider migrating to PostgreSQL

## Support

For issues, check:
- Application logs
- PM2/Docker logs
- Health check endpoint
- Error tracking (if configured)

