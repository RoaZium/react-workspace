# 고급 패턴

> i18n, 에러 바운더리, 로깅 등 고급 개발 패턴

## 목차

1. [국제화 (i18n)](#1-국제화-i18n)
2. [에러 바운더리](#2-에러-바운더리)
3. [로깅](#3-로깅)
4. [Feature Flags](#4-feature-flags)
5. [접근성 (a11y)](#5-접근성-a11y)

---

## 1. 국제화 (i18n)

### 1.1 react-i18next 설정

**설치**:
```bash
pnpm add i18next react-i18next
```

**설정**: `src/shared/i18n/config.ts`

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ko from './locales/ko.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
  },
  lng: 'ko', // 기본 언어
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
```

---

### 1.2 번역 파일

**파일**: `src/shared/i18n/locales/ko.json`

```json
{
  "common": {
    "save": "저장",
    "cancel": "취소",
    "delete": "삭제"
  },
  "user": {
    "list": {
      "title": "사용자 목록",
      "add": "사용자 추가"
    },
    "form": {
      "name": "이름",
      "email": "이메일"
    }
  }
}
```

**파일**: `src/shared/i18n/locales/en.json`

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "user": {
    "list": {
      "title": "User List",
      "add": "Add User"
    },
    "form": {
      "name": "Name",
      "email": "Email"
    }
  }
}
```

---

### 1.3 사용

```typescript
import { useTranslation } from 'react-i18next'

export const UserListPage = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Box>
      <Typography variant="h4">{t('user.list.title')}</Typography>
      <Button>{t('user.list.add')}</Button>

      <Button onClick={() => changeLanguage('en')}>English</Button>
      <Button onClick={() => changeLanguage('ko')}>한국어</Button>
    </Box>
  )
}
```

---

## 2. 에러 바운더리

### 2.1 ErrorBoundary 컴포넌트

**위치**: `src/app/providers/ErrorBoundary.tsx`

```typescript
import { Component, ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Sentry 등으로 에러 전송
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {this.state.error?.message}
          </Typography>
          <Button variant="contained" onClick={this.handleReset} sx={{ mt: 2 }}>
            Try again
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
```

---

### 2.2 사용

```typescript
// src/app/App.tsx
import { ErrorBoundary } from './providers/ErrorBoundary'

export const App = () => (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
)
```

---

## 3. 로깅

### 3.1 Logger 유틸리티

**위치**: `src/shared/utils/logger.ts`

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

class Logger {
  private level: LogLevel

  constructor(level: LogLevel = 'info') {
    this.level = level
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error']
    return levels.indexOf(level) >= levels.indexOf(this.level)
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, ...args)
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, ...args)
    }
  }

  error(message: string, ...args: any[]) {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, ...args)
    }
  }
}

const logLevel = (import.meta.env.VITE_LOG_LEVEL || 'info') as LogLevel
export const logger = new Logger(logLevel)
```

---

### 3.2 사용

```typescript
import { logger } from '@/shared/utils/logger'

export const fetchUsers = async () => {
  logger.info('Fetching users...')

  try {
    const response = await api.get('/users')
    logger.debug('Users fetched:', response.data)
    return response.data
  } catch (error) {
    logger.error('Failed to fetch users:', error)
    throw error
  }
}
```

---

## 4. Feature Flags

### 4.1 Feature Flag Store

**위치**: `src/shared/store/featureFlagStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FeatureFlags {
  darkMode: boolean
  notifications: boolean
  betaFeatures: boolean
}

interface FeatureFlagState extends FeatureFlags {
  setFlag: (flag: keyof FeatureFlags, value: boolean) => void
}

export const useFeatureFlagStore = create<FeatureFlagState>()(
  persist(
    (set) => ({
      darkMode: import.meta.env.VITE_FEATURE_DARK_MODE === 'true',
      notifications: import.meta.env.VITE_FEATURE_NOTIFICATIONS === 'true',
      betaFeatures: false,

      setFlag: (flag, value) => set({ [flag]: value }),
    }),
    { name: 'feature-flags' }
  )
)
```

---

### 4.2 사용

```typescript
import { useFeatureFlagStore } from '@/shared/store/featureFlagStore'

export const App = () => {
  const darkMode = useFeatureFlagStore((state) => state.darkMode)
  const betaFeatures = useFeatureFlagStore((state) => state.betaFeatures)

  return (
    <div>
      {darkMode && <DarkModeTheme />}
      {betaFeatures && <BetaFeaturePanel />}
    </div>
  )
}
```

---

## 5. 접근성 (a11y)

### 5.1 Semantic HTML

```typescript
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

---

### 5.2 ARIA 속성

```typescript
export const Modal = ({ isOpen, onClose, children }: Props) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <DialogTitle id="modal-title">Modal Title</DialogTitle>
    <DialogContent id="modal-description">{children}</DialogContent>
  </Dialog>
)
```

---

### 5.3 키보드 접근성

```typescript
export const CustomButton = ({ onClick }: Props) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick()
      }
    }}
  >
    Click me
  </div>
)
```

---

### 5.4 Alt 텍스트

```typescript
// ❌ Bad
<img src="/logo.png" />

// ✅ Good
<img src="/logo.png" alt="Company Logo" />
```

---

### 5.5 Focus 관리

```typescript
import { useEffect, useRef } from 'react'

export const Modal = ({ isOpen }: { isOpen: boolean }) => {
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen}>
      <TextField inputRef={firstInputRef} label="Name" />
    </Dialog>
  )
}
```

---

## 6. 환경별 설정

### 6.1 환경 변수 활용

```typescript
// src/shared/config/env.ts
export const ENV = {
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
}
```

---

### 6.2 조건부 렌더링

```typescript
import { ENV } from '@/shared/config/env'

export const App = () => (
  <div>
    <RouterProvider router={router} />
    {ENV.enableDevTools && <DevTools />}
  </div>
)
```

---

## 7. 보안 패턴

### 7.1 XSS 방지

```typescript
// ❌ Bad - XSS 취약점
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Good - 텍스트로 렌더링
<div>{userInput}</div>

// ✅ Good - 신뢰할 수 있는 HTML만 사용
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trustedHtml) }} />
```

---

### 7.2 민감 정보 보호

```typescript
// ❌ Bad
console.log('User password:', password)

// ✅ Good
console.log('User logged in:', { userId: user.id })

// ❌ Bad
localStorage.setItem('password', password)

// ✅ Good - 토큰만 저장
localStorage.setItem('accessToken', token)
```

---

- [react-i18next](https://react.i18next.com/)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Web Accessibility](https://www.w3.org/WAI/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

