# Project Structure

This repository has one frontend app and one backend API.

## Frontend

Frontend code lives in `frontend/`:

```text
frontend/
  public/               Static assets
  src/
    app/                Next.js routes
    components/
      admin/            Admin shell, views, admin-only UI
      dashboard/        User dashboard widgets and financial panels
      forms/            Embedded forms and form-specific UI
      layout/           Shared site header/footer/navigation
      payment/          Stripe and plan selection UI
      system/           App-wide listeners and runtime helpers
      ui/               Reusable design-system components
      legacy/           Old or currently unused components
    contexts/           React context providers
    firebase/           Firebase client/provider setup
    hooks/              Shared React hooks
    lib/                Shared utilities and API helpers
  package.json          Frontend dependencies and scripts
  next.config.mjs       Next.js config used for Vercel builds
```

## Backend

Backend API code lives under `backend/`:

```text
backend/
  src/
    app.js              Express app setup (middleware, routes, handlers)
    server.js           Server bootstrap (env, DB connect, listen)
    config/             Database and runtime configuration
    controllers/        Route handlers
    middleware/         Auth and request middleware
    models/             Mongoose models
    routes/             Express route definitions
    utils/              Backend helper utilities
```

## Other folders

```text
docs/                   Project documentation
functions/              Firebase/Cloud Functions code
workspace/              Scratch/generated workspace content
```

## Recommended mental model

- Work on website or dashboard UI in `frontend/src/app` and `frontend/src/components`.
- Work on admin UI in `frontend/src/components/admin`.
- Work on API and database logic in `backend/src`.
- Treat `functions/` as separate support code, not the main backend.
