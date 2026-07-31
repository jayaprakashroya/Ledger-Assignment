# Deployment Guide

Complete step-by-step guide to deploy Music Catalog Insights Platform to production.

---

## 🚀 Quick Deployment Overview

| Component | Platform | URL | Time |
|-----------|----------|-----|------|
| Backend | Render.com | https://music-catalog-api.onrender.com | 5-10 min |
| Database | Render PostgreSQL | Included | Auto |
| Frontend | Vercel | https://music-catalog.vercel.app | 2-3 min |

**Total Time**: ~15 minutes

---

## Step 1: Prepare Code for Deployment

### 1.1 Backend Configuration

Edit `backend/src/main/resources/application-prod.properties`:

```properties
# Server
server.port=8080

# Database - Will use environment variables
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate

# Security
app.jwt.secret=${JWT_SECRET}
app.jwt.expiration=86400000

# CORS
app.cors.allowedOrigins=${CORS_ORIGINS}

# Logging
logging.level.root=WARN
logging.level.com.example.musiccatalog=INFO

# Caching
spring.cache.type=caffeine
spring.cache.caffeine.spec=maximumSize=10000,expireAfterWrite=15m
```

### 1.2 Frontend Configuration

Create `frontend/.env.production`:

```env
NEXT_PUBLIC_API_BASE_URL=https://music-catalog-api.onrender.com/api
NEXT_PUBLIC_USE_MOCK_API=false
```

### 1.3 Commit Changes

```bash
git add .
git commit -m "chore: production configuration for deployment"
git push origin main
```

---

## Step 2: Deploy Backend to Render.com

### 2.1 Create Render Account & Connect GitHub

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize repository access

### 2.2 Create PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `music-catalog-db`
   - **Database**: `music_catalog`
   - **User**: `postgres`
   - **Region**: Select closest to users
   - **Plan**: Free tier (or Paid Standard)
3. Click **"Create Database"**
4. **Copy connection string** (looks like):
   ```
   postgresql://user:password@host:5432/music_catalog
   ```

### 2.3 Create Web Service (Backend)

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `music-catalog-api`
   - **Environment**: `Java`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**:
     ```bash
     cd backend && ./mvnw clean package -DskipTests
     ```
   - **Start Command**:
     ```bash
     java -jar backend/target/musiccatalog-1.0.0.jar
     ```
   - **Plan**: Free tier (or Paid)

4. Add Environment Variables:
   - `DATABASE_URL`: Paste PostgreSQL connection string
   - `DB_USERNAME`: postgres
   - `DB_PASSWORD`: (Password from database creation)
   - `JWT_SECRET`: Generate strong secret:
     ```bash
     openssl rand -base64 32
     ```
   - `CORS_ORIGINS`: `https://music-catalog.vercel.app,https://yourdomain.com`

5. Click **"Create Web Service"**

### 2.4 Deploy & Verify

```bash
# Wait for build to complete (2-5 minutes)
# Check logs in Render dashboard

# Test API
curl https://music-catalog-api.onrender.com/api/health
```

**Expected Response**: `{"status":"UP","database":"UP"}`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account & Connect GitHub

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize repository access

### 3.2 Import Project

1. Click **"Import Project"**
2. Select your GitHub repo
3. Configure:
   - **Project Name**: `music-catalog`
   - **Framework Preset**: Next.js
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3.3 Add Environment Variables

1. Click **"Environment Variables"**
2. Add:
   - **Name**: `NEXT_PUBLIC_API_BASE_URL`
   - **Value**: `https://music-catalog-api.onrender.com/api`
   - **Environments**: Select all (Production, Preview, Development)

3. Click **"Deploy"**

### 3.4 Verify Frontend

```bash
# Wait for deployment (1-2 minutes)
# Visit: https://music-catalog.vercel.app

# Try:
# 1. Register a new account
# 2. Search for "coldplay"
# 3. Add album to library
# 4. View analytics
```

---

## Step 4: Post-Deployment Checklist

- [ ] Backend API responding to requests
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Search albums works
- [ ] Add to library works
- [ ] Analytics dashboard displays correctly
- [ ] AI insights generated successfully
- [ ] Music player (if enabled) works
- [ ] Dark theme renders correctly
- [ ] Responsive design works on mobile
- [ ] Error messages display properly

---

## Step 5: Custom Domain (Optional)

### 5.1 For Render Backend

1. In Render dashboard: **Settings** → **Custom Domain**
2. Enter domain: `api.yourmusic.com`
3. Add DNS record at registrar:
   ```
   CNAME: api.yourmusic.com → music-catalog-api.onrender.com
   ```

### 5.2 For Vercel Frontend

1. In Vercel dashboard: **Settings** → **Domains**
2. Enter domain: `www.yourmusic.com`
3. Click **"Add"** and follow instructions
4. Add DNS records at registrar (Vercel shows exact records)

---

## Step 6: Monitoring & Logs

### Backend Logs (Render)

1. Dashboard → **music-catalog-api** → **Logs**
2. Real-time logs with filtering
3. Set up email alerts for errors

### Frontend Logs (Vercel)

1. Dashboard → **Deployments** → Click deployment
2. View build logs and runtime errors
3. Use Sentry integration for error tracking

---

## 🔄 Continuous Deployment

Both Render and Vercel auto-deploy on push to `main` branch.

**Workflow**:
```bash
# Make changes locally
git checkout -b feature/new-feature
# ... make changes ...
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create Pull Request on GitHub
# After review, merge to main
git checkout main
git merge feature/new-feature
git push origin main

# Render & Vercel auto-deploy!
```

---

## 🔐 Production Security Checklist

- [ ] JWT_SECRET is strong (32+ chars, random)
- [ ] Database password is secure (20+ chars, symbols)
- [ ] CORS_ORIGINS restricted to your domain only
- [ ] Database backups enabled (Render: Premium tier)
- [ ] HTTPS forced for all connections
- [ ] Sensitive data not in logs
- [ ] API rate limiting configured (future)
- [ ] Database user has minimal permissions (future)

---

## 💰 Cost Estimation (Monthly)

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| Render Backend | Free | $0 | Sleep after inactivity |
| Render Backend | Standard | $7/mo | Always on |
| Render PostgreSQL | Free | $0 | Limited |
| Render PostgreSQL | Standard | $15/mo | Production-grade |
| Vercel Frontend | Free | $0 | Included |
| **Total Free Tier** | | **$0** | Great for prototype |
| **Total Paid Tier** | | **~$22/mo** | Production-ready |

---

## 🆘 Troubleshooting

### Backend not starting

```bash
# Check logs in Render dashboard
# Common issues:
# 1. Database connection string wrong
# 2. JWT_SECRET not set
# 3. Port conflict (usually 8080)

# Solution:
# - Verify DATABASE_URL format
# - Ensure all required env vars set
# - Check Render logs for specific error
```

### Frontend showing 500 errors

```bash
# Frontend can't reach backend
# Check:
# 1. NEXT_PUBLIC_API_BASE_URL is correct
# 2. Backend is running and accessible
# 3. CORS headers are configured

# Test:
curl -i https://music-catalog-api.onrender.com/api/health

# If backend not responding:
# - Check Render backend service status
# - Review backend logs
# - Manually trigger rebuild in Render
```

### Database connection timeout

```bash
# Check configuration in Render PostgreSQL
# If using free tier:
# - Free databases sleep after 7 days of inactivity
# - Upgrade to Standard tier for production

# Verify connection string format:
postgresql://username:password@host:5432/database
```

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Spring Boot Deployment](https://spring.io/guides/gs/producing-web-content/)
- [Next.js Deployment](https://nextjs.org/learn-foundations/how-nextjs-works/rendering)

---

## 🎉 Success!

Your Music Catalog Insights Platform is now live!

- **API**: https://music-catalog-api.onrender.com
- **Frontend**: https://music-catalog.vercel.app
- **Admin**: Check Render/Vercel dashboards for monitoring
