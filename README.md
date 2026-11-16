# Prism API prototype

React/Vite API catalog and Node.js API, with local health and text-analysis endpoints and Zuko-powered adapters. Provider availability and responses are not guaranteed.

## Local development

Requires Node.js 18 or later. Run `npm install`, then `npm run server` and `npm run dev` in separate terminals. Run `npm test` and `npm run build` to check the project. The Vite proxy forwards `/api` to port 3001; production requires a reverse proxy or rewrite.

## Provider

Zuko documentation: https://api.zukoxmd.my.id/docs. If applicable, configure `ZUKO_API_KEY` only as a backend secret. Provider policies and limits may change.

- GET `/api/v1/ai/chat?q=Hello`
- GET `/api/v1/ai/summarize?text=...` (at least 50 characters)
- GET `/api/v1/ai/translate?q=Hello&to=es` (optional `from`)
- GET `/api/v1/ai/gpt?q=Hello`
- GET `/api/v1/tools/define?word=hello`
- GET `/api/v1/tools/urbandict?word=hello`
- GET `/api/v1/tools/base64?text=hello&mode=encode` (mode optional: encode or decode)
- GET `/api/v1/tools/hash?text=hello`
- GET `/api/v1/tools/uuid`
- GET `/api/v1/web/wiki?q=Earth`
- GET `/api/v1/web/qrcode?text=hello`
- GET `/api/v1/anime/search?q=Naruto`
- GET `/api/v1/yt/search?q=music`

URL-encode query values. Text is sent to Zuko and GET queries can be logged; do not submit sensitive data. Responses depend on the provider. The adapter applies a 20-second timeout and 1 MB response limit. The explorer and OpenAPI specification may not yet include all adapters.

## Deployment and security

Deploy both frontend and backend; route frontend `/api` requests to the backend. This prototype has no authentication, API keys, rate limits, quotas or billing. Public users can consume provider quota or incur costs; add abuse controls before public use. Video generation is not implemented.
