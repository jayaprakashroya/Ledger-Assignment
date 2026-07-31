# Local Setup Guide

Quick start guide to run Music Catalog Insights Platform locally.

---

## 📋 Prerequisites

Before you start, ensure you have installed:

- **Java**: Version 21 or higher
  ```bash
  java -version
  # Required: openjdk version "21" or higher
  ```

- **Node.js**: Version 18+ and npm
  ```bash
  node --version  # v18.0.0 or higher
  npm --version   # 9.0.0 or higher
  ```

- **PostgreSQL** (Optional - H2 will be used by default for development)
  ```bash
  psql --version  # PostgreSQL 14+ (optional)
  ```

- **Git**
  ```bash
  git --version
  ```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Create Environment File

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (optional for local dev - defaults work):

```properties
# Default H2 development configuration is already set
# To use PostgreSQL locally:
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/music_catalog
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password
SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop
```

### Step 3: Build the Project

Using Maven wrapper (no need to install Maven):

```bash
# On Windows
mvnw.cmd clean install

# On macOS/Linux
./mvnw clean install
```

This will:
- Download dependencies (~2-3 minutes first time)
- Run tests
- Build JAR file

### Step 4: Run the Backend

**Option A: Using Maven**
```bash
./mvnw spring-boot:run
```

**Option B: Using Java directly**
```bash
java -jar target/musiccatalog-1.0.0.jar
```

**Option C: Using IDE**
- Open project in IntelliJ IDEA or Eclipse
- Right-click `MusicCatalogApplication.java`
- Click **Run**

### Step 5: Verify Backend is Running

```bash
# In a new terminal:
curl http://localhost:8080/api/health

# Expected Response:
{
  "status": "UP",
  "components": {
    "db": { "status": "UP" },
    "diskSpace": { "status": "UP" }
  }
}
```

✅ Backend is ready when you see `"status": "UP"`

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all packages (~1-2 minutes).

### Step 3: Create Environment File

Create `.env.local`:

```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_USE_MOCK_API=false
EOF
```

This configures frontend to connect to your local backend.

### Step 4: Run Development Server

```bash
npm run dev
```

You'll see:
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

✅ Frontend is ready when you see the search page load

---

## 🧪 Test the Application

### 1. Register a New User

1. Click **Sign In** button (top right)
2. Click **"Don't have an account? Register"**
3. Enter:
   - Email: `test@example.com`
   - Password: `Test123!@#`
4. Click **Register**

✅ You should be redirected to search page

### 2. Search for Albums

1. Type **"coldplay"** in search box
2. Press Enter or click Search
3. Click **Play** on any album to hear a preview

✅ Albums should load with artwork and preview button

### 3. Add to Library

1. Click **Add to Library** button on any album
2. Toast notification: **"Saved to library"**

### 4. View Library

1. Click **Library** in navbar
2. See your saved albums
3. Click on star rating to edit (1-5 stars)
4. Add notes in the text area
5. Click **Save** to persist changes

✅ Changes should update immediately

### 5. View Analytics

1. Click **Analytics** in navbar
2. See 4 interactive charts:
   - Releases by Year (Bar)
   - Top Genres (Pie)
   - Rating Distribution (Bar)
   - Track Count Distribution (Bar)

✅ Charts should render based on your library

### 6. View AI Insights

1. Scroll down on Analytics page
2. See personalized insights about your collection
3. AI-generated recommendations and mood analysis

### 7. Music Player (Bonus)

1. Click **🎵 Music** in navbar
2. Search for a song: **"shape of you"**
3. Click play button on any song
4. Use floating player at bottom to control playback
5. Use player controls: play/pause, skip, volume

✅ Music should play with controls working

---

## 🐛 Common Issues & Solutions

### Backend won't start

**Issue**: `Port 8080 already in use`

```bash
# Solution 1: Kill process on port 8080
# On Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:8080 | xargs kill -9
```

**Issue**: `Failed to configure a DataSource`

```bash
# Solution: Make sure you're using Java 21+
java -version
```

### Frontend won't start

**Issue**: `Port 3000 already in use`

```bash
# Use different port:
npm run dev -- -p 3001
# Then visit: http://localhost:3001
```

**Issue**: `Module not found`

```bash
# Clear node_modules and reinstall:
rm -rf node_modules
npm install
npm run dev
```

### Backend and frontend can't communicate

**Issue**: `GET http://localhost:8080/api/search 0 (error)`

**Solutions**:
1. Make sure backend is running: `curl http://localhost:8080/api/health`
2. Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
3. Browser console (F12) to see actual error

### Database errors

**Issue**: `Connection refused` or `Access denied`

**Solutions**:
1. Backend uses H2 by default (no PostgreSQL needed)
2. If using PostgreSQL, ensure it's running
3. Check credentials in `application.properties`

---

## 📁 Project Structure Quick Reference

```
Music Catalog/
├── backend/
│   ├── src/main/java/com/example/musiccatalog/
│   │   ├── controller/     ← REST endpoints Here
│   │   ├── service/        ← Business logic here
│   │   └── model/          ← Database entities
│   ├── pom.xml             ← Dependencies
│   ├── mvnw               ← Maven wrapper (Linux/Mac)
│   └── mvnw.cmd           ← Maven wrapper (Windows)
│
├── frontend/
│   ├── app/               ← Next.js pages
│   │   ├── search/        ← Album search
│   │   ├── library/       ← User library
│   │   ├── analytics/     ← Dashboard
│   │   ├── music/         ← Music player
│   │   └── login/register ← Auth pages
│   ├── components/        ← Reusable components
│   ├── lib/              ← Utilities & API client
│   ├── package.json      ← Dependencies
│   └── .env.local        ← Local config (create this)
│
├── docs/
│   ├── API.md            ← API documentation
│   └── MusicCatalog.postman_collection.json
│
├── README.md             ← Project overview
├── SETUP.md              ← This file
└── DEPLOYMENT.md         ← Production deployment
```

---

## 🛠 Useful Commands

### Backend

```bash
cd backend

# Build only (no tests)
./mvnw clean package -DskipTests

# Run tests
./mvnw test

# Run specific test
./mvnw test -Dtest=AuthServiceTest

# Format code
./mvnw spotless:apply

# Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Frontend

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start

# Run linter
npm run lint

# Format code
npm run format  # (if prettier configured)
```

---

## 📝 Environment Variables Reference

### Backend (.env.local or application.properties)

| Variable | Default | Purpose |
|----------|---------|---------|
| `SPRING_DATASOURCE_URL` | H2 in-memory | Database connection |
| `JWT_SECRET` | Built-in | JWT signing secret |
| `ITUNES_API_BASEURL` | https://itunes.apple.com | iTunes API endpoint |

### Frontend (.env.local)

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend API endpoint |
| `NEXT_PUBLIC_USE_MOCK_API` | No | Use mock API if backend unavailable |

---

## 🔍 Testing API Endpoints

### Using curl

```bash
# Search albums
curl "http://localhost:8080/api/search?query=coldplay&type=album&limit=5"

# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!@#"}'

# (Note: Other endpoints require JWT token)
```

### Using Postman

1. Import collection: `docs/MusicCatalog.postman_collection.json`
2. Set environment variables
3. Run requests

---

## 📚 Documentation

- **README.md** - Project overview & features
- **DEPLOYMENT.md** - Production deployment guide
- **docs/API.md** - Complete API reference
- **docs/MusicCatalog.postman_collection.json** - API examples

---

## ✨ Next Steps

After successful local setup:

1. **Explore the UI** - Get familiar with all features
2. **Check the Code** - Understand the architecture
3. **Run Tests** - `./mvnw test` and `npm test` (when available)
4. **Try Modifications** - Make small changes and see how they work
5. **Deploy** - Follow `DEPLOYMENT.md` to go live

---

## 💬 Need Help?

- Check error messages carefully - they often pinpoint the issue
- Review logs: Backend logs in console, Frontend logs in browser console (F12)
- Check `.env.local` files are created and have correct values
- Verify both services are running and connected

---

## 🎉 All Set!

Your local development environment is ready. Happy coding! 🚀
