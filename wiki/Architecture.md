# Architecture

ZsK AI Bot gồm các thành phần chính:

- `src/` - frontend React và backend logic.
- `src/server/` - Express API server.
- `src/routes/chat.js` - router xử lý chat request.
- `src/providers/` - provider adapter cho các AI hosts.
- `src/ohmaba/` - logic free agent local demo.
- `api/chat.js` - endpoint serverless cho Vercel.
- `vercel.json` - cấu hình route và build deploy.

## Flow chat

1. Người dùng gửi yêu cầu chat.
2. Frontend gọi `/api/chat`.
3. Backend chọn provider theo `model`.
4. Provider trả về phản hồi AI.
5. Phản hồi gửi lại frontend.
