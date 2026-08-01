# Installation

## Prerequisites

- Node.js >= 18
- npm hoặc yarn

## Cài đặt

```bash
git clone https://github.com/clauderiks/ZsK-bot.git
cd ZsK-bot
npm install
cp .env.example .env
```

## Chạy local

```bash
npm run api
npm run dev
```

Hoặc dùng `npx`:

```bash
npx vite
npx node src/server/index.js
```

## Chạy đồng thời

```bash
npx concurrently "npm run api" "npm run dev"
```
