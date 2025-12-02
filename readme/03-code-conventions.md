# III. 코드 컨벤션 및 개발 표준

## 목차
1. [네이밍 및 코딩 규칙](#1-네이밍-및-코딩-규칙)
   - 1.1 [컴포넌트 명명 규칙](#11-컴포넌트-명명-규칙)
   - 1.2 [Props 명명 규칙](#12-props-명명-규칙)
   - 1.3 [이벤트 핸들러 명명 규칙](#13-이벤트-핸들러-명명-규칙)
   - 1.4 [상태 및 변수 명명 규칙](#14-상태-및-변수-명명-규칙)
   - 1.5 [파일 및 폴더 명명 규칙](#15-파일-및-폴더-명명-규칙)
2. [코드 구조 및 조직](#2-코드-구조-및-조직)
   - 2.1 [컴포넌트 구조](#21-컴포넌트-구조)
   - 2.2 [파일 구성](#22-파일-구성)
   - 2.3 [Import 문 정리](#23-import-문-정리)
3. [코딩 관행](#3-코딩-관행)
   - 3.1 [함수형 프로그래밍](#31-함수형-프로그래밍)
   - 3.2 [조건부 렌더링](#32-조건부-렌더링)
   - 3.3 [리스트 렌더링](#33-리스트-렌더링)
   - 3.4 [Prop 전달](#34-prop-전달)
4. [주석 및 문서화](#4-주석-및-문서화)
   - 4.1 [코드 주석](#41-코드-주석)
   - 4.2 [README 작성](#42-readme-작성)

---

## 1. 네이밍 및 코딩 규칙

### 1.1 컴포넌트 명명 규칙
- **규칙**: PascalCase 사용, 명사형으로 역할 명확히 (예: `UserProfile`, `ProductList`)
- **목적**: 가독성과 일관성 유지

### 1.2 Props 명명 규칙
- **규칙**: camelCase 사용, 설명적 이름, Boolean은 `is`, `has`, `can` 접두사 (예: `userName`, `isLoading`)
- **목적**: 명확한 의도 전달

### 1.3 이벤트 핸들러 명명 규칙
- **규칙**: `handle` 접두사 + 이벤트 이름, camelCase (예: `handleClick`, `handleSubmit`)
- **목적**: 이벤트 처리 함수의 역할 명확화

### 1.4 상태 및 변수 명명 규칙
- **규칙**: camelCase 사용, 의미 있는 이름 (예: `userList`, `isLoading`)
- **목적**: 코드 가독성과 유지보수성 향상

### 1.5 파일 및 폴더 명명 규칙
- **컴포넌트 파일**: PascalCase (예: `UserProfile.js`)
- **일반 JS 파일**: camelCase (예: `apiService.js`)
- **스타일 파일**: 컴포넌트와 동일 이름 (예: `UserProfile.module.css`)
- **폴더**: kebab-case (예: `user-profile`)
- **목적**: 일관된 구조와 탐색 용이성

## 2. 코드 구조 및 조직

### 2.1 컴포넌트 구조
- **방식**: 함수형 컴포넌트와 훅 사용
- **권장**: 큰 컴포넌트를 작은 단위로 분리하여 재사용성과 테스트 용이성 확보

### 2.2 파일 구성
- **방식**: 관련 컴포넌트를 같은 폴더에 그룹화
- **공통 유틸리티**: 별도 파일로 분리 (예: `shared/lib`)
- **목적**: 코드 조직화 및 재사용성 강화

### 2.3 Import 문 정리
- **규칙**:
  - 그룹화: 내장 모듈 → 외부 라이브러리 → 로컬 임포트
  - 알파벳 순 정렬
- **예시**:
```javascript
import React from 'react';
import styled from 'styled-components';
import { useUser } from './hooks/useUser';
```
- **목적**: 가독성과 유지보수성 향상

## 3. 코딩 관행

### 3.1 함수형 프로그래밍
- **원칙**: 순수 함수 사용, 불변성 유지
- **이점**: 예측 가능한 코드, 디버깅 용이

### 3.2 조건부 렌더링
- **방식**: 삼항 연산자 또는 `&&` 사용
- **권장**: 복잡한 조건은 변수/함수로 추출
- **예시**:
```javascript
{isLoading ? <Spinner /> : <Content />}
```

### 3.3 리스트 렌더링
- **규칙**: `key` prop 필수, 인덱스 사용 지양
- **예시**:
```javascript
items.map(item => <Item key={item.id} {...item} />)
```
- **목적**: 렌더링 최적화 및 버그 방지

### 3.4 Prop 전달
- **방식**: 스프레드 연산자 활용, 타입 명시 (PropTypes/TypeScript)
- **예시**:
```javascript
<Component {...props} />
```
- **목적**: 간결한 코드와 타입 안정성

## 4. 주석 및 문서화

### 4.1 코드 주석
- **규칙**: 복잡한 로직에만 JSDoc 스타일 주석 사용
- **예시**:
```javascript
/** Fetches user data by ID */
async function fetchUser(id: number): Promise<User> {
  // ...
}
```
- **목적**: 간단한 코드는 주석 최소화, 가독성 유지

### 4.2 README 작성
- **내용**: 컴포넌트/모듈 설명, 사용 예시, prop 정의
- **예시**:
```markdown
# UserProfile Component
Displays user information.

## Props
- `name`: string - User's name
- `age`: number - User's age
```
- **목적**: 프로젝트 이해도 향상, 협업 지원

---

## 5. 디자인 시스템 - 레이아웃 템플릿 컨벤션

### 5.1 레이아웃 템플릿 사용 원칙

**목적**: 메인 콘텐츠 영역의 일관된 구조 제공

**기본 원칙**:
- 모든 페이지는 `ContentLayout` 컴포넌트를 사용하여 영역 분할
- 레이아웃 템플릿은 **구조만** 정의, 내부 콘텐츠는 자유
- 전역 레이아웃(Header, Sidebar)은 앱 레벨에서 설정

### 5.2 레이아웃 템플릿 타입 선택 가이드

```typescript
// 1. 비정형 페이지 (완전 자유 레이아웃)
type: 'single'
사용 케이스: 랜딩 페이지, 커스텀 디자인 페이지

// 2. Master-Detail 패턴
type: 'split-horizontal'
사용 케이스: 사용자 관리, 메일 클라이언트, 설정 페이지

// 3. 상하 분할
type: 'split-vertical'
사용 케이스: 에디터, 프리뷰 페이지

// 4. 대시보드
type: 'grid-2x2' | 'grid-3x3'
사용 케이스: 대시보드, 통계 페이지, 모니터링 화면

// 5. 3단 분할
type: 'three-column'
사용 케이스: 복잡한 데이터 표시, 다중 패널 인터페이스

// 6. 사이드바 + 메인
type: 'sidebar-content'
사용 케이스: 필터가 있는 목록 페이지, 검색 결과
```

### 5.3 컴포넌트 명명 규칙

**레이아웃 관련 컴포넌트**:
```typescript
// ✅ 권장
<ContentLayout>          // 레이아웃 템플릿 선택
<LayoutRegion>           // 분할된 영역

// ❌ 사용 금지
<MainLayout>             // 전역 레이아웃과 혼동
<GridLayout>             // 너무 일반적
<Container>              // 용도 불명확
```

### 5.4 Props 명명 규칙

```typescript
interface ContentLayoutProps {
  type: LayoutType          // 레이아웃 타입 (필수)
  ratio?: number[]          // 영역 비율 [3, 7]
  gap?: number              // 영역 간격 (px)
  children: React.ReactNode // 자식 컴포넌트
}

interface LayoutRegionProps {
  name?: string             // 영역 식별자 (선택)
  children: React.ReactNode
}
```

### 5.5 파일 구조 컨벤션

```
packages/ui/src/layout/
├─ ContentLayout.tsx       # 레이아웃 템플릿 메인 컴포넌트
├─ LayoutRegion.tsx        # 영역 컴포넌트
├─ types.ts                # 타입 정의
├─ styles.ts               # 공통 스타일
└─ index.ts                # Public API 내보내기
```

### 5.6 사용 예시 및 코드 스타일

**Good Examples**:

```typescript
// ✅ 명확한 레이아웃 구조
function UserManagementPage() {
  return (
    <ContentLayout type="split-horizontal" ratio={[3, 7]} gap={16}>
      <LayoutRegion name="list">
        <UserList />
      </LayoutRegion>
      <LayoutRegion name="detail">
        <UserDetail />
      </LayoutRegion>
    </ContentLayout>
  )
}

// ✅ 그리드 레이아웃 - 명확한 영역 이름
function DashboardPage() {
  return (
    <ContentLayout type="grid-2x2" gap={24}>
      <LayoutRegion name="statistics">
        <StatisticsWidget />
      </LayoutRegion>
      <LayoutRegion name="chart">
        <ChartWidget />
      </LayoutRegion>
      <LayoutRegion name="activity">
        <RecentActivity />
      </LayoutRegion>
      <LayoutRegion name="tasks">
        <TaskList />
      </LayoutRegion>
    </ContentLayout>
  )
}

// ✅ 비정형 레이아웃
function LandingPage() {
  return (
    <ContentLayout type="single">
      <LayoutRegion>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </LayoutRegion>
    </ContentLayout>
  )
}
```

**Bad Examples**:

```typescript
// ❌ 레이아웃 없이 직접 구성
function UserManagementPage() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 3 }}>
        <UserList />
      </div>
      <div style={{ flex: 7 }}>
        <UserDetail />
      </div>
    </div>
  )
}

// ❌ 레이아웃 템플릿 미사용
function DashboardPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}><Widget1 /></Grid>
      <Grid item xs={6}><Widget2 /></Grid>
      <Grid item xs={6}><Widget3 /></Grid>
      <Grid item xs={6}><Widget4 /></Grid>
    </Grid>
  )
}

// ❌ 영역 이름 없음 (가독성 저하)
function DataPage() {
  return (
    <ContentLayout type="split-horizontal">
      <LayoutRegion>
        <Component1 />
      </LayoutRegion>
      <LayoutRegion>
        <Component2 />
      </LayoutRegion>
    </ContentLayout>
  )
}
```

### 5.7 Import 문 정리

```typescript
// ✅ 권장 import 순서
// 1. React 및 내장 모듈
import React from 'react'

// 2. 외부 라이브러리
import { Box } from '@mui/material'

// 3. 공통 레이아웃 컴포넌트
import { ContentLayout, LayoutRegion } from '@workspace/ui/layout'

// 4. 로컬 컴포넌트
import { UserList } from './UserList'
import { UserDetail } from './UserDetail'
```

### 5.8 타입 정의 컨벤션

```typescript
// packages/ui/src/layout/types.ts

/** 레이아웃 템플릿 타입 */
export type LayoutType =
  | 'single'              // 단일 영역
  | 'split-horizontal'    // 좌우 분할
  | 'split-vertical'      // 상하 분할
  | 'grid-2x2'           // 2x2 그리드
  | 'grid-3x3'           // 3x3 그리드
  | 'three-column'       // 3단 분할
  | 'sidebar-content'    // 사이드바 + 메인

/** 레이아웃 Props */
export interface ContentLayoutProps {
  /** 레이아웃 타입 */
  type: LayoutType
  /** 영역 비율 (예: [3, 7]) */
  ratio?: number[]
  /** 영역 간격 (px) */
  gap?: number
  /** 자식 컴포넌트 */
  children: React.ReactNode
  /** CSS 클래스명 */
  className?: string
}

/** 영역 Props */
export interface LayoutRegionProps {
  /** 영역 식별자 */
  name?: string
  /** 자식 컴포넌트 */
  children: React.ReactNode
  /** CSS 클래스명 */
  className?: string
}
```

### 5.9 스타일 컨벤션

```typescript
// ✅ Styled Components 사용
import styled from 'styled-components'

export const StyledContentLayout = styled.div<{ $gap?: number }>`
  display: grid;
  gap: ${props => props.$gap || 16}px;
  width: 100%;
  height: 100%;
`

export const StyledLayoutRegion = styled.div`
  overflow: auto;
  background: var(--color-background);
  border-radius: var(--border-radius);
`

// ❌ 인라인 스타일 지양
<div style={{ display: 'grid', gap: '16px' }}>
```

### 5.10 접근성 (Accessibility) 가이드

```typescript
// ✅ semantic HTML 및 ARIA 속성 사용
function ContentLayout({ type, children }: ContentLayoutProps) {
  return (
    <main role="main" aria-label="Main Content">
      <div data-layout-type={type}>
        {children}
      </div>
    </main>
  )
}

function LayoutRegion({ name, children }: LayoutRegionProps) {
  return (
    <section aria-label={name}>
      {children}
    </section>
  )
}
```

### 5.11 테스트 컨벤션

```typescript
// ContentLayout.test.tsx
import { render, screen } from '@testing-library/react'
import { ContentLayout, LayoutRegion } from './ContentLayout'

describe('ContentLayout', () => {
  it('should render split-horizontal layout', () => {
    render(
      <ContentLayout type="split-horizontal">
        <LayoutRegion name="left">Left Content</LayoutRegion>
        <LayoutRegion name="right">Right Content</LayoutRegion>
      </ContentLayout>
    )

    expect(screen.getByText('Left Content')).toBeInTheDocument()
    expect(screen.getByText('Right Content')).toBeInTheDocument()
  })

  it('should apply gap prop', () => {
    const { container } = render(
      <ContentLayout type="grid-2x2" gap={24}>
        <LayoutRegion>Content</LayoutRegion>
      </ContentLayout>
    )

    expect(container.firstChild).toHaveStyle({ gap: '24px' })
  })
})
```

### 5.12 문서화 규칙

**컴포넌트 README 작성**:

```markdown
# ContentLayout

메인 콘텐츠 영역의 레이아웃 템플릿을 제공하는 컴포넌트

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| type | LayoutType | Yes | - | 레이아웃 타입 |
| ratio | number[] | No | - | 영역 비율 |
| gap | number | No | 16 | 영역 간격(px) |
| children | ReactNode | Yes | - | 자식 컴포넌트 |

## Usage

\`\`\`typescript
<ContentLayout type="split-horizontal" ratio={[3, 7]} gap={16}>
  <LayoutRegion name="list">
    <UserList />
  </LayoutRegion>
  <LayoutRegion name="detail">
    <UserDetail />
  </LayoutRegion>
</ContentLayout>
\`\`\`

## Layout Types

- `single`: 단일 영역 (자유 레이아웃)
- `split-horizontal`: 좌우 분할
- `split-vertical`: 상하 분할
- `grid-2x2`: 2x2 그리드
- `grid-3x3`: 3x3 그리드
- `three-column`: 3단 분할
- `sidebar-content`: 사이드바 + 메인
```

### 5.13 마이그레이션 가이드

**기존 코드를 레이아웃 템플릿으로 변환**:

```typescript
// Before (기존 방식)
function OldPage() {
  return (
    <div className="page-container">
      <div className="left-panel">
        <UserList />
      </div>
      <div className="right-panel">
        <UserDetail />
      </div>
    </div>
  )
}

// After (레이아웃 템플릿 사용)
function NewPage() {
  return (
    <ContentLayout type="split-horizontal" ratio={[3, 7]}>
      <LayoutRegion name="list">
        <UserList />
      </LayoutRegion>
      <LayoutRegion name="detail">
        <UserDetail />
      </LayoutRegion>
    </ContentLayout>
  )
}
```

### 5.14 베스트 프랙티스

**✅ Do**:
- 모든 페이지에 `ContentLayout` 사용
- 영역 이름(`name` prop) 명시적으로 지정
- 레이아웃 타입은 페이지 용도에 맞게 선택
- `gap` prop으로 일관된 간격 유지

**❌ Don't**:
- 레이아웃 템플릿 없이 직접 스타일링
- 중첩된 `ContentLayout` 사용
- 레이아웃 내부에서 전역 레이아웃 변경
- 과도한 커스터마이징 (템플릿이 맞지 않으면 `single` 타입 사용)
