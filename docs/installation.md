# Installation

## Prerequisites

- Node.js >= 18
- npm or yarn

## Setup

```bash
git clone https://github.com/clauderiks/ZsK-bot.git
cd ZsK-bot
npm install
cp .env.example .env
```

## Run

```bash
npm run api
npm run dev
```

Or using npx:

```bash
npx vite
npx node src/server/index.js
```

For concurrent development:

```bash
npx concurrently "npm run api" "npm run dev"
```
