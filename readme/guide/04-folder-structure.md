# 폴더 구조

> FSD 아키텍처 기반 실제 프로젝트 폴더 구조 및 파일 배치 가이드

## 목차

1. [전체 구조 개요](#1-전체-구조-개요)
2. [app/ - 애플리케이션 레이어](#2-app---애플리케이션-레이어)
3. [pages/ - 페이지 레이어](#3-pages---페이지-레이어)
4. [entities/ - 엔티티 레이어](#4-entities---엔티티-레이어)
5. [features/ - 기능 레이어](#5-features---기능-레이어-선택)
6. [widgets/ - 위젯 레이어](#6-widgets---위젯-레이어-선택)
7. [shared/ - 공유 레이어](#7-shared---공유-레이어)
8. [파일 배치 결정 가이드](#8-파일-배치-결정-가이드)

---

## 1. 전체 구조 개요

```
apps/data-platform/
├── src/
│   ├── app/                    # 앱 초기화, 라우팅
│   │   ├── App.tsx
│   │   ├── layout/
│   │   ├── providers/
│   │   ├── router/
│   │   └── styles/
│   │
│   ├── pages/                  # 페이지 (URL 매핑)
│   │   ├── DashboardPage/
│   │   ├── UserListPage/
│   │   └── ...
│   │
│   ├── widgets/                # 복합 UI 블록 (선택)
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── ...
│   │
│   ├── features/               # 사용자 기능 (선택)
│   │   ├── user-login/
│   │   ├── user-filters/
│   │   └── ...
│   │
│   ├── entities/               # 비즈니스 엔티티
│   │   ├── user/
│   │   ├── product/
│   │   └── ...
│   │
│   └── shared/                 # 공통 리소스
│       ├── ui/
│       ├── lib/
│       ├── api/
│       └── config/
│
├── public/
├── package.json
└── vite.config.ts
```

---

## 2. app/ - 애플리케이션 레이어

### 2.1 구조

```
src/app/
├── App.tsx                     # 메인 App 컴포넌트
├── layout/
│   ├── AppLayout.tsx           # 전체 레이아웃 (Header, Sidebar, Main)
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── navigation.config.tsx   # 네비게이션 설정
├── providers/
│   ├── QueryProvider.tsx       # React Query Provider
│   ├── ThemeProvider.tsx       # 테마 Provider
│   └── AuthProvider.tsx        # 인증 Provider
├── router/
│   └── index.tsx               # React Router 설정
└── styles/
    └── global.css              # 전역 스타일
```

### 2.2 예시: App.tsx

```typescript
// src/app/App.tsx
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/global.css'

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  )
}
```

### 2.3 예시: router/index.tsx

```typescript
// src/app/router/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { UserListPage } from '@/pages/UserListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UserListPage /> },
    ],
  },
])
```

---

## 3. pages/ - 페이지 레이어

### 3.1 구조

```
src/pages/
├── DashboardPage/
│   ├── DashboardPage.tsx       # 페이지 컴포넌트
│   ├── DashboardPage.css       # 페이지 스타일 (선택)
│   └── index.ts                # Public API
├── UserListPage/
│   ├── UserListPage.tsx
│   └── index.ts
└── ProductDetailPage/
    ├── ProductDetailPage.tsx
    └── index.ts
```

### 3.2 예시: UserListPage

```typescript
// src/pages/UserListPage/UserListPage.tsx
import { PageTemplate, PageHeader } from '@workspace/ui'
import { UserTable } from '@/entities/user'
import { UserFilters } from '@/features/user-filters'

export function UserListPage() {
  return (
    <PageTemplate>
      <PageHeader
        title="사용자 관리"
        description="시스템 사용자 목록"
      />
      <UserFilters />
      <UserTable />
    </PageTemplate>
  )
}
```

```typescript
// src/pages/UserListPage/index.ts
export { UserListPage } from './UserListPage'
```

---

## 4. entities/ - 엔티티 레이어

### 4.1 구조

```
src/entities/
├── user/
│   ├── model/
│   │   ├── types.ts            # 타입 정의
│   │   ├── store.ts            # Zustand 스토어 (선택)
│   │   └── index.ts
│   ├── api/
│   │   ├── queries.ts          # React Query (GET)
│   │   ├── mutations.ts        # React Query (POST/PUT/DELETE)
│   │   ├── userApi.ts          # API 함수
│   │   └── index.ts
│   ├── ui/
│   │   ├── UserCard.tsx        # 사용자 카드
│   │   ├── UserTable.tsx       # 사용자 테이블
│   │   └── index.ts
│   ├── lib/                    # 유틸리티 (선택)
│   │   └── validateEmail.ts
│   └── index.ts                # Public API
│
├── product/
│   ├── model/
│   ├── api/
│   ├── ui/
│   └── index.ts
│
└── order/
    ├── model/
    ├── api/
    ├── ui/
    └── index.ts
```

### 4.2 예시: user 엔티티

```typescript
// src/entities/user/model/types.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface UserCreatePayload {
  name: string
  email: string
  password: string
}
```

```typescript
// src/entities/user/api/userApi.ts
import axios from 'axios'
import type { User, UserCreatePayload } from '../model'

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await axios.get('/api/users')
    return data
  },

  getUser: async (id: string): Promise<User> => {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
  },

  createUser: async (payload: UserCreatePayload): Promise<User> => {
    const { data } = await axios.post('/api/users', payload)
    return data
  },
}
```

```typescript
// src/entities/user/api/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from './userApi'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

```typescript
// src/entities/user/ui/UserTable.tsx
import { Table } from '@/shared/ui'
import { useUsers } from '../api/queries'

export function UserTable() {
  const { data: users, isLoading } = useUsers()

  if (isLoading) return <div>Loading...</div>

  return (
    <Table
      data={users}
      columns={[
        { key: 'name', header: '이름' },
        { key: 'email', header: '이메일' },
        { key: 'role', header: '역할' },
      ]}
    />
  )
}
```

```typescript
// src/entities/user/index.ts (Public API)
export { UserCard, UserTable } from './ui'
export { useUsers, useUser, useCreateUser } from './api/queries'
export type { User, UserCreatePayload } from './model/types'
```

---

## 5. features/ - 기능 레이어 (선택)

### 5.1 구조

```
src/features/
├── user-login/
│   ├── ui/
│   │   └── LoginForm.tsx
│   ├── model/
│   │   └── useLoginForm.ts
│   ├── api/
│   │   └── useLogin.ts
│   └── index.ts
│
└── user-filters/
    ├── ui/
    │   └── UserFilters.tsx
    ├── model/
    │   └── useFilters.ts
    └── index.ts
```

### 5.2 예시: user-login

```typescript
// src/features/user-login/ui/LoginForm.tsx
import { useState } from 'react'
import { Button, Input } from '@/shared/ui'
import { useLogin } from '../api/useLogin'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isPending } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" loading={isPending}>
        로그인
      </Button>
    </form>
  )
}
```

---

## 6. widgets/ - 위젯 레이어 (선택)

### 6.1 구조

```
src/widgets/
├── header/
│   ├── ui/
│   │   └── Header.tsx
│   └── index.ts
│
└── sidebar/
    ├── ui/
    │   └── Sidebar.tsx
    ├── model/
    │   └── useSidebarState.ts
    └── index.ts
```

### 6.2 예시: header

```typescript
// src/widgets/header/ui/Header.tsx
import { Logo } from '@/shared/ui'
import { UserMenu } from '@/features/user-menu'
import { Notifications } from '@/features/notifications'

export function Header() {
  return (
    <header className="header">
      <Logo />
      <nav>...</nav>
      <Notifications />
      <UserMenu />
    </header>
  )
}
```

---

## 7. shared/ - 공유 레이어

### 7.1 구조

```
src/shared/
├── ui/                         # UI 컴포넌트
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   └── index.ts
│   ├── Input/
│   ├── Card/
│   ├── Table/
│   └── index.ts
│
├── lib/                        # 유틸리티 함수
│   ├── formatDate.ts
│   ├── formatCurrency.ts
│   └── index.ts
│
├── api/                        # API 설정
│   ├── axios.ts                # Axios 인스턴스
│   ├── interceptors.ts
│   └── index.ts
│
├── config/                     # 설정
│   ├── env.ts                  # 환경 변수
│   └── constants.ts            # 상수
│
└── types/                      # 공통 타입
    └── index.ts
```

### 7.2 예시: shared/ui/Button

```typescript
// src/shared/ui/Button/Button.tsx
import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
```

```typescript
// src/shared/ui/Button/index.ts
export { Button } from './Button'
```

### 7.3 예시: shared/lib

```typescript
// src/shared/lib/formatDate.ts
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('ko-KR')
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('ko-KR')
}
```

### 7.4 예시: shared/config

```typescript
// src/shared/config/env.ts
export const ENV = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
}
```

---

## 8. 파일 배치 결정 가이드

### 8.1 질문 플로우

```
1. "이 코드가 URL과 매핑되는가?"
   ✅ Yes → pages/

2. "이 코드가 특정 도메인 엔티티와 관련있는가?"
   ✅ Yes → entities/[엔티티명]/

3. "이 코드가 사용자 행동/기능을 처리하는가?"
   ✅ Yes → features/[기능명]/

4. "이 코드가 여러 features를 조합한 복잡한 UI인가?"
   ✅ Yes → widgets/[위젯명]/

5. "이 코드가 프로젝트 전체에서 재사용되는가?"
   ✅ Yes → shared/[카테고리]/

6. "앱 초기화, 라우팅, 전역 설정인가?"
   ✅ Yes → app/
```

### 8.2 예시로 배우기

#### 예시 1: UserList 컴포넌트

**질문**: "사용자 목록 테이블을 어디에 만들까?"

```
1. URL 매핑? → No
2. 도메인 엔티티? → Yes (User)
3. 결정: entities/user/ui/UserTable.tsx
```

#### 예시 2: LoginForm

**질문**: "로그인 폼을 어디에 만들까?"

```
1. URL 매핑? → No
2. 도메인 엔티티? → No
3. 사용자 기능? → Yes (로그인)
4. 결정: features/user-login/ui/LoginForm.tsx
```

#### 예시 3: Button 컴포넌트

**질문**: "공통 버튼을 어디에 만들까?"

```
1-4. No
5. 프로젝트 전체 재사용? → Yes
6. 결정: shared/ui/Button/Button.tsx
```

#### 예시 4: DashboardPage

**질문**: "대시보드 페이지를 어디에 만들까?"

```
1. URL 매핑? → Yes (/dashboard)
2. 결정: pages/DashboardPage/DashboardPage.tsx
```

---

## 9. 실전 예시: 사용자 관리 기능 구현

### 9.1 요구사항

- 사용자 목록 페이지 (/users)
- 사용자 생성 폼
- 사용자 검색 필터

### 9.2 파일 생성

```
1. 페이지
   pages/UserListPage/UserListPage.tsx

2. 엔티티 (도메인)
   entities/user/model/types.ts
   entities/user/api/userApi.ts
   entities/user/api/queries.ts
   entities/user/ui/UserTable.tsx

3. 기능
   features/user-create/ui/UserCreateForm.tsx
   features/user-filters/ui/UserFilters.tsx

4. 공통 (필요시)
   shared/ui/Button/
   shared/ui/Input/
   shared/ui/Table/
```

### 9.3 Import 관계

```typescript
// pages/UserListPage/UserListPage.tsx
import { UserTable } from '@/entities/user'              // ✅
import { UserCreateForm } from '@/features/user-create'  // ✅
import { UserFilters } from '@/features/user-filters'    // ✅

// features/user-create/ui/UserCreateForm.tsx
import { useCreateUser } from '@/entities/user'          // ✅
import { Button, Input } from '@/shared/ui'              // ✅

// entities/user/ui/UserTable.tsx
import { Table } from '@/shared/ui'                      // ✅
import { useUsers } from '../api/queries'                // ✅
```

---

## 10. 다음 단계

폴더 구조를 이해했다면, 이제 코드 작성 규칙을 학습하세요:

1. **[05-code-conventions.md](05-code-conventions.md)**: 코드 작성 규칙
2. **[06-design-system.md](06-design-system.md)**: UI 컴포넌트 시스템
3. **[07-layout-system.md](07-layout-system.md)**: 레이아웃 시스템

---

