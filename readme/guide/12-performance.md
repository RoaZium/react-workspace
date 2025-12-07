# 성능 최적화

> React 애플리케이션의 렌더링 성능 및 번들 크기 최적화

## 목차

1. [렌더링 최적화](#1-렌더링-최적화)
2. [코드 분할](#2-코드-분할)
3. [이미지 최적화](#3-이미지-최적화)
4. [번들 크기 최적화](#4-번들-크기-최적화)
5. [성능 측정](#5-성능-측정)

---

## 1. 렌더링 최적화

### 1.1 React.memo

```typescript
// ❌ Bad - 부모가 렌더링되면 항상 재렌더링
export const UserCard = ({ user }: { user: User }) => {
  return <div>{user.name}</div>
}

// ✅ Good - props가 변경될 때만 재렌더링
export const UserCard = memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>
})

// ✅ Good - 커스텀 비교 함수
export const UserCard = memo(
  ({ user }: { user: User }) => {
    return <div>{user.name}</div>
  },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
)
```

---

### 1.2 useMemo

```typescript
export const ProductList = ({ products }: { products: Product[] }) => {
  // ❌ Bad - 매 렌더링마다 재계산
  const total = products.reduce((sum, p) => sum + p.price, 0)

  // ✅ Good - products가 변경될 때만 재계산
  const total = useMemo(
    () => products.reduce((sum, p) => sum + p.price, 0),
    [products]
  )

  return <div>Total: {total}</div>
}
```

---

### 1.3 useCallback

```typescript
export const UserList = ({ users }: { users: User[] }) => {
  // ❌ Bad - 매 렌더링마다 새 함수 생성
  const handleEdit = (id: string) => {
    console.log('Edit:', id)
  }

  // ✅ Good - 함수 재사용
  const handleEdit = useCallback((id: string) => {
    console.log('Edit:', id)
  }, [])

  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onEdit={handleEdit} />
      ))}
    </>
  )
}
```

---

### 1.4 Virtualization (가상 스크롤)

```typescript
import { FixedSizeList } from 'react-window'

export const LargeList = ({ items }: { items: Item[] }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>{items[index].name}</div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}
```

**설치**:
```bash
pnpm add react-window
```

---

## 2. 코드 분할

### 2.1 Route 기반 코드 분할

```typescript
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Lazy Load
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const UserListPage = lazy(() => import('@/pages/users/UserListPage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardPage />
      </Suspense>
    ),
  },
  {
    path: '/users',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UserListPage />
      </Suspense>
    ),
  },
])
```

---

### 2.2 컴포넌트 기반 코드 분할

```typescript
// Heavy 컴포넌트를 lazy load
const HeavyChart = lazy(() => import('./HeavyChart'))

export const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Suspense fallback={<Skeleton />}>
      <HeavyChart />
    </Suspense>
  </div>
)
```

---

### 2.3 조건부 import

```typescript
export const ExportButton = () => {
  const handleExport = async () => {
    // 클릭 시에만 라이브러리 로드
    const { exportToExcel } = await import('./exportUtils')
    exportToExcel(data)
  }

  return <Button onClick={handleExport}>Export to Excel</Button>
}
```

---

## 3. 이미지 최적화

### 3.1 이미지 포맷

```typescript
// WebP, AVIF 사용
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Fallback" />
</picture>
```

---

### 3.2 Lazy Loading

```typescript
<img src="/image.jpg" alt="..." loading="lazy" />
```

---

### 3.3 Responsive Images

```typescript
<img
  src="/image-800.jpg"
  srcSet="
    /image-400.jpg 400w,
    /image-800.jpg 800w,
    /image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Responsive"
/>
```

---

## 4. 번들 크기 최적화

### 4.1 번들 분석

```bash
# 번들 분석 도구 설치
pnpm add -D rollup-plugin-visualizer

# vite.config.ts에 추가
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
})

# 빌드 후 stats.html 생성됨
pnpm build
```

---

### 4.2 Tree Shaking

```typescript
// ❌ Bad - 전체 라이브러리 import
import _ from 'lodash'
const result = _.debounce(fn, 300)

// ✅ Good - 필요한 함수만 import
import debounce from 'lodash/debounce'
const result = debounce(fn, 300)
```

---

### 4.3 외부 의존성 최적화

**vite.config.ts**:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material'],
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
})
```

---

## 5. 성능 측정

### 5.1 React DevTools Profiler

```typescript
import { Profiler } from 'react'

const onRenderCallback = (
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number
) => {
  console.log(`${id} (${phase}): ${actualDuration}ms`)
}

export const App = () => (
  <Profiler id="App" onRender={onRenderCallback}>
    <Router />
  </Profiler>
)
```

---

### 5.2 Web Vitals

```bash
pnpm add web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

---

### 5.3 Lighthouse

```bash
# Chrome DevTools → Lighthouse 탭
# 또는 CLI
pnpm add -D lighthouse

lighthouse http://localhost:5173 --view
```

**목표**:
- **Performance**: 90+ 점
- **Accessibility**: 90+ 점
- **Best Practices**: 90+ 점
- **SEO**: 90+ 점

---

## 6. 실무 체크리스트

- [ ] Route 기반 코드 분할 적용
- [ ] 리스트 컴포넌트에 React.memo 적용
- [ ] 무거운 계산에 useMemo 적용
- [ ] 콜백 함수에 useCallback 적용
- [ ] 큰 리스트는 가상 스크롤 적용
- [ ] 이미지 lazy loading 적용
- [ ] 번들 크기 분석 및 최적화
- [ ] Lighthouse 점수 90+ 달성

---

- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

