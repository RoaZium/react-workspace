# 공통 패키지 개발

> 재사용 가능한 패키지 생성, 관리, 배포

## 목차

1. [패키지 생성](#1-패키지-생성)
2. [UI 패키지](#2-ui-패키지)
3. [API 패키지](#3-api-패키지)
4. [Utils 패키지](#4-utils-패키지)
5. [패키지 배포](#5-패키지-배포)

---

## 1. 패키지 생성

### 1.1 새 패키지 생성

```bash
# packages 폴더에 새 패키지 생성
mkdir -p packages/my-package
cd packages/my-package

# package.json 생성
pnpm init
```

---

### 1.2 package.json 설정

**파일**: `packages/my-package/package.json`

```json
{
  "name": "@workspace/my-package",
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
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

---

### 1.3 TypeScript 설정

**파일**: `packages/my-package/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 2. UI 패키지

### 2.1 구조

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── TextField/
│   ├── theme/
│   │   ├── theme.ts
│   │   └── tokens.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

### 2.2 컴포넌트 작성

**파일**: `packages/ui/src/components/Button/Button.tsx`

```typescript
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean
}

export const Button = ({ loading, children, disabled, ...props }: ButtonProps) => {
  return (
    <MuiButton disabled={disabled || loading} {...props}>
      {loading ? 'Loading...' : children}
    </MuiButton>
  )
}
```

---

### 2.3 Public API (index.ts)

**파일**: `packages/ui/src/index.ts`

```typescript
// Components
export { Button } from './components/Button'
export type { ButtonProps } from './components/Button'

export { TextField } from './components/TextField'
export type { TextFieldProps } from './components/TextField'

// Theme
export { theme } from './theme/theme'
export { tokens } from './theme/tokens'
```

---

## 3. API 패키지

### 3.1 구조

```
packages/shared-api/
├── src/
│   ├── client.ts
│   ├── types.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

### 3.2 API 클라이언트

**파일**: `packages/shared-api/src/client.ts`

```typescript
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)
```

---

### 3.3 Public API

**파일**: `packages/shared-api/src/index.ts`

```typescript
export { apiClient } from './client'
export type { ApiError, ApiResponse } from './types'
```

---

## 4. Utils 패키지

### 4.1 구조

```
packages/shared-utils/
├── src/
│   ├── date/
│   │   ├── formatDate.ts
│   │   ├── formatDate.test.ts
│   │   └── index.ts
│   ├── string/
│   │   ├── capitalize.ts
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

---

### 4.2 유틸리티 함수

**파일**: `packages/shared-utils/src/date/formatDate.ts`

```typescript
export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}
```

**파일**: `packages/shared-utils/src/date/formatDate.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-12-07')
    expect(formatDate(date)).toBe('2024-12-07')
  })
})
```

---

### 4.3 Public API

**파일**: `packages/shared-utils/src/index.ts`

```typescript
// Date utils
export { formatDate } from './date/formatDate'

// String utils
export { capitalize } from './string/capitalize'
```

---

## 5. 패키지 배포

### 5.1 NPM 배포 (선택)

Monorepo 내부용이 아닌 공개 패키지로 배포할 경우:

```bash
# 로그인
npm login

# 배포
cd packages/ui
npm publish --access public
```

---

### 5.2 Changesets (버전 관리)

**설치**:
```bash
pnpm add -D -w @changesets/cli
pnpm changeset init
```

**사용**:
```bash
# 1. 변경사항 기록
pnpm changeset

# 2. 버전 업데이트
pnpm changeset version

# 3. 배포
pnpm changeset publish
```

---

### 5.3 버전 관리 전략

**시맨틱 버저닝**:
- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: 새 기능 추가 (하위 호환)
- **Patch (0.0.1)**: 버그 수정

**예시**:
```bash
# 버그 수정
1.0.0 → 1.0.1

# 새 기능
1.0.1 → 1.1.0

# Breaking change
1.1.0 → 2.0.0
```

---

## 6. 사용 예시

### 6.1 앱에서 패키지 사용

**설치**:
```bash
cd apps/data-platform
pnpm add @workspace/ui@workspace:*
pnpm add @workspace/shared-api@workspace:*
```

**사용**:
```typescript
// apps/data-platform/src/App.tsx
import { Button } from '@workspace/ui'
import { apiClient } from '@workspace/shared-api'

export const App = () => {
  const handleClick = async () => {
    const response = await apiClient.get('/users')
    console.log(response.data)
  }

  return <Button onClick={handleClick}>Fetch Users</Button>
}
```

---

## 7. 체크리스트

### 7.1 패키지 생성 시

- [ ] package.json 올바른 설정 (name, main, types, exports)
- [ ] tsconfig.json 설정
- [ ] Public API (index.ts) 정의
- [ ] README.md 작성
- [ ] 테스트 작성

---

### 7.2 패키지 업데이트 시

- [ ] 버전 업데이트 (Changesets)
- [ ] CHANGELOG.md 작성
- [ ] 테스트 통과 확인
- [ ] 빌드 성공 확인
- [ ] 문서 업데이트

---

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Changesets](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)

---

