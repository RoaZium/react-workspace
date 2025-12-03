# FSD 기반 레이아웃 아키텍처

> Feature-Sliced Design (FSD) 원칙을 적용한 현대적 레이아웃 구조

## 📐 설계 원칙

### 1. FSD (Feature-Sliced Design)
```
shared/          # 전역적으로 재사용되는 리소스
  └─ ui/        # UI 컴포넌트와 레이아웃
     └─ layouts/
```

### 2. 단순성 (Simplicity)
- ❌ 과도한 추상화 제거
- ✅ 명확한 책임 분리
- ✅ 직관적인 네이밍

### 3. 실용성 (Pragmatism)
- 실제 사용 패턴 기반 설계
- 최소한의 props
- 쉬운 마이그레이션 경로

---

## 🏗️ 새로운 구조

```
packages/ui/src/
└── shared/
    └── ui/
        └── layouts/
            ├── app-shell/          # 앱 전체 구조
            │   ├── AppShell.tsx
            │   ├── Header.tsx
            │   ├── Sidebar.tsx
            │   └── SidebarContext.tsx
            │
            ├── page/               # 페이지 기본 구조
            │   └── Page.tsx
            │
            ├── split/              # 분할 레이아웃
            │   ├── MasterDetail.tsx
            │   └── ThreeColumn.tsx
            │
            ├── grid/               # 그리드
            │   └── Grid.tsx
            │
            ├── stack/              # 스택
            │   └── Stack.tsx
            │
            └── index.ts
```

---

## 📦 컴포넌트 가이드

### 1. AppShell - 앱 전체 구조

**용도:** 전체 애플리케이션을 감싸는 최상위 레이아웃

```tsx
import { AppShell } from '@workspace/ui'

// Router에서 사용
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell config={layoutConfig} />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> }
    ]
  }
])
```

**주요 기능:**
- Header + Sidebar + Main 구조
- React Router Outlet 지원
- 사이드바 토글 상태 관리

---

### 2. Page - 페이지 기본 구조

**용도:** 개별 페이지의 컨테이너

```tsx
import { Page } from '@workspace/ui'

export function DashboardPage() {
  return (
    <Page>
      <Page.Header
        title="Dashboard"
        description="전체 현황"
        actions={<Button>새로고침</Button>}
      />

      {/* 페이지 콘텐츠 */}
      <Grid columns={4}>
        <StatCard />
      </Grid>
    </Page>
  )
}
```

**특징:**
- Compound Component 패턴
- 불필요한 PageContent 제거
- 간결한 API

---

### 3. MasterDetail - 목록 + 상세

**용도:** 목록(Master)과 상세(Detail)를 좌우 분할

```tsx
import { MasterDetail } from '@workspace/ui'

export function UserPage() {
  return (
    <Page>
      <Page.Header title="사용자 관리" />

      <MasterDetail
        ratio={[3, 7]}
        masterTitle="사용자 목록"
        detailTitle="상세 정보"
        master={<UserList />}
        detail={<UserDetail />}
      />
    </Page>
  )
}
```

**장점:**
- props 기반 (children 패턴보다 명확)
- 자동 반응형 처리
- 타이틀 built-in

---

### 4. ThreeColumn - 3단 분할

**용도:** 좌측 + 중앙 + 우측 3개 영역

```tsx
import { ThreeColumn } from '@workspace/ui'

export function DashboardPage() {
  return (
    <Page>
      <Page.Header title="Dashboard" />

      <ThreeColumn
        ratio={[2, 6, 2]}
        left={<Navigation />}
        center={<MainContent />}
        right={<Widgets />}
      />
    </Page>
  )
}
```

---

### 5. Grid - 그리드 레이아웃

**용도:** 동일 크기 그리드 셀

```tsx
import { Grid } from '@workspace/ui'

export function DashboardPage() {
  return (
    <Page>
      <Page.Header title="Dashboard" />

      <Grid columns={4} gap={3}>
        <StatCard icon="📊" value="100" label="Users" />
        <StatCard icon="💰" value="$50K" label="Revenue" />
        <StatCard icon="📈" value="+12%" label="Growth" />
        <StatCard icon="⚡" value="99%" label="Uptime" />
      </Grid>
    </Page>
  )
}
```

**특징:**
- 자동 반응형 (xs: 1열, sm: 2열, md: 3열, lg: 4열)
- 간단한 API

---

### 6. Stack - 스택 레이아웃

**용도:** Flexbox 기반 단순 스택

```tsx
import { Stack } from '@workspace/ui'

export function SettingsPage() {
  return (
    <Page>
      <Page.Header title="설정" />

      <Stack direction="column" gap={2}>
        <Card title="프로필">...</Card>
        <Card title="보안">...</Card>
        <Card title="알림">...</Card>
      </Stack>
    </Page>
  )
}
```

---

## 🔄 마이그레이션 가이드

### AS-IS (기존)
```tsx
import {
  PageLayout,
  PageHeader,
  PageContent,
  GridLayout,
  MasterDetailLayout,
} from '@workspace/ui'

export function OldPage() {
  return (
    <PageLayout>
      <PageHeader title="Dashboard" />
      <PageContent>
        <GridLayout columns={4}>
          <StatCard />
        </GridLayout>
      </PageContent>
    </PageLayout>
  )
}
```

### TO-BE (권장)
```tsx
import {
  Page,
  Grid,
  MasterDetail,
} from '@workspace/ui'

export function NewPage() {
  return (
    <Page>
      <Page.Header title="Dashboard" />

      <Grid columns={4}>
        <StatCard />
      </Grid>
    </Page>
  )
}
```

### 주요 변경사항

| 기존 | 신규 | 이유 |
|------|------|------|
| `PageLayout` | `Page` | 더 짧고 명확 |
| `PageHeader` | `Page.Header` | Compound Component |
| `PageContent` | (제거) | 불필요한 래퍼 |
| `GridLayout` | `Grid` | 더 짧고 명확 |
| `MasterDetailLayout` | `MasterDetail` | 더 짧고 명확 |

---

## 🎯 사용 가능한 모든 레이아웃

### Shared (FSD) - 권장 ✨

| 컴포넌트 | 용도 | Import |
|----------|------|--------|
| `AppShell` | 앱 전체 구조 | `@workspace/ui` |
| `Page` | 페이지 컨테이너 | `@workspace/ui` |
| `MasterDetail` | 목록 + 상세 | `@workspace/ui` |
| `ThreeColumn` | 3단 분할 | `@workspace/ui` |
| `Grid` | 그리드 | `@workspace/ui` |
| `Stack` | 스택 | `@workspace/ui` |

### Legacy - 하위 호환성 🔄

| 컴포넌트 | 대체 | 상태 |
|----------|------|------|
| `PageLayout` | `Page` | Deprecated |
| `GridLayout` | `Grid` | Deprecated |
| `MasterDetailLayout` | `MasterDetail` | Deprecated |
| `SearchLayout` | - | 유지 (특수 목적) |
| `TabLayout` | - | 유지 (특수 목적) |
| `TwoColumnPlusSplitLayout` | - | 유지 (DataHub 전용) |

---

## 📁 폴더 구조 비교

### Before (복잡)
```
packages/ui/src/
├── layout/              # AppLayout만
├── layouts/             # 페이지 레이아웃들
│   ├── page-templates/
│   └── wireframes/
└── components/
```

### After (FSD)
```
packages/ui/src/
├── shared/
│   └── ui/
│       └── layouts/     # 모든 레이아웃 통합
│           ├── app-shell/
│           ├── page/
│           ├── split/
│           ├── grid/
│           └── stack/
└── components/          # 변경 없음
```

---

## ✅ 개선 사항

### 1. **명확한 계층 구조**
- FSD의 shared 계층 준수
- 역할별 명확한 폴더 분리

### 2. **단순한 API**
- 불필요한 추상화 제거
- props 기반 API (children 패턴 최소화)
- 짧고 명확한 네이밍

### 3. **실용성**
- 실제 사용 패턴 기반
- 자동 반응형 처리
- 하위 호환성 유지

### 4. **유지보수성**
- 한 곳에서 관리 (`shared/ui/layouts`)
- 명확한 import 경로
- 타입 안정성

---

## 🚀 권장 사항

### 새 프로젝트
```tsx
// ✅ 권장: FSD 구조 사용
import { Page, Grid, MasterDetail } from '@workspace/ui'
```

### 기존 프로젝트
```tsx
// ✅ 기존 코드는 그대로 작동 (하위 호환성)
import { PageLayout, GridLayout } from '@workspace/ui'

// ✅ 새 코드는 FSD 구조 사용
import { Page, Grid } from '@workspace/ui'
```

---

## 📚 관련 문서

- [Feature-Sliced Design](https://feature-sliced.design/)
- [07-layout-architecture.md](./07-layout-architecture.md) - 기존 가이드
- [02-project-structure.md](./02-project-structure.md) - FSD 아키텍처

---

**마지막 업데이트:** 2024-12-03
**작성자:** Claude Code
