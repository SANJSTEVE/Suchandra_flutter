# Tech Stack

## Core
- **Language**: JavaScript (ES6+)
- **Framework**: React.js
- **Server/Bundler**: Next.js (preferred) or Express.js + Vite for a pure SPA
- **Styling**: Plain CSS / CSS Modules

## Testing
- **Test Runner**: Vitest
- **Property-Based Testing**: fast-check

## Browser APIs (no libraries needed)
- `IntersectionObserver` — scroll-triggered animations
- `localStorage` — theme persistence
- `prefers-color-scheme` — system theme detection

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server (Next.js)
npm start

# Run tests (single pass)
npx vitest --run

# Run tests in watch mode
npx vitest
```

## Deployment
- **Next.js**: Deploy to Vercel, Netlify, or any Node-capable host
- **Express + React SPA**: Build static output and serve via Express or deploy `dist/` to Netlify/GitHub Pages
