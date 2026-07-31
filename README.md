# Music Catalog Insights Platform

**A full-stack web application** for building and exploring a personal music library with AI-driven insights and analytics, sourced from the iTunes public catalog.

**Developer**: Jaya Prakash Maneri  
**Location**: Puttaparthi, Andhra Pradesh, India  
**Phone**: +91 9014792534  
**Email**: manerijayaprakash@gmail.com  
**GitHub Profile**: [jayaprakashroya](https://github.com/jayaprakashroya)  
**Portfolio**: [My Portfolio](https://jayaprakashroya.github.io/Myportofolio/)  
**LinkedIn**: [Maneri Jaya Prakash](https://www.linkedin.com/in/maneri-jaya-prakash9014/)  
**Project Repository**: [Ledger Assignment GitHub Repo](https://github.com/jayaprakashroya/Ledger-Assignment)  
**Live Demo**: [Deployment URL - Vercel/Render]

---

## 📋 Assignment Overview

**Focus Entity**: **ALBUMS** ✅

### Why Albums?
- Albums are the core musical unit with rich metadata (release date, genre, artist, track count)
- Allow comprehensive analytics (genre distribution, release year trends, collection growth)
- Provide better user experience for building curated collections
- Enable meaningful AI insights (mood analysis, artist recommendations, playlist generation)
- Support both album-level and song-level preview functionality

---

## 🎯 Features Implemented

### ✅ Core Features
- **User Authentication**: Secure JWT-based email/password registration & login
- **Album Search**: Browse millions of albums via iTunes Search API integration
  - Search by query with configurable limit
  - Support for album, song, and artist entity types
  - Caching of iTunes API responses (15min TTL)
- **Library Management**: 
  - Save selected albums to personal library
  - Edit ratings (1-5 stars) and custom notes
  - Delete albums from library
  - Unique constraint prevents duplicates per user
- **Music Player** (Bonus Feature):
  - Spotify-style sticky player at bottom of app
  - Play/pause, skip controls, volume adjustment
  - Song search from iTunes API
  - Queue management across pages

### ✅ Analytics Dashboard (4+ Charts)
- **Bar Chart**: Releases by Year – Visualize collection growth over time
- **Pie Chart**: Top Genres – Distribution of music genres in library
- **Bar Chart**: Rating Distribution – How many albums at each rating level
- **Bar Chart**: Track Count Distribution – Albums grouped by track count (1-5, 6-10, 11-15, 16+)

### ✅ AI-Powered Insights
**Implemented Feature: Intelligent Library Analysis with Mood Classification**

Generates personalized insights including:
- 🎵 **Music Mood Classification** – Emotional profile based on dominant genre
  - HIGH ENERGY & REBELLIOUS (Rock/Metal/Punk)
  - CALM & INTROSPECTIVE (Classical/Jazz/Ambient)
  - UPBEAT & DANCEABLE (Pop/EDM/Dance)
  - SOULFUL & EMOTIONAL (Blues/Soul/R&B)
  - DYNAMIC & EXPRESSIVE (Hip-Hop/Rap)
  - ECLECTIC & DIVERSE (Mixed genres)
  - Quality tier based on average rating

- ⭐ **Artist Deep Dive** – Top 3 most prolific artists + underrated gems to revisit
- 🎧 **Playlist Suggestions** – Era-based, rating-based, and genre-specific playlists
- 💎 **Collection Quality Analysis** – Rating completion score and quality tier

### ✅ Responsive Design
- Beautiful dark-themed UI with Tailwind CSS
- Mobile-first responsive layout
- Loading states and empty states
- Error handling with toast notifications

### ✅ Offline Support
- Mock API fallback for demo without backend
- Works seamlessly when API is unreachable

---

## 🏗️ Architecture

### Backend (Spring Boot REST API)

**Language**: Java 21  
**Framework**: Spring Boot 3.x  
**Port**: `8080`  
**Database**: PostgreSQL (Production) / H2 (Development)  
**Cache**: Caffeine (iTunes API responses)

```
backend/
├── src/main/java/com/example/musiccatalog/
│   ├── controller/
│   │   ├── SearchController.java        # GET /api/search
│   │   ├── LibraryController.java       # CRUD /api/library/*
│   │   ├── AuthController.java          # Auth endpoints
│   │   └── HealthController.java        # Health check
│   ├── service/
│   │   ├── ITunesService.java           # iTunes API integration
│   │   ├── LibraryItemService.java      # Library logic + analytics/insights
│   │   ├── AuthService.java             # User registration/login
│   │   └── CustomUserDetailsService.java # Spring Security integration
│   ├── repository/
│   │   ├── LibraryItemRepository.java   # JPA queries
│   │   ├── UserRepository.java
│   │   └── AlbumRepository.java
│   ├── model/
│   │   ├── LibraryItem.java             # Album entity
│   │   ├── User.java
│   │   └── Album.java
│   ├── dto/
│   │   ├── AlbumDTO.java
│   │   ├── LibraryItemDTO.java
│   │   ├── AnalyticsDTO.java
│   │   ├── ApiResponse.java
│   │   ├── AuthDTO.java
│   │   └── ITunesSearchResponse.java
│   ├── security/
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── JwtService.java
│   │   └── JwtTokenProvider.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── CacheConfig.java
│   ├── exception/
│   │   ├── CustomExceptions.java
│   │   └── GlobalExceptionHandler.java
│   └── MusicCatalogApplication.java
├── src/main/resources/
│   ├── application.properties
│   ├── application-prod.properties
│   └── db/migration/
│       └── V1__init.sql
└── pom.xml
```

### Frontend (Next.js 14 + React)

**Framework**: Next.js 14 (App Router)  
**UI Library**: Tailwind CSS  
**State Management**: Zustand  
**HTTP Client**: Axios  
**Charts**: Recharts  
**Notifications**: Sonner  
**Icons**: Lucide React  
**Port**: `3000`

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── providers.tsx              # Global providers
│   ├── page.tsx                   # Home (redirects to /search)
│   ├── globals.css
│   ├── search/
│   │   └── page.tsx               # Album search interface
│   ├── library/
│   │   └── page.tsx               # Library view + edit/delete
│   ├── analytics/
│   │   └── page.tsx               # Analytics dashboard (4 charts)
│   ├── music/
│   │   └── page.tsx               # Music player with song search
│   ├── login/
│   │   └── page.tsx               # Login page
│   └── register/
│       └── page.tsx               # Registration page
├── components/
│   ├── NavBar.tsx                 # Navigation bar
│   ├── MusicPlayer.tsx            # Global music player (sticky)
│   ├── AlbumCard.tsx              # Reusable album card with play
│   ├── ProtectedRoute.tsx         # Auth guard wrapper
│   ├── RatingStars.tsx            # 5-star rating component
│   ├── LoadingSkeleton.tsx        # Loading state
│   └── ThemeToggle.tsx            # Dark/light theme
├── lib/
│   ├── api.ts                     # axios + API endpoints
│   ├── playerStore.ts             # Zustand player state
│   ├── store.ts                   # Zustand auth state
│   └── mockApi.ts                 # Mock API for offline demo
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── vite.config.js
```

---

## 📊 Database Schema

### Entity Relationship
```
Users (1) ──→ (N) LibraryItems
                  │
                  ├─ apple_catalog_id (FK to iTunes API)
                  ├─ User Metadata (title, artist, genre, etc.)
                  ├─ User Annotations (rating, notes)
                  └─ Timestamps (created_at, updated_at)
```

### LibraryItem Table
```sql
CREATE TABLE library_items (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    apple_catalog_id BIGINT NOT NULL,              -- iTunes catalog ID
    title VARCHAR(1024) NOT NULL,                  -- Album name
    artist_name VARCHAR(512) NOT NULL,             -- Primary artist
    genre VARCHAR(255),                            -- Primary genre
    release_date DATE,                             -- Release date
    track_count INTEGER,                           -- Number of tracks
    artwork_url VARCHAR(2048),                     -- Album artwork
    collection_price DOUBLE PRECISION,             -- Album price
    user_rating INTEGER CHECK (rating >= 1 AND rating <= 5),  -- 1-5 stars
    user_notes TEXT,                               -- Custom user notes
    created_at TIMESTAMP DEFAULT now(),            -- When added to library
    updated_at TIMESTAMP DEFAULT now(),            -- Last modified
    UNIQUE (user_id, apple_catalog_id)             -- No duplicates per user
);
```

### Database Choice: **PostgreSQL**

**Justification**:
- ✅ **Structured Data**: Album metadata is highly structured with fixed schema
- ✅ **ACID Compliance**: Ensures data integrity for financial transactions (album purchase history)
- ✅ **Relationships**: Foreign keys maintain user-album relationships reliably
- ✅ **Scalability**: Better than MySQL for concurrent reads/writes at scale
- ✅ **Advanced Features**: JSON support for future insight storage, full-text search for discoverability
- ✅ **Cost**: Open-source, free to deploy on Render/Railway
- ✅ **Caching Layer**: Works seamlessly with Caffeine cache for iTunes API

**NoSQL Not Chosen** (MongoDB would be suboptimal because):
- Album structure is rigid and well-defined
- ACID guarantees needed for user data consistency
- No need for document-style flexibility
- PostgreSQL's JSON support covers any future flexibility needs

---

## 🔌 REST API Reference

### Base URL
```
Local:       http://localhost:8080/api
Production:  https://your-domain.com/api
```

### Authentication
All endpoints (except `/auth/*`) require JWT token in header:
```
Authorization: Bearer <jwt_token>
```

### 1. Search Albums
```http
GET /search?query=coldplay&type=album&limit=20
```
**Params**:
- `query` (required): Search term (artist, album, song)
- `type` (default: album): album, song, musicArtist
- `limit` (default: 10, max: 50): Number of results

**Response**: `200 OK`
```json
{
  "data": [
    {
      "apple_catalog_id": 1440806041,
      "title": "Parachutes",
      "artist_name": "Coldplay",
      "genre": "Alternative",
      "release_date": "2000-07-10",
      "track_count": 10,
      "artwork_url": "https://...",
      "price": 9.99
    }
  ],
  "message": "Search completed",
  "status": "success"
}
```

### 2. Get User Library
```http
GET /library
Authorization: Bearer <token>
```

**Response**: `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "apple_catalog_id": 1440806041,
      "title": "Parachutes",
      "artist_name": "Coldplay",
      "genre": "Alternative",
      "release_date": "2000-07-10",
      "track_count": 10,
      "artwork_url": "https://...",
      "collection_price": 9.99,
      "user_rating": 5,
      "user_notes": "Favorite album!",
      "created_at": "2026-07-30T10:00:00Z",
      "updated_at": "2026-07-30T10:00:00Z"
    }
  ],
  "message": "Library fetched successfully",
  "status": "success"
}
```

### 3. Add Album to Library
```http
POST /library
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "apple_catalog_id": 1440806041,
  "title": "Parachutes",
  "artist_name": "Coldplay",
  "genre": "Alternative",
  "release_date": "2000-07-10",
  "track_count": 10,
  "artwork_url": "https://...",
  "collection_price": 9.99,
  "user_rating": 4,
  "user_notes": "Great album to revisit"
}
```

**Response**: `200 OK`
```json
{
  "data": { "id": "uuid", ... },
  "message": "Item added to library",
  "status": "success"
}
```

**Error**: `409 Conflict` (album already in library)

### 4. Update Album Rating/Notes
```http
PUT /library/{id}
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "user_rating": 5,
  "user_notes": "Updated notes"
}
```

**Response**: `200 OK`

### 5. Delete Album from Library
```http
DELETE /library/{id}
Authorization: Bearer <token>
```

**Response**: `200 OK`
```json
{
  "data": null,
  "message": "Item removed from library",
  "status": "success"
}
```

### 6. Get Analytics
```http
GET /library/analytics
Authorization: Bearer <token>
```

**Response**: `200 OK`
```json
{
  "data": {
    "totalAlbums": 42,
    "averageRating": 4.2,
    "averagePrice": 9.95,
    "topArtist": "Coldplay",
    "topGenre": "Alternative",
    "genres": [
      { "name": "Alternative", "count": 15 },
      { "name": "Rock", "count": 10 }
    ],
    "releasesByYear": [
      { "year": "2020", "count": 8 },
      { "year": "2021", "count": 12 }
    ],
    "ratings": [
      { "name": "5", "count": 20 },
      { "name": "4", "count": 15 }
    ],
    "trackCounts": [
      { "bucket": "6-10", "count": 25 },
      { "bucket": "11-15", "count": 12 }
    ]
  },
  "message": "Analytics generated",
  "status": "success"
}
```

### 7. Get AI Insights
```http
GET /library/insights
Authorization: Bearer <token>
```

**Response**: `200 OK`
```json
{
  "data": "📚 **Your Music Library Overview**\nYou have 42 albums in your collection with a strong Alternative profile. Coldplay is your most frequent artist. Your collection spans 15 years.\n\n🎵 **Your Music Mood**\n⚡⚡⚡ HIGH ENERGY & REBELLIOUS\n...",
  "message": "Insights generated",
  "status": "success"
}
```

### 8. User Registration
```http
POST /auth/register
Content-Type: application/json
```

**Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response**: `200 OK`
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiI...",
    "email": "user@example.com",
    "user_id": "uuid"
  },
  "message": "Registered successfully",
  "status": "success"
}
```

### 9. User Login
```http
POST /auth/login
Content-Type: application/json
```

**Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response**: `200 OK` (same as registration)

### Error Handling
All errors follow standard HTTP status codes with consistent response format:

```json
{
  "data": null,
  "message": "Detailed error message",
  "status": "error",
  "timestamp": "2026-07-30T10:00:00Z"
}
```

**Status Codes**:
- `200 OK` – Success
- `400 Bad Request` – Validation error
- `401 Unauthorized` – Missing/invalid JWT token
- `404 Not Found` – Album not in library
- `409 Conflict` – Album already saved / Email already registered
- `500 Internal Server Error` – Server error with error ID for logging

---

## 🚀 Quick Start

### Prerequisites
- **Java 21+** (Backend)
- **Node.js 18+** (Frontend)
- **PostgreSQL 14+** (Production) or H2 (Development)
- **Git**

### Backend Setup

#### 1. Clone & Navigate
```bash
git clone <repo-url>
cd backend
```

#### 2. Configure Database
Edit `src/main/resources/application.properties`:

**Development (H2)**:
```properties
spring.datasource.url=jdbc:h2:mem:musiccatalog
spring.jpa.hibernate.ddl-auto=none
```

**Production (PostgreSQL)**:
```bash
# Create environment file: .env
DATABASE_URL=postgresql://user:password@localhost:5432/music_catalog
JWT_SECRET=your-secret-key-here-min-32-chars
```

#### 3. Build & Run
```bash
# Install dependencies
./mvnw clean install

# Run locally
./mvnw spring-boot:run

# Or using Java directly
java -jar target/musiccatalog-1.0.0.jar
```

**Verify**:
```bash
curl http://localhost:8080/api/health
```

### Frontend Setup

#### 1. Navigate & Install
```bash
cd frontend
npm install
```

#### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_USE_MOCK_API=false
```

#### 3. Run Development Server
```bash
npm run dev
```

**Open**: http://localhost:3000

#### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🧪 Testing

### Backend Unit Tests
```bash
cd backend
./mvnw test

# With coverage
./mvnw test jacoco:report
```

### Frontend Testing (Ready for Implementation)
```bash
cd frontend
npm test
npm run test:coverage
```

---

## 📦 Deployment

### Backend Deployment (Render.com)

1. **Create Render Account**: https://render.com
2. **Connect GitHub**: Authorize repository
3. **Create Web Service**:
   - **Name**: music-catalog-api
   - **Runtime**: Java
   - **Build**: `./mvnw clean install`
   - **Start**: `java -jar target/musiccatalog-1.0.0.jar`
   - **Environment**: Add PostgreSQL connection string

4. **Create PostgreSQL Database**:
   - **Name**: music-catalog-db
   - **PostgreSQL Version**: 14+
   - Copy connection string to `.env`

5. **Deploy**:
   ```
   Backend URL: https://music-catalog-api.onrender.com
   ```

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: https://vercel.com
2. **Connect GitHub**: Import repository
3. **Configure**:
   - **Framework**: Next.js
   - **Root Directory**: ./frontend
   - **Build**: `npm run build`
   - **Output**: `.next`
   - **Environment**: 
     ```
     NEXT_PUBLIC_API_BASE_URL=https://music-catalog-api.onrender.com/api
     NEXT_PUBLIC_USE_MOCK_API=false
     ```
4. **Deploy**: Vercel auto-deploys on push to main

   **Frontend URL**: https://music-catalog.vercel.app

---

## 📊 Trade-offs & Design Decisions

### 1. **JWT vs Session Authentication**
- **Choice**: JWT (Stateless)
- **Rationale**: Microservices-ready, scales better, simplifies deployment

### 2. **H2 Development vs PostgreSQL**
- **Choice**: H2 for dev, PostgreSQL for production
- **Rationale**: Fast local development iteration, production-grade database in staging/prod

### 3. **Client-side vs Server-side Search**
- **Choice**: Server-side with iTunes API caching
- **Rationale**: Search is CPU-intensive, caching reduces external API calls, better security

### 4. **Zustand vs Redux**
- **Choice**: Zustand (simpler state management)
- **Rationale**: Less boilerplate, sufficient for app complexity, easier to test

### 5. **Recharts vs Chart.js**
- **Choice**: Recharts (React-native)
- **Rationale**: Built for React, responsive out-of-the-box, supports dark theme

### 6. **Mock API Fallback**
- **Choice**: Implemented fallback to mock API if backend unavailable
- **Rationale**: Enables full app demo without backend, improves user experience

### 7. **AI Implementation Strategy**
- **Choice**: Server-side insights generation in LibraryItemService
- **Rationale**: Scales with more data, reduces frontend bundle size, consistent across users

---

## 🔐 Security

- ✅ **JWT Authentication**: 24-hour token expiration, secure secret rotation
- ✅ **Password Hashing**: BCrypt with salt (Spring Security)
- ✅ **Database Constraints**: Unique email, user-album uniqueness
- ✅ **CORS**: Configured for frontend origin only
- ✅ **Input Validation**: Request validation with Spring Boot validation annotations
- ✅ **Error Handling**: No sensitive data in error responses
- ✅ **HTTPS Forced**: In production deployment

---

## 📈 Scalability Considerations

- ✅ **Database Indexing**: Indexes on user_id, apple_catalog_id for fast queries
- ✅ **API Caching**: Caffeine cache for iTunes search results (15min TTL)
- ✅ **Pagination Ready**: Repository supports offset/limit for large libraries
- ✅ **Connection Pooling**: HikariCP with configurable pool size
- ✅ **Lazy Loading**: Entity relationships configured for optimal queries

---

## 🎨 UI/UX Features

- ✅ **Dark Theme**: Tailwind CSS dark mode by default
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Loading States**: Skeleton loaders during data fetch
- ✅ **Empty States**: Helpful messages when no data available
- ✅ **Error Handling**: Toast notifications (Sonner)
- ✅ **Debounced Search**: 300ms debounce to reduce API calls
- ✅ **Rating Stars**: Interactive 5-star rating component

---

## 📚 Good-to-Have Features Implemented

- ✅ **Pagination Endpoints**: Set up in repositories for large datasets
- ✅ **Debounced Search**: Frontend search debounces API calls (300ms)
- ✅ **Caching**: Caffeine cache on iTunes API responses
- ✅ **Music Player**: Bonus feature - play song previews
- ✅ **Insights Generation**: AI-powered library analysis
- ✅ **Environment Config**: Different profiles for dev/prod/test

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Submit Pull Request

---

## 📄 License

MIT License - See LICENSE.md

---

## 👨‍💻 Author

**Jaya Prakash Maneri**  
Puttaparthi, Andhra Pradesh, India  
[GitHub](https://github.com/jayaprakashroya) | [LinkedIn](https://www.linkedin.com/in/maneri-jaya-prakash9014/) | [Email](mailto:manerijayaprakash@gmail.com)

---

## 📞 Support

- **Documentation**: See `/docs` folder
- **API Docs**: [Postman Collection](./docs/MusicCatalog.postman_collection.json)
- **Issues**: Create an issue in GitHub

---

## ✨ Acknowledgments

- **iTunes Search API**: Apple
- **Design Inspiration**: Spotify, Apple Music
- **Frameworks**: Spring Boot, Next.js, Recharts, Tailwind CSS


### Frontend (Next.js 14)

**Port**: `3000`  
**State**: Zustand (auth store with localStorage)  
**HTTP**: Axios with JWT interceptor + mock fallback

```
frontend/
├── app/                     # Next.js App Router pages
│   ├── login/              # Login page
│   ├── register/           # Registration
│   ├── search/             # Album search
│   ├── library/            # Library management
│   ├── analytics/          # Dashboard (4 charts + insights)
│   └── globals.css         # Dark theme
├── components/             # Reusable React components
├── lib/
│   ├── api.ts             # Axios + mock fallback
│   ├── mockApi.ts         # localStorage-based mock backend
│   └── store.ts           # Zustand auth state
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (frontend)
- **Java 17+** (backend)
- **PostgreSQL** 12+ (optional – use mock API for demo)
- **npm** or **pnpm**

### Option 1: Demo (No Backend Required)

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_USE_MOCK_API=true" > .env.local
npm run dev
```

**Test Account**:
- Email: `demo@example.com`
- Password: `password123`

Visit: http://localhost:3000

---

### Option 2: Full Stack (With Backend)

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
./mvnw clean install            # Linux/macOS
mvnw.cmd clean install          # Windows

# Configure database in application.properties
# spring.datasource.url=jdbc:postgresql://localhost:5432/music_catalog
# spring.datasource.username=postgres
# spring.datasource.password=password

# Run migrations & start server
./mvnw spring-boot:run
# API: http://localhost:8080/api
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
# UI: http://localhost:3000
```

Frontend will auto-connect to backend on port 8080.

---

## 📊 Database Schema

**Users** table:
- `id` (PK)
- `email` (unique)
- `password_hash` (BCrypt)
- `created_at`

**Library Items** table:
- `id` (PK)
- `user_id` (FK → users)
- `apple_catalog_id` (iTunes ID)
- `title`, `artist_name`, `genre`
- `release_date`, `track_count`
- `artwork_url`, `price`
- `user_rating` (1-5, nullable)
- `user_notes` (text)
- `created_at`, `updated_at`

**Migrations**: Flyway auto-runs `V1__init.sql` on first startup.

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register      { email, password } → { token, email, user_id }
POST   /api/auth/login         { email, password } → { token, email, user_id }
```

### Search
```
GET    /api/search?q=...       → { songs: [AlbumDTO] }
```

### Library (All require Bearer token)
```
GET    /api/library            → [LibraryItemDTO]
POST   /api/library            { CreateLibraryItemRequest } → LibraryItemDTO
PUT    /api/library/{id}       { user_rating, notes } → LibraryItemDTO
DELETE /api/library/{id}       → { success: true }
GET    /api/library/analytics  → AnalyticsDTO (4 chart datasets)
GET    /api/library/insights   → { text: "..." }
```

**Auth Header**: `Authorization: Bearer <JWT_TOKEN>`

---

## 🎨 UI & Theming

**Dark Theme** (globals.css):
- Base: Slate-950 background with radial + linear gradients
- Accent colors: Cyan, Purple, Pink, Emerald
- Custom utilities: `.card`, `.label`, `.input`, `.button`
- Responsive: Mobile→Tablet→Desktop with Tailwind breakpoints

**Components**:
- `NavBar.tsx`: Brand + sign-out button
- `ProtectedRoute.tsx`: Checks auth state before rendering
- `AlbumCard.tsx`: Album info + rating + delete button
- `RatingStars.tsx`: Interactive 1-5 star picker
- `LoadingSkeleton.tsx`: Placeholder while fetching

---

## 🔐 Security

- **JWT Tokens**: HMAC-SHA-512 signing
- **Password**: BCrypt salted hashing
- **CORS**: Enabled for localhost:3000
- **CSRF**: Disabled (stateless REST API)
- **Sessions**: Stateless (no server-side storage)

**Token Flow**:
1. Register/login → Backend generates JWT
2. Frontend stores in Zustand + localStorage
3. Every request: `Authorization: Bearer <token>`
4. Backend validates signature & expiration
5. Token persists across reloads (Zustand hydration)

---

## 📊 Analytics Dashboard

### 4 Interactive Charts

1. **Releases by Year** (BarChart)
   - Shows music library growth timeline

2. **Top Genres** (PieChart with donut)
   - Color-coded genre distribution

3. **Ratings Distribution** (BarChart)
   - User preference breakdown (1-5 stars, Unrated)

4. **Track Count Distribution** (BarChart)
   - Album length preference (1-5, 6-10, 11-15, 16+ tracks)

### AI-Powered Insights Engine

The platform includes an intelligent insights generator that analyzes your library across multiple dimensions:

**1. Music Mood Classification**
- Analyzes your top genre and average ratings
- Classifies mood as: HIGH ENERGY, CALM, UPBEAT, SOULFUL, DYNAMIC, or ECLECTIC
- Provides context about your listening habits

**2. Artist Recommendations**
- Lists your top 3 most prolific artists with album counts and average ratings
- Identifies "Underrated Gems" – albums you rated 3 or lower that have 8+ tracks
- Suggests albums worth revisiting

**3. Playlist Suggestions**
- **Era-based** – Groups albums by decade, highlights your largest era
- **Rating-based** – "Favorites" (5-star albums), "Solid Picks" (4+ star albums)
- **Genre Deep Dive** – Creates curator-style genre playlists

**4. Collection Quality Analysis**
- Calculates your rating completion percentage
- Assigns quality tier (EXCELLENT / GREAT / GOOD / DISCOVERING)
- Encourages continued engagement with unrated albums

**How It Works:**
- Run on every analytics page load
- Process user's entire library in real-time
- No ML/API dependencies – pure algorithmic analysis
- Generates results within milliseconds

---

## 🧪 Testing

```bash
cd backend
./mvnw test
```

Key services:
- `JwtService`: Token generation & validation
- `AuthService`: Registration & login logic
- `LibraryItemService`: CRUD + analytics

---

## 🐳 Docker (Optional)

**Backend Dockerfile**:
```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk-alpine
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

```bash
docker build -t music-catalog-backend ./backend
docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/music_catalog music-catalog-backend
```

---

## 📦 Build & Deploy

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Railway / Render)
```bash
cd backend
./mvnw clean package
# Upload JAR + attach PostgreSQL
```

---

## 🛠 Tech Stack

| Layer | Tech | Notes |
|-------|------|-------|
| **Frontend** | Next.js 14, React 18, TypeScript 5.6 | App Router, SSR-capable |
| | Tailwind CSS 3.4 | Utility-first styling |
| | Zustand 4.4 | Lightweight state management |
| | Axios | HTTP client with interceptors |
| | Recharts | Interactive charts |
| | Sonner | Toast notifications |
| | Lucide React | Icon library |
| **Backend** | Spring Boot 3, Java 17/21 LTS | REST API |
| | Spring Security 6 | JWT auth + CORS |
| | Spring Data JPA | Database ORM |
| | jjwt | JWT signing |
| | PostgreSQL | Relational database |
| | Caffeine | Request caching |
| | Flyway | DB migrations |

---

## 📝 Entity Design Rationale

**Albums** were chosen as the primary entity because:
- Rich metadata (artist, genre, release date, track count)
- Natural user workflow (search → save → rate → analyze)
- Analytics-friendly (grouping by genre, year, rating)
- iTunes API provides reliable album data

**Relational Model** (not NoSQL):
- Strict user-album relationships
- Predictable queries for analytics
- Easy CRUD operations
- Transaction support for consistency

---

## 🎵 Development Notes

- **Mock API**: Enabled via `NEXT_PUBLIC_USE_MOCK_API=true` (useful when backend is down)
- **Hot Reload**: Frontend dev server has fast refresh; backend requires restart
- **Debugging**: Frontend errors logged to browser console; backend errors in Spring logs
- **Email Search**: iTunes API searches by artist/album title (not individual songs)

---

## 📧 Support

For issues or questions:
1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Review [Backend API Docs](./backend)
3. Check [Frontend Docs](./frontend)

---

## 📝 License

MIT License – See LICENSE file for details.

---

**Ready to catalog your music? Let's go! 🎶**

---

## 📚 Additional Documentation

- **[API Reference](./docs/API.md)** – Complete endpoint documentation with curl examples
- **[Postman Collection](./docs/MusicCatalog.postman_collection.json)** – Import into Postman for interactive API testing
  - Auto-saves JWT tokens between requests
  - Pre-configured environment variables
  - Test workflow examples
