# Prism API prototype

React/Vite API catalog and Node.js API. Includes local health and text-analysis endpoints and Zuko-powered chat, summarization and translation adapters. Provider availability and response format are not guaranteed.

## Local development

Requires Node.js 18 or later. Run `npm install`, then `npm run server` in one terminal and `npm run dev` in another. Run `npm test` and `npm run build` to check the project. The Vite development proxy forwards `/api` to port 3001; production requires a separate reverse proxy or rewrite.

## Provider configuration

Zuko documentation: https://api.zukoxmd.my.id/docs . Its documentation states basic usage may not require a key. If you have a key, optionally configure `ZUKO_API_KEY` as a secret environment variable on the Render backend service, never in source control or the frontend. Provider policies, rate limits and availability can change.

GET endpoints:
- `/api/v1/ai/chat?q=Hello`
- `/api/v1/ai/summarize?text=...` (at least 50 characters)
- `/api/v1/ai/translate?q=Hello&to=es` (optional `from`)

Query values must be URL encoded. Requests and text are sent to Zuko; do not send sensitive data. Because GET query strings may be stored in logs, browser history or monitoring systems, do not use these endpoints for confidential content. Provider response JSON passes through unchanged on success; the proxy returns generic errors on failure. A 20-second timeout and 1 MB response limit apply. Video generation is not implemented.

## Deployment and security

Commit the updated files and redeploy the Render backend and frontend. Keep the existing frontend `/api` routing pointed to your backend. Verify both services redeployed and test `/api/v1/health` and the AI endpoints. Set any optional secret only on the backend.

This is a prototype: no user authentication, API keys, rate limits, quotas, billing or admin tools. Public users can consume your provider quota or cause costs. Add authentication, rate limits and abuse controls before public use; review provider terms, privacy and costs. No payment system is implemented. Fonts load from Google Fonts when available.
