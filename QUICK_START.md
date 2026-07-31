# Quick Start Guide - Music Catalog Insights

## Prerequisites Verified ✅
- **Java 21**: Installed at `C:\Program Files\Java\jdk-21.0.11`
- **Node.js**: v22.18.0 ✅
- **npm**: v10.9.3 ✅

---

## Step 1: Close and Reopen Your Terminal
Close the current terminal/cmd window and open a **new one** to activate the Java PATH changes.

---

## Step 2: Verify Java (in new terminal)
```bash
java -version
```
Expected output: `java version "21.0.11"`

---

## Step 3: Start Backend (Terminal 1)
```bash
cd backend
mvnw.cmd clean install -DskipTests
mvnw.cmd spring-boot:run
```
✅ Success when you see: `Started MusicCatalogApplication in X.XXX seconds`
API available at: **http://localhost:8080**

---

## Step 4: Start Frontend (Terminal 2 - new window)
```bash
cd frontend
npm install
npm run dev
```
✅ Success when you see: `▲ Next.js 14.2.5 development server`
App available at: **http://localhost:3000**

---

## Step 5: Test the Application

### Direct to Home
- Open http://localhost:3000

### Create Account
- Email: `test@example.com`
- Password: `Test@1234`
- Click Register

### Search Albums
- Click "Search" tab
- Search for "coldplay" or "taylor swift"
- Click on album to preview

### Add to Library
- Click the + button on any album
- Give it a rating (1-5 stars)
- Add notes (optional)

### View Library
- Click "Library" tab
- See all your saved albums
- Filter by genre/rating
- Edit or delete items

### Analytics Dashboard
- Click "Analytics" tab
- View 4 interactive charts:
  - Releases per year
  - Genres distribution
  - Average ratings
  - Tracks count analysis

### AI Insights
- Click "Insights" tab
- See:
  - Your mood classification
  - Artist recommendations
  - Personalized playlists
  - Genre insights

### Music Player
- Click any album
- Use player controls (play, pause, skip, volume)
- Queue management

---

## Troubleshooting

### "java is not recognized"
- Close terminal completely
- Reopen a new cmd/PowerShell window
- Try `java -version` again

### Backend build fails
- Ensure new terminal was opened (after PATH change)
- Clear Maven cache: `mvnw.cmd clean`
- Try again: `mvnw.cmd clean install -DskipTests`

### Frontend won't start
- Ensure you're in the `/frontend` directory
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Then `npm run dev`

### API errors in browser
- Ensure backend is running (Terminal 1 shows "Started MusicCatalogApplication")
- Check http://localhost:8080/api/health should return `{"status":"UP"}`
- Clear browser cache and restart frontend

---

## Production Deployment (Optional)

If you want to deploy instead of running locally:

### Backend (Render)
Follow [DEPLOYMENT.md](DEPLOYMENT.md#backend-render)

### Frontend (Vercel)
Follow [DEPLOYMENT.md](DEPLOYMENT.md#frontend-vercel)

---

## Support Documentation
- **API Reference**: [API.md](docs/API.md)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Full Setup Guide**: [SETUP.md](SETUP.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Ready?** Close this terminal and open a new one, then follow Step 2 above!
