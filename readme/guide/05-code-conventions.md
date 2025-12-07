# 코드 작성 규칙

> 일관된 코드 스타일과 네이밍 규칙으로 유지보수성을 높이는 가이드

## 목차

1. [네이밍 규칙](#1-네이밍-규칙)
2. [파일 및 폴더 네이밍](#2-파일-및-폴더-네이밍)
3. [TypeScript 스타일](#3-typescript-스타일)
4. [React 컴포넌트 패턴](#4-react-컴포넌트-패턴)
5. [Import 정렬](#5-import-정렬)
6. [주석 작성](#6-주석-작성)
7. [함수 작성](#7-함수-작성)

---

## 1. 네이밍 규칙

### 1.1 변수 및 함수

**camelCase 사용**

```typescript
// ✅ Good
const userName = 'John'
const isActive = true
const fetchUserData = async () => {}

// ❌ Bad
const UserName = 'John'
const is_active = true
const FetchUserData = async () => {}
```

**Boolean 변수**

```typescript
// ✅ Good - is, has, can, should 접두사
const isLoading = true
const hasPermission = false
const canEdit = true
const shouldUpdate = false

// ❌ Bad
const loading = true
const permission = false
```

**상수**

```typescript
// ✅ Good - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'
const DEFAULT_PAGE_SIZE = 20

// ❌ Bad
const maxRetryCount = 3
const apiBaseUrl = 'https://api.example.com'
```

---

### 1.2 타입 및 인터페이스

**PascalCase 사용**

```typescript
// ✅ Good
interface User {
  id: string
  name: string
}

type UserRole = 'admin' | 'user' | 'guest'

interface ApiResponse<T> {
  data: T
  message: string
}

// ❌ Bad
interface user {
  id: string
  name: string
}

type userRole = 'admin' | 'user'
```

**Props 타입**

```typescript
// ✅ Good - ComponentNameProps 패턴
interface UserCardProps {
  user: User
  onEdit?: (id: string) => void
}

const UserCard = ({ user, onEdit }: UserCardProps) => {
  // ...
}

// ❌ Bad
interface Props {
  user: User
}
```

---

### 1.3 컴포넌트

**PascalCase 사용**

```typescript
// ✅ Good
const UserList = () => {}
const DataTable = () => {}
const HeaderNavigation = () => {}

// ❌ Bad
const userList = () => {}
const dataTable = () => {}
const header_navigation = () => {}
```

---

## 2. 파일 및 폴더 네이밍

### 2.1 파일 네이밍

**컴포넌트 파일: PascalCase**

```
UserList.tsx
DataTable.tsx
HeaderNavigation.tsx
```

**훅 파일: camelCase**

```
useUser.ts
useAuth.ts
useLocalStorage.ts
```

**유틸리티 파일: camelCase**

```
formatDate.ts
parseQuery.ts
validation.ts
```

**타입 파일: camelCase**

```
types.ts
user.types.ts
api.types.ts
```

---

### 2.2 폴더 네이밍

**kebab-case 사용**

```
user-management/
order-history/
payment-settings/
```

**단수형 사용 (FSD 레이어 제외)**

```
✅ feature/auth/
✅ entity/user/
✅ widget/header/

❌ features/auths/
❌ entities/users/
```

---

## 3. TypeScript 스타일

### 3.1 타입 정의

**명시적 타입 선언**

```typescript
// ✅ Good - 함수 파라미터와 반환 타입 명시
const getUser = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

// ❌ Bad - any 사용
const getUser = async (id: any) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}
```

**타입 vs 인터페이스**

```typescript
// ✅ 객체 구조: Interface 사용
interface User {
  id: string
  name: string
  email: string
}

// ✅ Union, Primitive: Type 사용
type UserRole = 'admin' | 'user' | 'guest'
type UserId = string

// ✅ 함수 타입: Type 사용
type EventHandler = (event: Event) => void
```

---

### 3.2 타입 안정성

**null/undefined 처리**

```typescript
// ✅ Good - Optional Chaining & Nullish Coalescing
const userName = user?.name ?? 'Unknown'
const email = user?.contact?.email

// ❌ Bad
const userName = user && user.name ? user.name : 'Unknown'
```

**타입 가드**

```typescript
// ✅ Good
const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}

if (isUser(data)) {
  console.log(data.name) // 타입 안전
}
```

---

### 3.3 Generic 사용

```typescript
// ✅ Good - Generic으로 재사용성 높이기
interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await api.get<ApiResponse<T>>(url)
  return response.data
}

// 사용
const users = await fetchData<User[]>('/users')
const user = await fetchData<User>('/users/1')
```

---

## 4. React 컴포넌트 패턴

### 4.1 함수형 컴포넌트 (필수)

```typescript
// ✅ Good - 화살표 함수 + 타입 정의
interface UserCardProps {
  user: User
  onEdit?: (id: string) => void
}

export const UserCard = ({ user, onEdit }: UserCardProps) => {
  return (
    <Card>
      <Typography>{user.name}</Typography>
      {onEdit && <Button onClick={() => onEdit(user.id)}>Edit</Button>}
    </Card>
  )
}

// ❌ Bad - 클래스 컴포넌트 (구식)
class UserCard extends React.Component<UserCardProps> {
  render() {
    return <Card>...</Card>
  }
}
```

---

### 4.2 Props 구조 분해

```typescript
// ✅ Good - 구조 분해 + 기본값
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({
  label,
  variant = 'primary',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <MuiButton variant={variant} disabled={disabled} onClick={onClick}>
      {label}
    </MuiButton>
  )
}

// ❌ Bad
export const Button = (props: ButtonProps) => {
  return <MuiButton variant={props.variant || 'primary'}>{props.label}</MuiButton>
}
```

---

### 4.3 조건부 렌더링

```typescript
// ✅ Good - Early Return
export const UserProfile = ({ user }: { user?: User }) => {
  if (!user) {
    return <div>No user found</div>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// ✅ Good - 짧은 조건은 && 사용
export const UserCard = ({ user, showEmail }: Props) => {
  return (
    <Card>
      <Typography>{user.name}</Typography>
      {showEmail && <Typography>{user.email}</Typography>}
    </Card>
  )
}

// ❌ Bad - 중첩된 삼항 연산자
export const UserProfile = ({ user }: { user?: User }) => {
  return user ? (
    <div>{user.name ? <h1>{user.name}</h1> : <h1>Unknown</h1>}</div>
  ) : (
    <div>No user</div>
  )
}
```

---

### 4.4 Custom Hooks

```typescript
// ✅ Good - use 접두사
export const useUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userApi.getUser(id)
        setUser(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [id])

  return { user, isLoading, error }
}

// 사용
const { user, isLoading, error } = useUser('123')
```

---

## 5. Import 정렬

### 5.1 Import 순서

```typescript
// 1. React 관련
import { useState, useEffect } from 'react'

// 2. 외부 라이브러리
import { useQuery } from '@tanstack/react-query'
import { Box, Typography, Button } from '@mui/material'

// 3. 내부 절대 경로 (aliases)
import { useAuth } from '@/features/auth'
import { UserCard } from '@/entities/user'
import { Button as CustomButton } from '@/shared/ui'

// 4. 상대 경로
import { formatDate } from '../utils/formatDate'
import type { User } from '../types'

// 5. 스타일 및 에셋
import styles from './UserList.module.css'
import logo from './logo.svg'
```

---

### 5.2 Named vs Default Import

```typescript
// ✅ Good - Named Export 사용 (권장)
export const UserCard = () => {}
export const UserList = () => {}

import { UserCard, UserList } from '@/entities/user'

// ⚠️ Default Export는 제한적으로 사용
// - 페이지 컴포넌트
// - 라우트 레이지 로딩
export default UserPage

import UserPage from '@/pages/user/UserPage'
```

---

## 6. 주석 작성

### 6.1 함수/컴포넌트 주석

```typescript
/**
 * 사용자 목록을 표시하는 컴포넌트
 *
 * @param users - 표시할 사용자 배열
 * @param onUserClick - 사용자 클릭 시 호출되는 콜백
 * @returns 사용자 목록 UI
 */
export const UserList = ({ users, onUserClick }: UserListProps) => {
  // ...
}
```

---

### 6.2 복잡한 로직 설명

```typescript
// ✅ Good - 왜(Why)를 설명
// 사용자가 마지막 로그인 후 30일이 지나면 비활성 처리
const isInactive = daysSinceLastLogin > 30

// ❌ Bad - 무엇(What)을 반복
// daysSinceLastLogin이 30보다 크면 true
const isInactive = daysSinceLastLogin > 30
```

---

### 6.3 TODO 주석

```typescript
// TODO: 페이지네이션 추가 필요 (2024-12-10, @username)
// FIXME: API 응답 에러 처리 개선 필요
// NOTE: 이 로직은 레거시 시스템 호환성을 위해 유지
```

---

## 7. 함수 작성

### 7.1 함수 크기

```typescript
// ✅ Good - 작고 단일 책임
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

const validateUser = (user: User): boolean => {
  return validateEmail(user.email) && validatePassword(user.password)
}

// ❌ Bad - 너무 큰 함수
const validateUser = (user: User): boolean => {
  // 이메일 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(user.email)) return false

  // 비밀번호 검증
  if (user.password.length < 8) return false

  // 이름 검증
  if (!user.name || user.name.trim() === '') return false

  // ...
  return true
}
```

---

### 7.2 Early Return

```typescript
// ✅ Good
const getDiscountedPrice = (price: number, user?: User): number => {
  if (!user) return price
  if (!user.isPremium) return price

  return price * 0.9
}

// ❌ Bad
const getDiscountedPrice = (price: number, user?: User): number => {
  if (user) {
    if (user.isPremium) {
      return price * 0.9
    }
  }
  return price
}
```

---

### 7.3 순수 함수 (Pure Function)

```typescript
// ✅ Good - 순수 함수 (부작용 없음)
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// ❌ Bad - 외부 상태 변경
let total = 0
const calculateTotal = (items: Item[]): void => {
  total = items.reduce((sum, item) => sum + item.price, 0)
}
```

---

## 8. ESLint & Prettier

### 8.1 ESLint 규칙 (주요)

```json
{
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

---

### 8.2 Prettier 설정

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

---

## 9. Git Commit 규칙

### 9.1 커밋 메시지 형식

```
<type>: <subject>

<body>

<footer>
```

**Type 종류**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정, 패키지 업데이트

**예시**:
```bash
feat: 사용자 목록 페이지 추가

- UserList 컴포넌트 구현
- API 연동
- 페이지네이션 추가

Closes #123
```

---

## 10. 체크리스트

코드 작성 후 다음 항목을 확인하세요:

- [ ] 네이밍이 명확하고 일관적인가?
- [ ] TypeScript 타입이 명시적으로 정의되었는가?
- [ ] any 타입을 사용하지 않았는가?
- [ ] 함수가 단일 책임을 가지는가?
- [ ] Early Return을 사용했는가?
- [ ] 주석이 필요한 곳에만 적절히 작성되었는가?
- [ ] Import 순서가 정리되었는가?
- [ ] ESLint/Prettier 규칙을 통과하는가?
- [ ] 불필요한 console.log가 제거되었는가?
- [ ] 커밋 메시지가 규칙에 맞는가?

---

