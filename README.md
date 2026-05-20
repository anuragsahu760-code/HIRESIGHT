# HireSight

HireSight is a full-stack job aggregation and recommendation platform built with React and Express. It is designed to feel like a modern hiring product instead of a classroom demo, combining job discovery, analytics, and AI-style ranking into a cleaner candidate experience.

## What This Project Shows

- Multi-source job feed presentation
- Search and filtering across role metadata
- Recommendation scoring based on user-fit signals
- Analytics cards for market visibility
- Product-style frontend layout suitable for a portfolio

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express, CORS

## Folder Structure

```text
hiresight/
  backend/
    src/
  frontend/
    src/
```

## Local Run Guide

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend URL: `http://localhost:4001`

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Endpoints

- `GET /health`
- `GET /api/jobs`
- `GET /api/jobs?q=react`
- `GET /api/recommendations`
- `GET /api/analytics`

## Suggested GitHub Description

AI-powered full-stack job aggregation platform with React, Express, analytics, and recommendation scoring.
