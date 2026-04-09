# Sanjaykumar S — Portfolio

## Structure
```
/
├── frontend/   → Next.js React app
└── backend/    → Express.js API
```

## Running Locally

### 1. Start the backend (Terminal 1)
```bash
cd backend
node server.js
# Runs at http://localhost:4000
```

### 2. Start the frontend (Terminal 2)
```bash
cd frontend
npm run dev
# Runs at http://localhost:3000
```

Open http://localhost:3000 in your browser.

## Deploying to Vercel (Free)

### Backend — deploy to Render (free)
1. Push this repo to GitHub
2. Go to https://render.com → New Web Service
3. Point to the `backend/` folder
4. Set start command: `node server.js`
5. Copy the deployed URL (e.g. `https://your-backend.onrender.com`)

### Frontend — deploy to Vercel (free)
1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_BACKEND_URL` = your Render backend URL
5. Deploy
