# Monorepo 구조

> pnpm workspace와 Turborepo를 활용한 효율적인 Monorepo 관리

## 목차

1. [Monorepo 개요](#1-monorepo-개요)
2. [pnpm Workspace](#2-pnpm-workspace)
3. [Turborepo](#3-turborepo)
4. [의존성 관리](#4-의존성-관리)
5. [빌드 전략](#5-빌드-전략)

---

## 1. Monorepo 개요

### 1.1 Monorepo란?

여러 프로젝트를 하나의 저장소에서 관리하는 방식

```
react-workspace/
├── apps/                    # 애플리케이션
│   ├── data-platform/
│   └── admin-portal/
└── packages/                # 공통 패키지
    ├── ui/
    ├── shared-api/
    └── shared-types/
```

---

### 1.2 Monorepo vs Polyrepo

| 구분 | Monorepo | Polyrepo |
|------|----------|----------|
| 저장소 | 단일 | 다중 |
| 코드 공유 | 쉬움 | 어려움 (npm publish 필요) |
| 일관성 | 높음 | 낮음 |
| 빌드 도구 | Turborepo, Nx | 개별 설정 |
| 사용 사례 | Google, Meta, Microsoft | 작은 팀 |

---

## 2. pnpm Workspace

### 2.1 Workspace 설정

**파일**: `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

### 2.2 루트 package.json

**파일**: `package.json`

```json
{
  "name": "react-workspace",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.0"
  }
}
```

---

### 2.3 앱 package.json

**파일**: `apps/data-platform/package.json`

```json
{
  "name": "data-platform",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "@workspace/ui": "workspace:*",
    "@workspace/shared-api": "workspace:*"
  }
}
```

**`workspace:*`**: workspace 내 패키지를 참조

---

### 2.4 패키지 package.json

**파일**: `packages/ui/package.json`

```json
{
  "name": "@workspace/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc && vite build"
  },
  "peerDependencies": {
    "react": "^18.2.0"
  }
}
```

---

## 3. Turborepo

### 3.1 Turbo 설정

**파일**: `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

---

### 3.2 빌드 순서

```
packages/shared-types (빌드)
  ↓
packages/shared-api (빌드)
  ↓
packages/ui (빌드)
  ↓
apps/data-platform (빌드)
```

Turborepo가 자동으로 의존성 순서를 파악하여 빌드

---

### 3.3 캐싱

```bash
# 첫 빌드
pnpm build
# 소요 시간: 60초

# 두 번째 빌드 (변경 없음)
pnpm build
# 소요 시간: 1초 (캐시 사용)
```

**캐시 위치**: `node_modules/.cache/turbo`

---

### 3.4 병렬 실행

```bash
# 모든 앱/패키지의 dev를 병렬 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter data-platform dev

# 여러 앱 실행
pnpm --filter "{data-platform,admin-portal}" dev
```

---

## 4. 의존성 관리

### 4.1 의존성 설치 위치

| 의존성 종류 | 설치 위치 | 명령어 |
|-------------|-----------|--------|
| 모든 프로젝트 공통 | 루트 | `pnpm add -w <package>` |
| 특정 앱 | 앱 폴더 | `pnpm --filter data-platform add <package>` |
| 특정 패키지 | 패키지 폴더 | `pnpm --filter @workspace/ui add <package>` |

---

### 4.2 예시

```bash
# 루트에 TypeScript 설치 (모든 프로젝트에서 사용)
pnpm add -w -D typescript

# data-platform 앱에 React Router 설치
pnpm --filter data-platform add react-router-dom

# ui 패키지에 MUI 설치
pnpm --filter @workspace/ui add @mui/material
```

---

### 4.3 Workspace 패키지 사용

```bash
# data-platform에서 ui 패키지 사용
cd apps/data-platform
pnpm add @workspace/ui@workspace:*
```

```typescript
// apps/data-platform/src/App.tsx
import { Button } from '@workspace/ui'

export const App = () => <Button>Click me</Button>
```

---

## 5. 빌드 전략

### 5.1 개발 모드

```bash
# 모든 앱을 watch 모드로 실행
pnpm dev
```

**Turborepo의 동작**:
1. 패키지가 변경되면 자동 재빌드
2. 앱이 자동으로 핫 리로드

---

### 5.2 프로덕션 빌드

```bash
# 전체 빌드
pnpm build

# 특정 앱만 빌드 (의존성 포함)
pnpm --filter data-platform... build
```

`...` 문법: 해당 앱과 의존하는 모든 패키지를 빌드

---

### 5.3 변경된 항목만 빌드

```bash
# Git 변경 사항 기준으로 빌드
turbo run build --filter=[HEAD^1]
```

CI/CD에서 유용:
```yaml
# .github/workflows/ci.yml
- name: Build changed packages
  run: pnpm turbo run build --filter=[origin/main...HEAD]
```

---

## 6. 실무 팁

### 6.1 패키지 버전 관리

```bash
# 모든 패키지 버전 일괄 업데이트
pnpm -r update

# 특정 패키지만 업데이트
pnpm --filter data-platform update react
```

---

### 6.2 Clean 명령어

**package.json**:
```json
{
  "scripts": {
    "clean": "turbo run clean && rm -rf node_modules",
    "clean:cache": "rm -rf node_modules/.cache/turbo"
  }
}
```

각 앱/패키지에 `clean` 스크립트 추가:
```json
{
  "scripts": {
    "clean": "rm -rf dist .turbo node_modules"
  }
}
```

---

### 6.3 린트/테스트 자동화

```bash
# 변경된 파일만 린트
pnpm turbo run lint --filter=[HEAD^1]

# 영향받는 패키지만 테스트
pnpm turbo run test --filter=...@workspace/ui
```

---

## 7. 구조 예시

### 7.1 완전한 Monorepo 구조

```
react-workspace/
├── apps/
│   ├── data-platform/
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── admin-portal/
│       ├── src/
│       └── package.json
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared-api/
│   └── shared-types/
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

---

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Turborepo](https://turbo.build/repo/docs)
- [Monorepo Tools](https://monorepo.tools/)

---

