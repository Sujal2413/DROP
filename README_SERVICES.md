# DROP Service Runner Guide

This document lists all the commands needed to run the databases, caching services, and web applications in this repository.

---

## 1. Running Redis

This project uses Redis for session validation, Refresh Token Rotation (RTR), and rate limiting.

### Option A: Via Homebrew (macOS)
If you have Homebrew installed, run:
```bash
# Install Redis
brew install redis

# Start Redis as a background service
brew services start redis

# Check if Redis is running
redis-cli ping
# Expected response: PONG
```

### Option B: Via Docker
If you prefer running Redis inside a container:
```bash
# Run Redis container in detached mode on default port 6379
docker run --name drop-redis -p 6379:6379 -d redis

# Verify the container status
docker ps
```

---

## 2. Running MongoDB

MongoDB is used for persistent storage of user credentials, provider profiles, and system collections.

### Option A: Via Local Binary (Manual startup)
If MongoDB is already installed on your system but not running:
```bash
# Start MongoDB in the background using the default config
mongod --config /opt/homebrew/etc/mongod.conf --fork
```

### Option B: Via Homebrew (macOS)
```bash
# Install the Community Edition if not already present
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB as a background service
brew services start mongodb-community
```

### Option C: Via Docker
If you want to spin up MongoDB inside a container:
```bash
# Run MongoDB container in detached mode on default port 27017
docker run --name drop-mongo -p 27017:27017 -d mongo

# Verify container status
docker ps
```

---

## 3. Running the Next.js Dev Server

Run the Next.js frontend and integrated backend server on the configured port `3002`:

```bash
# Install project dependencies
npm install

# Start the Next.js development server
npm run dev
```

The application will be accessible at: **`http://localhost:3002`**.

---

## 4. Troubleshooting Databases

### Check open ports on your machine:
```bash
# Check if MongoDB is running on port 27017
lsof -i :27017

# Check if Redis is running on port 6379
lsof -i :6379
```

### Stop Homebrew Services:
```bash
# Stop MongoDB
brew services stop mongodb-community

# Stop Redis
brew services stop redis
```
