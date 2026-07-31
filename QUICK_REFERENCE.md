# Quick Reference Guide

Fast lookup guide for Music Catalog Insights Platform.

---

## 🚀 30-Second Overview

**Full-stack music library management platform with AI insights**

- **Backend**: Java Spring Boot REST API
- **Frontend**: Next.js React web app
- **Database**: PostgreSQL (production) / H2 (dev)
- **AI**: Mood classification + recommendations
- **Deployment**: Render (backend) + Vercel (frontend)

---

## ⚡ Quick Commands

### Backend
```bash
cd backend
./mvnw spring-boot:run                    # Start server
./mvnw clean package -DskipTests          # Build
./mvnw test                               # Run tests
```

### Frontend
```bash
cd frontend
npm install                               # Install deps
npm run dev                               # Start dev server
npm run build                             # Build for prod
```

### Test Locally
```bash
# Terminal 1: Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2: Frontend
cd frontend && npm run dev

# Then open: http://localhost:3000
```

---

## 📡 Key API Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| /auth/register | POST | ❌ | Register user |
| /auth/login | POST | ❌ | Login user |
| /search | GET | ❌ | Search albums |
| /library | GET | ✅ | Get library |
| /library | POST | ✅ | Add album |
| /library/{id} | PUT | ✅ | Update album |
| /library/{id} | DELETE | ✅ | Remove album |
| /library/analytics | GET | ✅ | Get analytics |
| /library/insights | GET | ✅ | Get AI insights |

---

## 🔑 Environment Variables

### Backend (`.env.local` or Render)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
CORS_ORIGINS=http://localhost:3000,...
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_USE_MOCK_API=false
```

---

## 🧭 File Locations

| Component | Location |
|-----------|----------|
| Backend entry point | `backend/src/main/java/.../MusicCatalogApplication.java` |
| Frontend entry point | `frontend/app/layout.tsx` |
| Database schema | `backend/src/main/resources/db/migration/V1__init.sql` |
| API client | `frontend/lib/api.ts` |
| State management | `frontend/lib/store.ts`, `playerStore.ts` |
| Auth controller | `backend/src/main/java/.../controller/AuthController.java` |
| Library controller | `backend/src/main/java/.../controller/LibraryController.java` |

---

## 🎯 Testing Workflow

1. **Register**
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!@#"}'
   ```

2. **Search**
   ```bash
   curl http://localhost:8080/api/search?query=coldplay&type=album
   ```

3. **Add to Library** (requires token from register/login)
   ```bash
   curl -X POST http://localhost:8080/api/library \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{...album data...}'
   ```

---

## 📊 Analytics Charts

| Chart | Type | Located At |
|-------|------|------------|
| Releases by Year | Bar | / /analytics |
| Top Genres | Pie | /analytics |
| Rating Distribution | Bar | /analytics |
| Track Count Distribution | Bar | /analytics |

---

## 🎵 Music Player

**Location**: `/app/music/page.tsx`  
**State**: `lib/playerStore.ts` (Zustand)  
**Features**: Play/pause, skip, volume, queue

---

## 🔐 Security

- JWT tokens: 24-hour expiration
- Password: BCrypt hashing
- CORS: Restricted to frontend
- Validation: Spring @Valid
- Database: Unique constraints

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full project overview |
| SETUP.md | Local development guide |
| DEPLOYMENT.md | Production deployment |
| SUBMISSION_CHECKLIST.md | Requirements verification |
| IMPLEMENTATION_SUMMARY.md | What's included |
| docs/API.md | API reference |

---

## 🚢 Deployment

**Production URLs** (after deployment):
- Backend: `https://music-catalog-api.onrender.com`
- Frontend: `https://music-catalog.vercel.app`

**Steps**:
1. Follow DEPLOYMENT.md
2. Render backend deployment (~10 min)
3. Vercel frontend deployment (~2 min)

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Port 8080 in use | `lsof -ti:8080 \| xargs kill -9` |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Backend won't connect | Check NEXT_PUBLIC_API_BASE_URL |
| Database error | Ensure environment variables set |
| Auth failing | Clear browser storage, re-login |

---

## 💡 Key Features at a Glance

✅ **Album Search** - iTunes integration  
✅ **Library Management** - CRUD operations  
✅ **Analytics** - 4+ interactive charts  
✅ **AI Insights** - Mood + recommendations  
✅ **Music Player** - Global playback (bonus)  
✅ **Auth** - JWT-based security  
✅ **Responsive** - Mobile-friendly design  
✅ **Dark Theme** - Tailwind CSS  
✅ **Error Handling** - Centralized  
✅ **Caching** - iTunes responses  

---

## 📱 Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | / | Redirect to search |
| Search | /search | Album search |
| Library | /library | User's albums |
| Analytics | /analytics | Dashboard with charts |
| Music | /music | Song player |
| Login | /login | User login |
| Register | /register | User registration |

---

## 🏗️ Architecture at a Glance

```
Frontend (Next.js)
  ↓ (HTTP/REST)
Backend (Spring Boot)
  ↓ (SQL)
PostgreSQL Database
  │
  └─→ iTunes API (for search)
```

---

## ✨ AI Feature: Mood Classification

8 generated insights:
1. 🎵 Mood profile based on dominant genre
2. ⭐ Top 3 artists
3. 🎧 Underrated gems to revisit
4. Era-based playlist suggestion
5. Rating-based playlist suggestion
6. Genre-specific playlist suggestion
7. 💎 Quality tier analysis
8. Collection statistics

---

## 🔍 Code Style

**Backend**: Spring Boot conventions  
**Frontend**: Next.js + TypeScript best practices  
**Naming**: Clear, descriptive  
**Comments**: Complex logic documented  
**Structure**: Logical folder organization  

---

## 📦 Key Dependencies

**Backend**:
- Spring Boot 3.x
- PostgreSQL driver
- JWT (jjwt)
- Caffeine Cache
- Flyway (migrations)

**Frontend**:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state)
- Axios (HTTP)
- Recharts (charts)

---

## 🎓 Learning Resources

- **Spring Boot**: [spring.io/guides](https://spring.io/guides)
- **Next.js**: [nextjs.org/learn](https://nextjs.org/learn)
- **JWT**: [jwt.io](https://jwt.io)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Zustand**: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

---

## ✅ Pre-Submission Checklist (Quick)

- [ ] Backend running on :8080
- [ ] Frontend running on :3000
- [ ] Can register user
- [ ] Can search albums
- [ ] Can add to library
- [ ] Can view analytics
- [ ] Can view insights
- [ ] Dark theme working
- [ ] Responsive on mobile
- [ ] All docs present
- [ ] GitHub repo public
- [ ] Ready to deploy

---

## 🎉 You're Ready!

Everything is set up and documented. Follow DEPLOYMENT.md to go live! 🚀
