This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project structure

- `backend/` — Express + Prisma API (JWT auth, tasks CRUD)
- `frontend/` — Next.js App Router UI (Kanban)

## Requirements

- Node.js 18+ (LTS recommended)
- npm (або інший менеджер пакетів)
- PostgreSQL (для Prisma)

## Backend: local setup

1) Перейти в каталог backend і встановити залежності

```bash
cd backend
npm install
```

2) Створити файл `.env` з налаштуваннями (приклад):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
JWT_SECRET="your_strong_secret"
PORT=3000
```

3) Згенерувати Prisma client і застосувати міграції (якщо потрібно)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4) Запустити сервер у dev-режимі

```bash
npm run dev
# або продакшн-старт (на власний страх і ризик у локалі)
npm start
```

Сервер за замовчуванням слухає `http://localhost:3000` (керується змінною `PORT`).

## Frontend: local setup

1) Перейти в каталог frontend і встановити залежності

```bash
cd frontend
npm install
```

2) Створити файл `./frontend/.env.local` з API-адресою бекенду

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3) Запустити dev-сервер

```bash
npm run dev
```

Відкрити `http://localhost:3000` (або порт, який вкаже Next.js у консолі). Якщо SSR guard редіректить на `/login`, це очікувано без токена.

## Production build

- Frontend

```bash
cd frontend
npm run build
npm start
```

- Backend (у репозиторії використовується `ts-node` для запуску; у хості на кшталт Render достатньо `npm start`).

## Deploy

### Backend (Render)

1) Створити Web Service з каталогу `backend/`.
2) Install Command: `npm install`  (за потреби додати `npx prisma generate`).
3) Start Command: `npm start` (викликає `ts-node src/index.ts`).
4) Налаштувати Variables: `DATABASE_URL`, `JWT_SECRET`, `PORT`.

### Frontend (Vercel)

1) Імпортувати репозиторій, обрати Root Directory: `frontend/`.
2) Environment Variables: `NEXT_PUBLIC_API_URL` = URL вашого бекенду (наприклад, Render).
3) Build: за замовчуванням (`next build`). Output: `.next`.

Після деплою фронтенд використовує бекенд за вказаною змінною середовища.

## Корисні скрипти

- backend
  - `npm run dev` — локальний запуск з `nodemon` + `ts-node`
  - `npm start` — запуск `ts-node src/index.ts`
  - `npm run prisma:generate` — `prisma generate`
  - `npm run prisma:migrate` — `prisma migrate dev`

- frontend
  - `npm run dev` — Next.js dev server
  - `npm run build` — збірка
  - `npm start` — запуск зібраної версії

## Нотатки

- SSR guard у `frontend/middleware.ts` редіректить незалогінених користувачів з `/kanban` на `/login` за cookie `token`.
- На фронті токен також зберігається у `localStorage` для клієнтського стану; cookie використовується для SSR.
