# 프로젝트 초기 설정

> 환경 변수, IDE 설정, Git 설정 등 개발 시작 전 필수 구성

## 목차

1. [환경 변수 설정](#1-환경-변수-설정)
2. [IDE 설정 (VSCode 권장)](#2-ide-설정-vscode-권장)
3. [Git 설정](#3-git-설정)
4. [개발 도구 설정](#4-개발-도구-설정)
5. [첫 실행 확인](#5-첫-실행-확인)

---

## 1. 환경 변수 설정

### 1.1 .env 파일 생성

각 애플리케이션에 `.env` 파일을 생성합니다.

```bash
# data-platform 앱 환경 변수
cd apps/data-platform
cp .env.example .env
```

---

### 1.2 환경 변수 설정

`.env` 파일을 열어 다음 값을 설정합니다:

```bash
# 앱 정보
VITE_APP_NAME=Data Platform
VITE_APP_VERSION=1.0.0

# API 설정
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000

# 웹소켓 (선택)
VITE_WS_URL=ws://localhost:8082

# 기능 플래그
VITE_FEATURE_DARK_MODE=true
VITE_FEATURE_NOTIFICATIONS=true

# 개발 모드 설정
VITE_LOG_LEVEL=debug
VITE_ENABLE_DEV_TOOLS=true
```

---

### 1.3 프로덕션 환경 변수

프로덕션 배포 시 `.env.production` 파일을 별도로 생성합니다:

```bash
# .env.production
VITE_APP_NAME=Data Platform
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.yourcompany.com/api
VITE_API_TIMEOUT=15000
VITE_LOG_LEVEL=error
VITE_ENABLE_DEV_TOOLS=false
```

---

### 1.4 환경 변수 사용

```typescript
// src/shared/config/env.ts
export const ENV = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  features: {
    darkMode: import.meta.env.VITE_FEATURE_DARK_MODE === 'true',
  },
}

// 사용 예시
import { ENV } from '@/shared/config/env'

axios.create({
  baseURL: ENV.api.baseUrl,
  timeout: ENV.api.timeout,
})
```

---

## 2. IDE 설정 (VSCode 권장)

### 2.1 필수 확장 설치

다음 VSCode 확장을 설치하세요:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",          // ESLint
    "esbenp.prettier-vscode",          // Prettier
    "bradlc.vscode-tailwindcss",       // Tailwind CSS IntelliSense (선택)
    "usernamehw.errorlens",            // Error Lens
    "christian-kohler.path-intellisense", // Path Intellisense
    "zignd.html-css-class-completion"  // CSS Class 자동완성
  ]
}
```

**설치 방법**:
1. VSCode 열기
2. `Ctrl+Shift+X` (확장 패널)
3. 위 ID로 검색하여 설치

---

### 2.2 VSCode 설정

프로젝트 루트에 `.vscode/settings.json` 파일을 생성하세요:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.associations": {
    "*.css": "css"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

### 2.3 디버깅 설정

`.vscode/launch.json` 파일을 생성하여 디버깅을 설정하세요:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/apps/data-platform",
      "sourceMaps": true
    }
  ]
}
```

**사용 방법**:
1. `F5` 또는 디버그 패널에서 "Launch Chrome" 선택
2. 브레이크포인트 설정 후 디버깅

---

## 3. Git 설정

### 3.1 Git 사용자 정보 설정

```bash
# 전역 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# 프로젝트별 설정 (선택)
git config user.name "Your Name"
git config user.email "your.email@company.com"
```

---

### 3.2 Git Hooks 설정

프로젝트에는 Husky가 설정되어 있어 커밋 전 자동으로 린트와 테스트가 실행됩니다.

```bash
# Husky 설치 (pnpm install 시 자동 실행됨)
pnpm prepare
```

**자동 실행 항목**:
- `pre-commit`: ESLint, Prettier 자동 수정
- `commit-msg`: 커밋 메시지 규칙 검증

---

### 3.3 커밋 메시지 규칙

**형식**:
```
<type>: <subject>

<body>

<footer>
```

**예시**:
```bash
feat: 사용자 목록 페이지 추가

- UserList 컴포넌트 구현
- API 연동
- 페이지네이션 추가

Closes #123
```

**Type 종류**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정, 패키지 업데이트 등

---

### 3.4 브랜치 전략

```bash
main            # 프로덕션 코드
  └─ develop    # 개발 브랜치
      ├─ feature/user-list    # 기능 개발
      ├─ feature/dashboard    # 기능 개발
      └─ fix/login-bug        # 버그 수정
```

**브랜치 생성 예시**:
```bash
# feature 브랜치 생성
git checkout -b feature/user-list

# 작업 후 커밋
git add .
git commit -m "feat: 사용자 목록 페이지 추가"

# 푸시
git push origin feature/user-list

# PR 생성 (GitHub/GitLab 웹 인터페이스에서)
```

---

## 4. 개발 도구 설정

### 4.1 ESLint 설정 확인

프로젝트 루트의 `.eslintrc.js` 파일이 올바르게 설정되어 있는지 확인하세요:

```bash
# ESLint 실행
pnpm lint

# 자동 수정
pnpm lint:fix
```

---

### 4.2 Prettier 설정 확인

`.prettierrc` 파일 확인:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

### 4.3 TypeScript 설정 확인

`tsconfig.json` 파일 확인:

```bash
# 타입 체크
pnpm type-check
```

---

## 5. 첫 실행 확인

### 5.1 개발 서버 실행

```bash
# 모든 앱 실행
pnpm dev
```

---

### 5.2 브라우저 확인

1. 브라우저에서 `http://localhost:5173` 열기
2. 페이지가 정상적으로 로드되는지 확인
3. 브라우저 콘솔에서 에러 확인 (F12 → Console 탭)

---

### 5.3 HMR (Hot Module Replacement) 테스트

1. `apps/data-platform/src/App.tsx` 파일 열기
2. 텍스트 수정
3. 저장 (Ctrl+S)
4. 브라우저가 자동으로 리로드되는지 확인 ✅

---

### 5.4 빌드 테스트

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 확인
ls -lh apps/data-platform/dist

# 빌드된 앱 미리보기
cd apps/data-platform
pnpm preview
```

---

## 6. 자주 사용하는 명령어

```bash
# 개발 서버 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter data-platform dev

# 빌드
pnpm build

# 테스트
pnpm test

# 린트
pnpm lint

# 타입 체크
pnpm type-check

# 의존성 업데이트
pnpm update

# 캐시 정리
pnpm store prune
```

---

## 7. 다음 단계

초기 설정이 완료되었습니다! 이제 다음 문서로 진행하세요:

1. **[03-fsd-architecture.md](03-fsd-architecture.md)**: FSD 아키텍처 이해
2. **[04-folder-structure.md](04-folder-structure.md)**: 폴더 구조 상세
3. **[05-code-conventions.md](05-code-conventions.md)**: 코드 작성 규칙

---

