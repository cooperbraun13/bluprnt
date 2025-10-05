# BluPrnt

Developed by: Ayden Humphries, Cooper Braun, Cooper McKenny, Chris Wong, and Sam Vanturennout

_Date last modified: 10/05/25_

## How to Run (Docker Setup — Recommended)

BluPrnt is fully containerized using **Docker Compose** for consistent local development.  
You don’t need to install Node, React, or PostgreSQL manually.

### Start all services

```bash
docker compose up -d
```

This starts:

- PostgreSQL database (with persistent volume)
- Backend (Node/Express + TypeScript + hot reload)
- Frontend (React + Vite + live reload)

### Access the app

Frontend &rarr; http://localhost:5173
Backend &rarr; http://localhost:3000
Database &rarr; localhost:5432

### Stop everything

```bash
docker compose down
```

## How to Run Without Docker (Manual Dev)

**Backend**

```bash
cd backend
npm install
npm run dev
```

Server runs at http://localhost:3000

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173

## Dependencies

**Backend**

- Node.js 20+
- Express 4
- TypeScript
- ts-node-dev / nodemon
- PostgreSQL 16+

**Frontend**

- React 18
- Vite 5
- TypeScript
- React Router
