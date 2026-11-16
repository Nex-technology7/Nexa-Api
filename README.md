# Prism API prototype

A responsive React API catalog and interactive explorer with an original CSS-rendered 3D-style hero. Includes a Node.js API with health and text-analysis endpoints and an OpenAPI specification. Planned AI and media entries do not call providers.

## Run locally

Requires Node.js 18 or later and npm. In one terminal run `npm install` then `npm run server`. In another run `npm run dev` and open the Vite URL shown in the terminal. Vite proxies `/api` to port 3001. Run `npm test` for backend tests and `npm run build` to build the frontend.

The Vite proxy is for development only. Production hosting requires a reverse proxy routing `/api` to the Node server and the remaining routes to the built frontend. `npm run preview` does not configure this proxy.

## Important limitations

This is a prototype, not a production platform. Registration, authentication, API keys, rate limiting, quotas, user and admin dashboards, billing, provider integrations, job queues and video generation are not implemented. The two working endpoints are public and should not be exposed to the internet without security, abuse controls and operational review. No third-party provider or paid plan is configured. The hero uses CSS rather than WebGL. Fonts load from Google Fonts when available; system fonts are used otherwise.
