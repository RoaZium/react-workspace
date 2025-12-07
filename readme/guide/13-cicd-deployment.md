# CI/CD & 배포

> GitHub Actions를 활용한 자동화된 빌드, 테스트, 배포 파이프라인

## 목차

1. [CI/CD 개요](#1-cicd-개요)
2. [GitHub Actions 설정](#2-github-actions-설정)
3. [환경별 배포](#3-환경별-배포)
4. [Docker 배포](#4-docker-배포)
5. [모니터링](#5-모니터링)

---

## 1. CI/CD 개요

### 1.1 CI/CD 흐름

```
코드 푸시
  ↓
린트 & 타입 체크
  ↓
테스트 실행
  ↓
빌드
  ↓
배포 (Dev/Staging/Prod)
  ↓
모니터링
```

---

## 2. GitHub Actions 설정

### 2.1 CI 워크플로우

**파일**: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run linter
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Run tests
        run: pnpm test

      - name: Build
        run: pnpm build
```

---

### 2.2 CD 워크플로우

**파일**: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 3. 환경별 배포

### 3.1 환경 변수

**Development**:
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api
VITE_LOG_LEVEL=debug
```

**Staging**:
```bash
# .env.staging
VITE_API_BASE_URL=https://staging-api.example.com/api
VITE_LOG_LEVEL=info
```

**Production**:
```bash
# .env.production
VITE_API_BASE_URL=https://api.example.com/api
VITE_LOG_LEVEL=error
```

---

### 3.2 빌드 스크립트

**package.json**:
```json
{
  "scripts": {
    "build:dev": "vite build --mode development",
    "build:staging": "vite build --mode staging",
    "build:prod": "vite build --mode production"
  }
}
```

---

## 4. Docker 배포

### 4.1 Dockerfile

**파일**: `Dockerfile`

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# 의존성 설치
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/data-platform/package.json ./apps/data-platform/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# 빌드
COPY apps/data-platform ./apps/data-platform
RUN pnpm --filter data-platform build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/apps/data-platform/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

### 4.2 nginx.conf

**파일**: `nginx.conf`

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # React Router를 위한 설정
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 정적 파일 캐싱
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 압축
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

---

### 4.3 Docker Compose

**파일**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:80'
    environment:
      - VITE_API_BASE_URL=${API_BASE_URL}
    restart: unless-stopped
```

---

### 4.4 Docker 명령어

```bash
# 빌드
docker build -t data-platform:latest .

# 실행
docker run -p 3000:80 data-platform:latest

# Docker Compose
docker-compose up -d
```

---

## 5. 모니터링

### 5.1 Error Tracking (Sentry)

**설치**:
```bash
pnpm add @sentry/react
```

**설정**:
```typescript
// src/app/App.tsx
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

---

### 5.2 Analytics (Google Analytics)

**설치**:
```bash
pnpm add react-ga4
```

**설정**:
```typescript
// src/app/App.tsx
import ReactGA from 'react-ga4'

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)

// 페이지 뷰 추적
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: () => {
      ReactGA.send({ hitType: 'pageview', page: '/' })
      return null
    },
  },
])
```

---

### 5.3 성능 모니터링

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

const sendToAnalytics = ({ name, value, id }: Metric) => {
  // Google Analytics로 전송
  ReactGA.event({
    category: 'Web Vitals',
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

---

## 6. 배포 체크리스트

### 6.1 배포 전

- [ ] 린트 & 타입 체크 통과
- [ ] 모든 테스트 통과
- [ ] 빌드 성공 확인
- [ ] 환경 변수 설정 확인
- [ ] Lighthouse 점수 확인
- [ ] 보안 취약점 스캔

---

### 6.2 배포 후

- [ ] 배포 성공 확인
- [ ] 주요 기능 동작 확인 (Smoke Test)
- [ ] 에러 로그 모니터링
- [ ] 성능 지표 확인
- [ ] 롤백 계획 준비

---

- [GitHub Actions](https://docs.github.com/en/actions)
- [Vercel Deployment](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Sentry](https://docs.sentry.io/)

---

