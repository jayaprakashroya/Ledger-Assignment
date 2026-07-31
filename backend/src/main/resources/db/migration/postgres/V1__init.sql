-- Postgres-specific Flyway migration for production

-- Enable pgcrypto to provide gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS library_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    UNIQUE (user_id, apple_catalog_id)
);
