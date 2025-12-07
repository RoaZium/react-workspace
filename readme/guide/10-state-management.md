# 상태 관리

> Zustand를 활용한 전역 상태 관리 및 로컬 상태 패턴

## 목차

1. [상태 관리 전략](#1-상태-관리-전략)
2. [로컬 상태 (useState, useReducer)](#2-로컬-상태-usestate-usereducer)
3. [Zustand 전역 상태](#3-zustand-전역-상태)
4. [Server State (React Query)](#4-server-state-react-query)
5. [실무 패턴](#5-실무-패턴)

---

## 1. 상태 관리 전략

### 1.1 상태 분류

| 상태 유형 | 도구 | 예시 |
|-----------|------|------|
| **로컬 상태** | useState, useReducer | 폼 입력, 토글, 모달 open/close |
| **전역 상태** | Zustand | 사용자 인증, 테마, UI 설정 |
| **서버 상태** | React Query | API 데이터, 캐싱 |
| **URL 상태** | React Router | 페이지, 쿼리 파라미터 |

---

### 1.2 선택 가이드

```typescript
// ✅ 로컬 상태 - 단일 컴포넌트에서만 사용
const [count, setCount] = useState(0)

// ✅ 전역 상태 - 여러 컴포넌트에서 공유
const { user, setUser } = useAuthStore()

// ✅ 서버 상태 - API 데이터
const { data: users } = useUsers()

// ✅ URL 상태 - 페이지/필터 정보
const [searchParams] = useSearchParams()
const page = searchParams.get('page')
```

---

## 2. 로컬 상태 (useState, useReducer)

### 2.1 useState 기본

```typescript
export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
    </div>
  )
}
```

---

### 2.2 객체 상태 관리

```typescript
interface FormState {
  name: string
  email: string
  age: number
}

export const UserForm = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    age: 0,
  })

  const handleChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form>
      <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
      <input value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
      <input
        type="number"
        value={form.age}
        onChange={(e) => handleChange('age', Number(e.target.value))}
      />
    </form>
  )
}
```

---

### 2.3 useReducer

```typescript
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number }

interface State {
  count: number
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'SET':
      return { count: action.payload }
    default:
      return state
  }
}

export const CounterWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  )
}
```

---

## 3. Zustand 전역 상태

### 3.1 Store 생성

**위치**: `src/shared/store/authStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean

  // Actions
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setToken: (token) =>
        set({
          accessToken: token,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // localStorage 키
      partialize: (state) => ({
        // 저장할 항목만 선택
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
)
```

---

### 3.2 컴포넌트에서 사용

```typescript
import { useAuthStore } from '@/shared/store/authStore'

export const UserProfile = () => {
  const { user, logout } = useAuthStore()

  if (!user) return <div>Not logged in</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

### 3.3 선택적 구독

```typescript
// ❌ Bad - 전체 store 구독 (user, token 등 모든 변경에 리렌더)
const authStore = useAuthStore()

// ✅ Good - 필요한 값만 구독
const user = useAuthStore((state) => state.user)
const setUser = useAuthStore((state) => state.setUser)
```

---

### 3.4 여러 Store 분리

**UI Store**:

```typescript
// src/shared/store/uiStore.ts
interface UiState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}))
```

**Settings Store**:

```typescript
// src/shared/store/settingsStore.ts
interface SettingsState {
  language: 'en' | 'ko'
  notifications: boolean
  setLanguage: (lang: 'en' | 'ko') => void
  toggleNotifications: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'ko',
      notifications: true,
      setLanguage: (language) => set({ language }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
    }),
    { name: 'settings-storage' }
  )
)
```

---

## 4. Server State (React Query)

### 4.1 React Query 역할

```typescript
// ❌ 전역 상태로 서버 데이터 관리 (안티패턴)
const useUserStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    const data = await api.getUsers()
    set({ users: data })
  },
}))

// ✅ React Query 사용
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: api.getUsers,
})
```

**React Query 장점**:
- 자동 캐싱
- 자동 재조회 (refetch)
- 로딩/에러 상태 관리
- Optimistic updates

---

## 5. 실무 패턴

### 5.1 인증 흐름

```typescript
// Login 컴포넌트
export const LoginPage = () => {
  const { mutate: login } = useLogin()
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const navigate = useNavigate()

  const handleSubmit = (credentials: LoginCredentials) => {
    login(credentials, {
      onSuccess: (data) => {
        setUser(data.user)
        setToken(data.accessToken)
        navigate('/dashboard')
      },
    })
  }

  return <LoginForm onSubmit={handleSubmit} />
}

// Protected Route
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
```

---

### 5.2 테마 전환

```typescript
// ThemeProvider
export const App = () => {
  const theme = useUiStore((state) => state.theme)

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  )

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </MuiThemeProvider>
  )
}

// Theme Toggle Button
export const ThemeToggle = () => {
  const { theme, setTheme } = useUiStore()

  return (
    <IconButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}
```

---

### 5.3 폼 상태 + 서버 Mutation

```typescript
export const UserCreatePage = () => {
  const [form, setForm] = useState<UserCreatePayload>({
    name: '',
    email: '',
  })

  const { mutate: createUser, isLoading } = useCreateUser()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser(form, {
      onSuccess: () => {
        navigate('/users')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </Button>
    </form>
  )
}
```

---

### 5.4 Sidebar 상태

```typescript
// Sidebar
export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore()

  return (
    <Drawer open={sidebarOpen} onClose={toggleSidebar}>
      <SidebarContent />
    </Drawer>
  )
}

// Header
export const Header = () => {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return (
    <AppBar>
      <Toolbar>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
```

---

### 5.5 필터 상태 (URL + 로컬)

```typescript
export const UserListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [localFilters, setLocalFilters] = useState({
    role: '',
    status: '',
  })

  // URL에서 페이지 가져오기
  const page = Number(searchParams.get('page')) || 1

  // 페이지 변경 → URL 업데이트
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) })
  }

  // 필터 적용 → URL 업데이트
  const handleApplyFilters = () => {
    setSearchParams({
      page: '1',
      role: localFilters.role,
      status: localFilters.status,
    })
  }

  return (
    <div>
      <FilterForm filters={localFilters} onChange={setLocalFilters} onApply={handleApplyFilters} />
      <UserTable page={page} onPageChange={handlePageChange} />
    </div>
  )
}
```

---

## 6. 상태 디버깅

### 6.1 Zustand DevTools

```typescript
import { devtools } from 'zustand/middleware'

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // ...
      }),
      { name: 'auth-storage' }
    ),
    { name: 'AuthStore' }
  )
)
```

---

### 6.2 React Query DevTools

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

---

- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [React Query 공식 문서](https://tanstack.com/query/latest)
- [State Management Guide](https://kentcdodds.com/blog/application-state-management-with-react)

---

