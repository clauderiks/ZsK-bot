# Architecture

ZsK AI Bot is composed of:

- `src/` - React frontend and shared backend logic
- `src/server/` - Express API server
- `src/routes/chat.js` - chat endpoint router
- `src/providers/` - provider adapters for AI hosts
- `src/ohmaba/` - local free agent demo logic
- `api/chat.js` - Vercel serverless endpoint
- `vercel.json` - deployment route config

## Provider Flow

1. User sends a chat request.
2. Frontend calls `/api/chat`.
3. Backend selects provider by `model`.
4. Provider adapter retrieves AI response.
5. Response returns to frontend.
