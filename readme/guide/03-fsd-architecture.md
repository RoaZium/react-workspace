# FSD 아키텍처

> Feature-Sliced Design: 확장 가능하고 유지보수 가능한 프론트엔드 아키텍처

## 목차

1. [FSD란?](#1-fsd란)
2. [핵심 개념](#2-핵심-개념)
3. [레이어 (Layers)](#3-레이어-layers)
4. [의존성 규칙](#4-의존성-규칙)
5. [슬라이스 (Slices)](#5-슬라이스-slices)
6. [세그먼트 (Segments)](#6-세그먼트-segments)
7. [Public API](#7-public-api)
8. [실무 적용 예시](#8-실무-적용-예시)

---

## 1. FSD란?

**Feature-Sliced Design (FSD)**는 프론트엔드 애플리케이션을 구조화하기 위한 아키텍처 방법론입니다.

### 핵심 원칙

- **관심사 분리**: 기능별, 역할별로 코드를 명확히 분리
- **단방향 의존성**: 상위 레이어는 하위 레이어만 참조
- **재사용성**: 독립적인 모듈 단위로 구성
- **확장성**: 새로운 기능 추가가 용이
- **유지보수성**: 명확한 구조로 코드 파악 쉬움

---

## 2. 핵심 개념

FSD는 세 가지 핵심 개념으로 구성됩니다:

```
Layer (계층)
  └── Slice (슬라이스)
      └── Segment (세그먼트)
```

### 예시

```
entities/                    ← Layer (계층)
  └── user/                  ← Slice (슬라이스)
      ├── ui/                ← Segment (세그먼트)
      ├── model/             ← Segment (세그먼트)
      └── api/               ← Segment (세그먼트)
```

---

## 3. 레이어 (Layers)

### 3.1 전체 레이어 구조

```
app/         ← 애플리케이션 초기화, 라우팅, 전역 설정
  ↓
pages/       ← 라우팅 가능한 페이지 (URL 단위)
  ↓
widgets/     ← 복합 UI 블록 (헤더, 사이드바 등)
  ↓
features/    ← 사용자 기능 (로그인, 장바구니 추가 등)
  ↓
entities/    ← 비즈니스 엔티티 (사용자, 상품, 주문 등)
  ↓
shared/      ← 공통 리소스 (UI 컴포넌트, 유틸리티)
```

**의존성 규칙**: 화살표 방향으로만 import 가능 (상위 → 하위)

---

### 3.2 각 레이어 상세

#### app/ - 애플리케이션 레이어

**역할**: 앱 초기화, 라우팅, 전역 프로바이더

```typescript
// src/app/App.tsx
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { router } from './router'

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

**포함 항목**:
- 라우터 설정
- 전역 프로바이더 (React Query, Theme, Auth)
- 전역 스타일
- 레이아웃 (Header, Sidebar 배치)

---

#### pages/ - 페이지 레이어

**역할**: URL에 매핑되는 페이지 컴포넌트 (조합만 담당)

```typescript
// src/pages/UserListPage/UserListPage.tsx
import { PageTemplate } from '@workspace/ui'
import { UserTable } from '@/entities/user'
import { UserFilters } from '@/features/user-filters'

export function UserListPage() {
  return (
    <PageTemplate>
      <UserFilters />
      <UserTable />
    </PageTemplate>
  )
}
```

**특징**:
- 비즈니스 로직 없음 (조합만!)
- 다른 레이어의 컴포넌트를 조합
- URL 라우팅과 1:1 매핑

---

#### widgets/ - 위젯 레이어 (선택)

**역할**: 독립적인 복합 UI 블록

```typescript
// src/widgets/header/ui/Header.tsx
import { Logo } from '@/shared/ui/Logo'
import { UserMenu } from '@/features/user-menu'
import { Notifications } from '@/features/notifications'

export function Header() {
  return (
    <header>
      <Logo />
      <Notifications />
      <UserMenu />
    </header>
  )
}
```

**사용 시기**:
- 여러 features를 조합한 복잡한 UI 블록
- 재사용되는 레이아웃 컴포넌트

---

#### features/ - 기능 레이어 (선택)

**역할**: 사용자 상호작용 및 비즈니스 로직

```typescript
// src/features/user-login/ui/LoginForm.tsx
import { useState } from 'react'
import { Button, Input } from '@/shared/ui'
import { useLogin } from '../api/useLogin'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login } = useLogin()

  const handleSubmit = () => {
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input value={email} onChange={setEmail} />
      <Input type="password" value={password} onChange={setPassword} />
      <Button type="submit">로그인</Button>
    </form>
  )
}
```

**특징**:
- 사용자 행동 처리 (클릭, 제출 등)
- 비즈니스 로직 포함
- entities를 활용

---

#### entities/ - 엔티티 레이어 (필수)

**역할**: 비즈니스 도메인 객체 및 관련 로직

```typescript
// src/entities/user/model/types.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

// src/entities/user/api/queries.ts
import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
      return res.json()
    },
  })
}

// src/entities/user/ui/UserCard.tsx
import { Card } from '@/shared/ui'
import type { User } from '../model'

export function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </Card>
  )
}
```

**특징**:
- 도메인 중심 구조
- 재사용 가능한 컴포넌트
- API 호출 로직 포함

---

#### shared/ - 공유 레이어 (필수)

**역할**: 프로젝트 전체에서 사용되는 공통 리소스

```typescript
// src/shared/ui/Button/Button.tsx
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>
}

// src/shared/lib/formatDate.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR')
}

// src/shared/config/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
```

**포함 항목**:
- UI 컴포넌트 (Button, Input, Card)
- 유틸리티 함수
- 상수, 설정
- 타입 정의

---

## 4. 의존성 규칙

### 4.1 기본 규칙

```
✅ 허용: 상위 레이어 → 하위 레이어
❌ 금지: 하위 레이어 → 상위 레이어
❌ 금지: 같은 레이어 내 슬라이스 간
```

### 4.2 예시

```typescript
// ✅ 올바른 import
// pages → entities
import { UserTable } from '@/entities/user'

// pages → features
import { LoginForm } from '@/features/auth'

// entities → shared
import { Button } from '@/shared/ui'

// ❌ 잘못된 import
// entities → features (하위 → 상위)
import { LoginForm } from '@/features/auth' // 금지!

// entities/user → entities/product (같은 레이어)
import { ProductCard } from '@/entities/product' // 금지!
```

### 4.3 예외: entities 간 참조

entities 간 참조가 필요한 경우 타입만 import:

```typescript
// ✅ 타입만 import (허용)
import type { Product } from '@/entities/product'

export interface Order {
  id: string
  products: Product[] // 타입 참조만
}
```

---

## 5. 슬라이스 (Slices)

### 5.1 개념

슬라이스는 레이어 내에서 기능별로 코드를 그룹화한 단위입니다.

```
entities/
  ├── user/      ← 슬라이스
  ├── product/   ← 슬라이스
  └── order/     ← 슬라이스
```

### 5.2 명명 규칙

- **kebab-case** 사용
- 단수형 사용
- 도메인 용어 사용

```
✅ user, product, order
❌ User, users, UserEntity
```

---

## 6. 세그먼트 (Segments)

### 6.1 표준 세그먼트

```
slices/
  └── user/
      ├── ui/        ← UI 컴포넌트
      ├── model/     ← 타입, 상태, 로직
      ├── api/       ← API 호출
      ├── lib/       ← 유틸리티 함수
      └── config/    ← 설정
```

### 6.2 각 세그먼트 역할

#### ui/ - UI 컴포넌트

```typescript
// entities/user/ui/UserCard.tsx
export function UserCard({ user }: Props) {
  return <Card>...</Card>
}
```

#### model/ - 타입 및 상태

```typescript
// entities/user/model/types.ts
export interface User {
  id: string
  name: string
}

// entities/user/model/store.ts (Zustand)
export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}))
```

#### api/ - API 호출

```typescript
// entities/user/api/queries.ts
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

// entities/user/api/userApi.ts
export const userApi = {
  fetchUsers: () => fetch('/api/users').then(r => r.json()),
  createUser: (data) => fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }),
}
```

#### lib/ - 유틸리티

```typescript
// entities/user/lib/validateEmail.ts
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

---

## 7. Public API

### 7.1 개념

각 슬라이스는 `index.ts`를 통해 외부에 공개할 항목만 export합니다.

```typescript
// entities/user/index.ts
export { UserCard } from './ui/UserCard'
export { useUsers } from './api/queries'
export type { User } from './model/types'

// ❌ 내부 구현은 export 하지 않음
// export { validateEmail } from './lib/validateEmail'
```

### 7.2 사용

```typescript
// ✅ Public API를 통한 import
import { UserCard, useUsers, type User } from '@/entities/user'

// ❌ 내부 경로 직접 import (금지)
import { UserCard } from '@/entities/user/ui/UserCard'
```

---

## 8. 실무 적용 예시

### 8.1 최소 구조 (필수 레이어만)

```
src/
├── app/              ← 앱 초기화
├── pages/            ← 페이지
├── entities/         ← 비즈니스 엔티티
└── shared/           ← 공통 리소스
```

**적합한 프로젝트**:
- 소규모 프로젝트
- 단순한 CRUD 애플리케이션

---

### 8.2 중간 구조 (features 추가)

```
src/
├── app/
├── pages/
├── features/         ← 사용자 기능 추가
├── entities/
└── shared/
```

**적합한 프로젝트**:
- 중규모 프로젝트
- 복잡한 사용자 상호작용

---

### 8.3 전체 구조 (widgets 추가)

```
src/
├── app/
├── pages/
├── widgets/          ← 복합 UI 블록 추가
├── features/
├── entities/
└── shared/
```

**적합한 프로젝트**:
- 대규모 프로젝트
- 복잡한 레이아웃 구조

---

## 9. 다음 단계

FSD 아키텍처 개념을 이해했다면, 실제 폴더 구조를 확인하세요:

1. **[04-folder-structure.md](04-folder-structure.md)**: 실제 프로젝트 폴더 구조
2. **[05-code-conventions.md](05-code-conventions.md)**: 코드 작성 규칙

---

