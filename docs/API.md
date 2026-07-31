# Music Catalog Insights - API Documentation

## Overview

The Music Catalog Insights API is a RESTful backend service built with Spring Boot that manages user authentication, album search, library operations, and analytics.

**Base URL**: `http://localhost:8080/api`

**Response Format**: All responses follow the `ApiResponse<T>` wrapper:
```json
{
  "status": "success",
  "message": "Operation description",
  "data": { /* actual data */ },
  "timestamp": "2026-07-29T12:34:56Z"
}
```

---

## Authentication

### Overview
The API uses JWT (JSON Web Token) authentication. Every request (except `/auth/**`) must include a Bearer token in the Authorization header.

### Register User

**Endpoint**: `POST /auth/register`

**Request**:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "User registered and logged in",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
    "email": "user@example.com",
    "user_id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2026-07-29T12:34:56Z"
}
```

**Error** (400 Bad Request):
```json
{
  "status": "error",
  "message": "Email already registered",
  "data": null,
  "timestamp": "2026-07-29T12:34:56Z"
}
```

---

### Login User

**Endpoint**: `POST /auth/login`

**Request**:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9...",
    "email": "user@example.com",
    "user_id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2026-07-29T12:34:56Z"
}
```

**Token Usage**: Store the token and include it in all authenticated requests:
```
Authorization: Bearer <your_token_here>
```

---

## Search

### Search Albums

**Endpoint**: `GET /search`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Album title or artist name |

**Request**:
```bash
curl -X GET "http://localhost:8080/api/search?q=Coldplay" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Albums found",
  "data": {
    "songs": [
      {
        "id": "1234567890",
        "title": "A Head Full of Dreams",
        "artist_name": "Coldplay",
        "genre": "Alternative Rock",
        "release_date": "2015-12-04",
        "track_count": 13,
        "artwork_url": "https://example.com/artwork.jpg",
        "price": 9.99
      }
      // ... more results
    ]
  },
  "timestamp": "2026-07-29T12:34:56Z"
}
```

**Notes**:
- Searches the iTunes API for publicly available albums
- Results include cover art and pricing information
- No limit parameter (returns top results)

---

## Library Management

All library endpoints require authentication.

### Get All Library Items

**Endpoint**: `GET /library`

**Request**:
```bash
curl -X GET http://localhost:8080/api/library \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Library retrieved",
  "data": [
    {
      "id": "item-123",
      "apple_catalog_id": "1234567890",
      "title": "Parachutes",
      "artist_name": "Coldplay",
      "genre": "Alternative Rock",
      "release_date": "2000-07-10",
      "track_count": 12,
      "artwork_url": "https://example.com/artwork.jpg",
      "price": 9.99,
      "user_rating": 5,
      "user_notes": "Great debut album!",
      "created_at": "2026-07-29T10:00:00Z",
      "updated_at": "2026-07-29T10:00:00Z"
    }
    // ... more items
  ],
  "timestamp": "2026-07-29T12:34:56Z"
}
```

---

### Add Album to Library

**Endpoint**: `POST /library`

**Request Body**:
```json
{
  "apple_catalog_id": "1234567890",
  "title": "Parachutes",
  "artist_name": "Coldplay",
  "genre": "Alternative Rock",
  "release_date": "2000-07-10",
  "track_count": 12,
  "artwork_url": "https://example.com/artwork.jpg",
  "price": 9.99,
  "user_rating": 5,
  "user_notes": "Great debut album!"
}
```

**Request**:
```bash
curl -X POST http://localhost:8080/api/library \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "apple_catalog_id": "1234567890",
    "title": "Parachutes",
    "artist_name": "Coldplay",
    "genre": "Alternative Rock",
    "release_date": "2000-07-10",
    "track_count": 12,
    "artwork_url": "https://example.com/artwork.jpg",
    "price": 9.99,
    "user_rating": 5,
    "user_notes": "Great debut album!"
  }'
```

**Response** (201 Created):
```json
{
  "status": "success",
  "message": "Album added to library",
  "data": {
    "id": "item-123",
    "apple_catalog_id": "1234567890",
    "title": "Parachutes",
    "artist_name": "Coldplay",
    "genre": "Alternative Rock",
    "release_date": "2000-07-10",
    "track_count": 12,
    "artwork_url": "https://example.com/artwork.jpg",
    "price": 9.99,
    "user_rating": 5,
    "user_notes": "Great debut album!",
    "created_at": "2026-07-29T12:34:56Z",
    "updated_at": "2026-07-29T12:34:56Z"
  }
}
```

---

### Update Library Item

**Endpoint**: `PUT /library/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | UUID | Library item ID |

**Request Body** (any combination of the below):
```json
{
  "user_rating": 4,
  "user_notes": "Still an amazing album"
}
```

**Request**:
```bash
curl -X PUT http://localhost:8080/api/library/item-123 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_rating": 4,
    "user_notes": "Updated notes"
  }'
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Album updated",
  "data": {
    "id": "item-123",
    "apple_catalog_id": "1234567890",
    "title": "Parachutes",
    "artist_name": "Coldplay",
    "genre": "Alternative Rock",
    "release_date": "2000-07-10",
    "track_count": 12,
    "artwork_url": "https://example.com/artwork.jpg",
    "price": 9.99,
    "user_rating": 4,
    "user_notes": "Updated notes",
    "created_at": "2026-07-29T12:34:56Z",
    "updated_at": "2026-07-29T12:35:00Z"
  }
}
```

---

### Get Library Item by ID

**Endpoint**: `GET /library/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | UUID | Library item ID |

**Request**:
```bash
curl -X GET http://localhost:8080/api/library/item-123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK): Same as Update/Add responses

---

### Delete Library Item

**Endpoint**: `DELETE /library/{id}`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | UUID | Library item ID |

**Request**:
```bash
curl -X DELETE http://localhost:8080/api/library/item-123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Album deleted from library",
  "data": {
    "success": true
  }
}
```

---

## Analytics

All analytics endpoints require authentication.

### Get Analytics

**Endpoint**: `GET /library/analytics`

**Description**: Returns aggregated analytics about the user's library including releases by year, genres, ratings distribution, and track count distribution.

**Request**:
```bash
curl -X GET http://localhost:8080/api/library/analytics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Analytics generated",
  "data": {
    "totalAlbums": 15,
    "averageRating": 4.2,
    "topGenre": "Alternative Rock",
    "releasesByYear": [
      {
        "year": "2000",
        "count": 2
      },
      {
        "year": "2015",
        "count": 3
      }
      // ... more years
    ],
    "genres": [
      {
        "name": "Alternative Rock",
        "count": 8
      },
      {
        "name": "Pop",
        "count": 5
      }
      // ... more genres
    ],
    "ratings": [
      {
        "name": "5",
        "count": 7
      },
      {
        "name": "4",
        "count": 5
      },
      {
        "name": "3",
        "count": 2
      },
      {
        "name": "Unrated",
        "count": 1
      }
    ],
    "trackCounts": [
      {
        "bucket": "1-5",
        "count": 2
      },
      {
        "bucket": "6-10",
        "count": 8
      },
      {
        "bucket": "11-15",
        "count": 4
      },
      {
        "bucket": "16+",
        "count": 1
      }
    ]
  },
  "timestamp": "2026-07-29T12:34:56Z"
}
```

---

### Get Insights

**Endpoint**: `GET /library/insights`

**Description**: Returns AI-generated text insights about the user's music library.

**Request**:
```bash
curl -X GET http://localhost:8080/api/library/insights \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "status": "success",
  "message": "Insights generated",
  "data": {
    "text": "You have an excellent taste in Alternative Rock, with 8 albums in your collection! Your top artists are Coldplay and Radiohead. Most of your albums are from the 2000s-2010s era, with an average rating of 4.2 stars. Your library includes mostly medium-length albums (6-10 tracks)."
  },
  "timestamp": "2026-07-29T12:34:56Z"
}
```

---

## Health Check

### Health Endpoint

**Endpoint**: `GET /health`

**Description**: Checks if the API is running and database is connected.

**Request**:
```bash
curl -X GET http://localhost:8080/api/health
```

**Response** (200 OK):
```json
{
  "status": "UP",
  "database": "UP",
  "message": "API is healthy"
}
```

---

## Error Handling

### Common Error Responses

**401 Unauthorized** (Missing/Invalid Token):
```json
{
  "status": "error",
  "message": "Unauthorized: Missing or invalid token",
  "data": null,
  "timestamp": "2026-07-29T12:34:56Z"
}
```

**400 Bad Request** (Invalid Data):
```json
{
  "status": "error",
  "message": "Invalid email format",
  "data": null,
  "timestamp": "2026-07-29T12:34:56Z"
}
```

**404 Not Found** (Resource Doesn't Exist):
```json
{
  "status": "error",
  "message": "Library item not found",
  "data": null,
  "timestamp": "2026-07-29T12:34:56Z"
}
```

**500 Internal Server Error**:
```json
{
  "status": "error",
  "message": "An unexpected error occurred",
  "data": null,
  "timestamp": "2026-07-29T12:34:56Z"
}
```

---

## Using Postman Collection

### Import the Collection

1. Open **Postman**
2. Click **Import** (top left)
3. Select the `MusicCatalog.postman_collection.json` file
4. The collection will appear in your Postman sidebar

### Set Up Environment

1. Create a new Environment in Postman or use the variables pre-configured in the collection
2. Variables are auto-populated after login/register:
   - `token` – JWT Bearer token
   - `email` – User email
   - `user_id` – User ID
   - `library_item_id` – Last created album ID
   - `base_url` – API base URL (default: http://localhost:8080/api)

### Test Workflow

1. **Register** → Creates new user and saves token
2. **Search Albums** → Finds albums on iTunes
3. **Add Album to Library** → Adds album and saves ID
4. **Update Album** → Changes rating/notes
5. **Get Analytics** → Views dashboard data
6. **Get Insights** → Reads AI summary
7. **Delete Album** → Removes from library

---

## Rate Limiting

Currently, no rate limiting is enforced. Production deployments should implement rate limiting via Spring Cloud Gateway or Nginx.

---

## CORS & Security

- **CORS**: Enabled for `localhost:3000` (frontend)
- **CSRF**: Disabled (stateless REST API)
- **HTTPS**: Not enforced in dev; should be enforced in production
- **JWT Signing**: HMAC-SHA-512
- **Password Encoding**: BCrypt (salted)

---

## Support & Troubleshooting

### Backend Won't Start
- Check PostgreSQL is running: `psql -U postgres -d music_catalog`
- Verify Java 17+: `java -version`
- Check logs: `./mvnw spring-boot:run` should print errors

### 401 Unauthorized Errors
- Verify token is valid and not expired
- Ensure `Authorization: Bearer <token>` header format is correct
- Register/login again to get fresh token

### 500 Errors
- Check backend logs for stack trace
- Verify database migrations ran: `SELECT * FROM schema_version;`
- Restart backend: `./mvnw spring-boot:run`

---

## API Versioning

Current Version: **1.0.0**

Future versions (if needed) will use URL versioning: `/api/v2/...`

---

## Contact & Support

For questions or issues, please refer to the main [README.md](../README.md) or create a GitHub issue.
