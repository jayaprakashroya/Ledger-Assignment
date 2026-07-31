-- H2-specific Flyway migration for local development

-- Use H2-compatible UUID generation and types
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT RANDOM_UUID(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS library_items (
    id UUID PRIMARY KEY DEFAULT RANDOM_UUID(),
    user_id UUID NOT NULL,
    apple_catalog_id BIGINT NOT NULL,
    title VARCHAR(1024) NOT NULL,
    artist_name VARCHAR(512) NOT NULL,
    genre VARCHAR(255),
    release_date DATE,
    track_count INTEGER,
    artwork_url VARCHAR(2048),
    collection_price DOUBLE PRECISION,
    user_rating INTEGER,
    user_notes TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    UNIQUE (user_id, apple_catalog_id)
);
