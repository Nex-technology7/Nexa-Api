# Prism API prototype

React/Vite API catalog and Node.js API, with local health and text-analysis endpoints and Zuko-powered chat, summarization and translation adapters. Provider availability and responses are not guaranteed.

## Local development

Requires Node.js 18 or later. Run `npm install`, then `npm run server` and `npm run dev` in separate terminals. Run `npm test` and `npm run build` to check the project. The Vite proxy forwards `/api` to port 3001; production requires a reverse proxy or rewrite.

## Provider

Zuko documentation: https://api.zukoxmd.my.id/docs. If applicable, configure `ZUKO_API_KEY` only as a backend secret. Provider policies and limits may change.

- GET `/api/v1/ai/chat?q=Hello`
- GET `/api/v1/ai/summarize?text=...` (at least 50 characters)
- GET `/api/v1/ai/translate?q=Hello&to=es` (optional `from`)

URL-encode query values. Text is sent to Zuko and GET queries can be logged; do not submit sensitive data. Responses depend on the provider. The adapter applies a 20-second timeout and 1 MB response limit.

## Deployment and security

Deploy both frontend and backend; route frontend `/api` requests to the backend. This prototype has no authentication, API keys, rate limits, quotas or billing. Public users can consume provider quota or incur costs; add abuse controls before public use. Video generation is not implemented.
