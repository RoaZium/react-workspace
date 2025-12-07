# 테스트

> Vitest와 React Testing Library를 활용한 테스트 작성

## 목차

1. [테스트 환경 설정](#1-테스트-환경-설정)
2. [단위 테스트 (Unit)](#2-단위-테스트-unit)
3. [컴포넌트 테스트](#3-컴포넌트-테스트)
4. [통합 테스트](#4-통합-테스트)
5. [E2E 테스트](#5-e2e-테스트)
6. [테스트 패턴](#6-테스트-패턴)

---

## 1. 테스트 환경 설정

### 1.1 Vitest 설정

**파일**: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

---

### 1.2 Setup 파일

**파일**: `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

---

### 1.3 Test 명령어

**파일**: `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 2. 단위 테스트 (Unit)

### 2.1 유틸리티 함수 테스트

**파일**: `src/shared/utils/formatDate.ts`

```typescript
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR').format(date)
}
```

**파일**: `src/shared/utils/formatDate.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-12-07')
    const result = formatDate(date)
    expect(result).toBe('2024. 12. 7.')
  })

  it('should handle invalid date', () => {
    const date = new Date('invalid')
    const result = formatDate(date)
    expect(result).toBe('Invalid Date')
  })
})
```

---

### 2.2 비즈니스 로직 테스트

```typescript
// src/entities/order/model/calculateTotal.ts
export const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// src/entities/order/model/calculateTotal.test.ts
describe('calculateTotal', () => {
  it('should calculate total correctly', () => {
    const items = [
      { id: '1', price: 100, quantity: 2 },
      { id: '2', price: 200, quantity: 1 },
    ]
    expect(calculateTotal(items)).toBe(400)
  })

  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })
})
```

---

## 3. 컴포넌트 테스트

### 3.1 기본 렌더링 테스트

```typescript
// src/shared/ui/Button.tsx
export const Button = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick}>{label}</button>
)

// src/shared/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button label="Click me" onClick={onClick} />)

    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

---

### 3.2 Props 테스트

```typescript
// UserCard.test.tsx
describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  }

  it('renders user information', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', () => {
    const onEdit = vi.fn()
    render(<UserCard user={mockUser} onEdit={onEdit} />)

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalledWith('1')
  })
})
```

---

### 3.3 React Query 테스트

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useUsers } from './queries'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useUsers', () => {
  it('fetches users successfully', async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual([
      { id: '1', name: 'John' },
      { id: '2', name: 'Jane' },
    ])
  })
})
```

---

## 4. 통합 테스트

### 4.1 페이지 테스트

```typescript
// UserListPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { UserListPage } from './UserListPage'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('UserListPage', () => {
  it('renders user list', async () => {
    renderWithRouter(<UserListPage />)

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    renderWithRouter(<UserListPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

---

### 4.2 API Mock

```typescript
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { beforeAll, afterAll, afterEach } from 'vitest'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'John' },
        { id: '2', name: 'Jane' },
      ])
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 5. E2E 테스트

### 5.1 Playwright 설정

**설치**:
```bash
pnpm add -D @playwright/test
```

**파일**: `playwright.config.ts`

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'pnpm dev',
    port: 5173,
  },
})
```

---

### 5.2 E2E 테스트 작성

**파일**: `e2e/user-list.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test('user can view user list', async ({ page }) => {
  await page.goto('/users')

  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
  await expect(page.getByText('John Doe')).toBeVisible()
})

test('user can create new user', async ({ page }) => {
  await page.goto('/users')

  await page.click('text=Add User')
  await page.fill('input[name="name"]', 'New User')
  await page.fill('input[name="email"]', 'new@example.com')
  await page.click('button[type="submit"]')

  await expect(page.getByText('User created successfully')).toBeVisible()
})
```

---

## 6. 테스트 패턴

### 6.1 AAA 패턴

```typescript
it('should add item to cart', () => {
  // Arrange (준비)
  const cart = []
  const item = { id: '1', name: 'Product' }

  // Act (실행)
  const result = addToCart(cart, item)

  // Assert (검증)
  expect(result).toContain(item)
})
```

---

### 6.2 Given-When-Then

```typescript
describe('User authentication', () => {
  it('should login successfully with valid credentials', () => {
    // Given
    const credentials = { email: 'user@test.com', password: 'password123' }

    // When
    const result = login(credentials)

    // Then
    expect(result.success).toBe(true)
    expect(result.token).toBeDefined()
  })
})
```

---

### 6.3 Test Coverage

```bash
# Coverage 실행
pnpm test:coverage
```

**목표**:
- **Statements**: 80% 이상
- **Branches**: 75% 이상
- **Functions**: 80% 이상
- **Lines**: 80% 이상

---

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright](https://playwright.dev/)

---

