# API 통합

> React Query (TanStack Query)와 Axios를 활용한 데이터 페칭 및 API 통신

## 목차

1. [API 클라이언트 설정](#1-api-클라이언트-설정)
2. [React Query 설정](#2-react-query-설정)
3. [데이터 페칭 (GET)](#3-데이터-페칭-get)
4. [데이터 변경 (POST/PUT/DELETE)](#4-데이터-변경-postputdelete)
5. [에러 처리](#5-에러-처리)
6. [인증 처리](#6-인증-처리)
7. [실무 패턴](#7-실무-패턴)

---

## 1. API 클라이언트 설정

### 1.1 Axios 인스턴스

**위치**: `packages/shared-api/src/client.ts`

```typescript
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // 인증 토큰 추가
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 시 토큰 갱신
    if (error.response?.status === 401) {
      // 토큰 갱신 로직
      const newToken = await refreshToken()
      error.config.headers.Authorization = `Bearer ${newToken}`
      return apiClient.request(error.config)
    }
    return Promise.reject(error)
  }
)
```

---

### 1.2 API 함수 정의

**위치**: `src/entities/user/api/userApi.ts`

```typescript
import { apiClient } from '@workspace/shared-api'
import type { User, UserCreatePayload, UserUpdatePayload } from '../model/types'

export const userApi = {
  // 목록 조회
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users')
    return response.data
  },

  // 단일 조회
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  // 생성
  createUser: async (payload: UserCreatePayload): Promise<User> => {
    const response = await apiClient.post<User>('/users', payload)
    return response.data
  },

  // 수정
  updateUser: async (id: string, payload: UserUpdatePayload): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, payload)
    return response.data
  },

  // 삭제
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}
```

---

## 2. React Query 설정

### 2.1 Query Client 설정

**위치**: `src/app/providers/QueryProvider.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5분
    },
    mutations: {
      retry: 0,
    },
  },
})

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

---

### 2.2 App에 적용

**위치**: `src/app/App.tsx`

```typescript
import { QueryProvider } from './providers/QueryProvider'

export const App = () => (
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>
)
```

---

## 3. 데이터 페칭 (GET)

### 3.1 useQuery 기본

**위치**: `src/entities/user/api/queries.ts`

```typescript
import { useQuery } from '@tanstack/react-query'
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
    enabled: !!id, // id가 있을 때만 실행
  })
}
```

---

### 3.2 컴포넌트에서 사용

```typescript
import { useUsers } from '@/entities/user'

export const UserList = () => {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!users) return null

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

---

### 3.3 페이지네이션

```typescript
interface UsersParams {
  page: number
  pageSize: number
}

export const useUsersPaginated = ({ page, pageSize }: UsersParams) => {
  return useQuery({
    queryKey: ['users', 'paginated', page, pageSize],
    queryFn: () => userApi.getUsersPaginated({ page, pageSize }),
    keepPreviousData: true, // 페이지 전환 시 이전 데이터 유지
  })
}

// 사용
const [page, setPage] = useState(1)
const { data, isLoading } = useUsersPaginated({ page, pageSize: 20 })
```

---

### 3.4 무한 스크롤

```typescript
import { useInfiniteQuery } from '@tanstack/react-query'

export const useUsersInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam = 1 }) => userApi.getUsersPaginated({ page: pageParam, pageSize: 20 }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined
    },
  })
}

// 사용
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useUsersInfinite()

<Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
  {isFetchingNextPage ? 'Loading...' : 'Load More'}
</Button>
```

---

## 4. 데이터 변경 (POST/PUT/DELETE)

### 4.1 useMutation 기본

**위치**: `src/entities/user/api/mutations.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from './userApi'
import type { UserCreatePayload, UserUpdatePayload } from '../model/types'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UserCreatePayload) => userApi.createUser(payload),
    onSuccess: () => {
      // 캐시 무효화 → 재조회
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UserUpdatePayload }) =>
      userApi.updateUser(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

---

### 4.2 컴포넌트에서 사용

```typescript
import { useCreateUser } from '@/entities/user'
import { useState } from 'react'

export const UserCreateForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const { mutate: createUser, isLoading } = useCreateUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser(
      { name, email },
      {
        onSuccess: () => {
          alert('User created!')
          setName('')
          setEmail('')
        },
        onError: (error) => {
          alert(`Error: ${error.message}`)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
```

---

### 4.3 Optimistic Update

```typescript
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UserUpdatePayload }) =>
      userApi.updateUser(id, payload),

    // Optimistic Update
    onMutate: async ({ id, payload }) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['users', id] })

      // 이전 값 저장
      const previousUser = queryClient.getQueryData(['users', id])

      // 낙관적 업데이트
      queryClient.setQueryData(['users', id], (old: User) => ({
        ...old,
        ...payload,
      }))

      return { previousUser }
    },

    // 에러 시 롤백
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['users', variables.id], context.previousUser)
      }
    },

    // 성공/실패 관계없이 재조회
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
    },
  })
}
```

---

## 5. 에러 처리

### 5.1 전역 에러 핸들러

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error('Query error:', error)
        // 토스트 메시지 표시
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error)
        // 에러 모달 표시
      },
    },
  },
})
```

---

### 5.2 개별 에러 처리

```typescript
const { data, error, isError } = useUsers()

if (isError) {
  return <ErrorMessage error={error} />
}
```

---

### 5.3 에러 타입 정의

```typescript
interface ApiError {
  message: string
  code: string
  status: number
}

export const useUsers = () => {
  return useQuery<User[], ApiError>({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  })
}
```

---

## 6. 인증 처리

### 6.1 토큰 갱신

```typescript
const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken')
  const response = await apiClient.post('/auth/refresh', { refreshToken })
  const { accessToken } = response.data

  localStorage.setItem('accessToken', accessToken)
  return accessToken
}
```

---

### 6.2 인증 Hooks

```typescript
export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      queryClient.clear() // 모든 캐시 삭제
    },
  })
}
```

---

## 7. 실무 패턴

### 7.1 Search 기능

```typescript
export const useUsersSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['users', 'search', keyword],
    queryFn: () => userApi.searchUsers(keyword),
    enabled: keyword.length >= 2, // 2글자 이상만 검색
    staleTime: 30 * 1000, // 30초
  })
}

// Debounce와 함께 사용
const [keyword, setKeyword] = useState('')
const debouncedKeyword = useDebounce(keyword, 500)
const { data } = useUsersSearch(debouncedKeyword)
```

---

### 7.2 Prefetch

```typescript
import { useQueryClient } from '@tanstack/react-query'

export const UserListItem = ({ user }: { user: User }) => {
  const queryClient = useQueryClient()

  const handleMouseEnter = () => {
    // 마우스 호버 시 상세 데이터 미리 로드
    queryClient.prefetchQuery({
      queryKey: ['users', user.id],
      queryFn: () => userApi.getUser(user.id),
    })
  }

  return <div onMouseEnter={handleMouseEnter}>{user.name}</div>
}
```

---

### 7.3 Dependent Queries

```typescript
export const UserWithPosts = ({ userId }: { userId: string }) => {
  // 1. 사용자 조회
  const { data: user } = useUser(userId)

  // 2. 사용자의 게시글 조회 (사용자 조회 후 실행)
  const { data: posts } = useQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: () => postApi.getPostsByUser(userId),
    enabled: !!user, // user가 로드된 후 실행
  })

  return (
    <div>
      <h1>{user?.name}</h1>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

---

- [React Query 공식 문서](https://tanstack.com/query/latest)
- [Axios 공식 문서](https://axios-http.com/)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)

---

