# VII. Layout Architecture (레이아웃 아키텍처)

> 애플리케이션의 레이아웃 구조를 체계적으로 설계하고 관리하기 위한 가이드

## 목차
1. [레이아웃 계층 구조](#1-레이아웃-계층-구조)
2. [각 계층의 상세 설명](#2-각-계층의-상세-설명)
3. [실무 적용 예시](#3-실무-적용-예시)

---

## 1. 레이아웃 계층 구조

| 단계 | 용어 | 역할 및 의미 | 실무 평가 |
|------|------|-------------|-----------|
| 1 | 페이지 템플릿 (Page Template) | 페이지의 최상위 구조 (Header, Sidebar, Footer, Main Content)의 유무와 위치를 결정하는 뼈대 컴포넌트. | 정확 |
| 2 | 섹션 템플릿 (Section Template) | Main Content 내부를 도메인 특화 구조에 맞게 미리 정형화해 둔 구조 블록. (개발자가 행/열 분할 고민 없이 블록 선택) | 정확 |
| 3 | 컴포넌트 (Component) | 섹션 템플릿이 제공하는 슬롯에 삽입되는 실제 UI 요소 및 기능 단위 (Button, Card, Article, Profile 등). | 정확 |

---

## 2. 각 계층의 상세 설명

### 2.1 페이지 템플릿 (Page Template)

**정의:**
페이지의 최상위 구조를 결정하는 뼈대 컴포넌트로, Header, Sidebar, Footer, Main Content의 유무와 위치를 정의합니다.

**역할:**
- 전체 페이지 레이아웃의 골격 제공
- 전역 UI 요소(Header, Sidebar, Footer)의 배치 결정
- Main Content 영역 정의

**예시:**
```typescript
// 기본 페이지 템플릿
<PageTemplate>
  <Header />
  <Sidebar />
  <MainContent>
    {/* 여기에 섹션 템플릿 배치 */}
  </MainContent>
  <Footer />
</PageTemplate>

// 간소화된 페이지 템플릿 (Header만)
<PageTemplate variant="header-only">
  <Header />
  <MainContent>
    {/* 여기에 섹션 템플릿 배치 */}
  </MainContent>
</PageTemplate>
```

---

### 2.2 섹션 템플릿 (Section Template)

**정의:**
Main Content 내부를 도메인 특화 구조에 맞게 미리 정형화해 둔 구조 블록입니다.

**역할:**
- 개발자가 행/열 분할을 고민하지 않도록 사전 정의된 레이아웃 제공
- 도메인별 최적화된 구조 패턴 제공
- 일관된 UI/UX 경험 보장

**주요 섹션 템플릿 종류:**

#### 2.2.1 Master-Detail Layout (좌우 분할)
```typescript
<MasterDetailLayout ratio={[3, 7]}>
  <MasterPanel>
    <UserList />
  </MasterPanel>
  <DetailPanel>
    <UserDetail />
  </DetailPanel>
</MasterDetailLayout>
```

**사용 사례:**
- 목록 + 상세 페이지
- 폴더 탐색기 + 파일 내용
- 이메일 목록 + 이메일 내용

#### 2.2.2 Three Column Layout (3단 분할)
```typescript
<ThreeColumnLayout ratio={[2, 6, 2]}>
  <LeftPanel>
    <Navigation />
  </LeftPanel>
  <CenterPanel>
    <MainContent />
  </CenterPanel>
  <RightPanel>
    <Sidebar />
  </RightPanel>
</ThreeColumnLayout>
```

**사용 사례:**
- 대시보드 (네비게이션 + 메인 + 위젯)
- SNS 레이아웃 (메뉴 + 피드 + 추천)

#### 2.2.3 Grid Layout (그리드)
```typescript
<GridLayout columns={2} rows={2} gap={16}>
  <GridCell>
    <StatisticsCard />
  </GridCell>
  <GridCell>
    <ChartWidget />
  </GridCell>
  <GridCell>
    <RecentActivity />
  </GridCell>
  <GridCell>
    <QuickActions />
  </GridCell>
</GridLayout>
```

**사용 사례:**
- 대시보드
- 갤러리
- 위젯 배치

#### 2.2.4 Single Column Layout (단일 영역)
```typescript
<SingleColumnLayout maxWidth="1200px">
  <Article />
</SingleColumnLayout>
```

**사용 사례:**
- 블로그 포스트
- 문서 페이지
- 폼 페이지

---

### 2.3 컴포넌트 (Component)

**정의:**
섹션 템플릿이 제공하는 슬롯에 삽입되는 실제 UI 요소 및 기능 단위입니다.

**역할:**
- 실제 데이터 표시 및 사용자 상호작용 처리
- 재사용 가능한 최소 단위
- 비즈니스 로직 포함 가능

**예시:**
```typescript
// UI 컴포넌트
<Button variant="primary">저장</Button>
<Card title="통계">...</Card>
<DataTable data={users} />

// 도메인 컴포넌트
<UserProfile user={userData} />
<ProductCard product={productData} />
<OrderSummary order={orderData} />
```

---

## 3. 실무 적용 예시

### 3.1 사용자 관리 페이지

**계층 구조:**
```
페이지 템플릿 (PageTemplate)
  └─ Header
  └─ Sidebar
  └─ MainContent
      └─ 섹션 템플릿 (MasterDetailLayout)
          ├─ MasterPanel
          │   └─ 컴포넌트 (UserListTable)
          └─ DetailPanel
              └─ 컴포넌트 (UserDetailForm)
```

**코드 예시:**
```typescript
// pages/UserManagementPage.tsx
export function UserManagementPage() {
  return (
    <PageTemplate>
      <Header />
      <Sidebar />
      <MainContent>
        <MasterDetailLayout ratio={[4, 6]}>
          <MasterPanel>
            <UserListTable />
          </MasterPanel>
          <DetailPanel>
            <UserDetailForm />
          </DetailPanel>
        </MasterDetailLayout>
      </MainContent>
    </PageTemplate>
  )
}
```

---

### 3.2 대시보드 페이지

**계층 구조:**
```
페이지 템플릿 (PageTemplate)
  └─ Header
  └─ Sidebar
  └─ MainContent
      └─ 섹션 템플릿 (GridLayout)
          ├─ GridCell → 컴포넌트 (SalesChart)
          ├─ GridCell → 컴포넌트 (RevenueCard)
          ├─ GridCell → 컴포넌트 (UserStatsCard)
          └─ GridCell → 컴포넌트 (RecentOrdersList)
```

**코드 예시:**
```typescript
// pages/DashboardPage.tsx
export function DashboardPage() {
  return (
    <PageTemplate>
      <Header />
      <Sidebar />
      <MainContent>
        <GridLayout columns={2} rows={2} gap={24}>
          <GridCell>
            <SalesChart />
          </GridCell>
          <GridCell>
            <RevenueCard />
          </GridCell>
          <GridCell>
            <UserStatsCard />
          </GridCell>
          <GridCell>
            <RecentOrdersList />
          </GridCell>
        </GridLayout>
      </MainContent>
    </PageTemplate>
  )
}
```

---

### 3.3 데이터 허브 페이지 (3단 계층 구조)

**계층 구조:**
```
페이지 템플릿 (PageTemplate)
  └─ Header
  └─ Sidebar
  └─ MainContent
      └─ 섹션 템플릿 (ThreeColumnLayout)
          ├─ LeftPanel → 컴포넌트 (DataSourceList)
          ├─ CenterPanel → 컴포넌트 (CategoryTable)
          └─ RightPanel → 컴포넌트 (ResourceDetail)
```

**코드 예시:**
```typescript
// pages/DataHubPage.tsx
export function DataHubPage() {
  const [selectedDataSource, setSelectedDataSource] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <PageTemplate>
      <Header />
      <Sidebar />
      <MainContent>
        <ThreeColumnLayout ratio={[2, 5, 3]}>
          <LeftPanel>
            <DataSourceList
              onSelect={setSelectedDataSource}
              selected={selectedDataSource}
            />
          </LeftPanel>
          <CenterPanel>
            <CategoryTable
              dataSourceId={selectedDataSource?.id}
              onSelect={setSelectedCategory}
            />
          </CenterPanel>
          <RightPanel>
            <ResourceDetail
              categoryId={selectedCategory?.id}
            />
          </RightPanel>
        </ThreeColumnLayout>
      </MainContent>
    </PageTemplate>
  )
}
```

---

## 4. 구현 가이드

### 4.1 섹션 템플릿 구현 위치

```
packages/ui/src/layouts/
├── wireframes/              # 섹션 템플릿
│   ├── MasterDetailLayout.tsx
│   ├── ThreeColumnLayout.tsx
│   ├── GridLayout.tsx
│   └── SingleColumnLayout.tsx
├── page-templates/          # 페이지 템플릿
│   ├── PageTemplate.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
└── index.ts
```

---

## 5. 베스트 프랙티스

### 5.1 계층 분리 원칙

**✅ DO:**
- 페이지 템플릿: 전역 구조만 담당
- 섹션 템플릿: 영역 분할만 담당
- 컴포넌트: 실제 UI와 비즈니스 로직 담당

**❌ DON'T:**
- 페이지 템플릿에 비즈니스 로직 포함
- 섹션 템플릿에 데이터 페칭 로직 포함
- 컴포넌트에 레이아웃 구조 하드코딩

---

### 5.2 섹션 템플릿 선택 기준

| 화면 유형 | 추천 템플릿 | 이유 |
|-----------|-------------|------|
| 목록 + 상세 | MasterDetailLayout | 선택과 상세 보기의 자연스러운 흐름 |
| 대시보드 | GridLayout | 여러 위젯의 균형잡힌 배치 |
| 문서/폼 | SingleColumnLayout | 읽기 편한 너비 유지 |
| 복잡한 관리 화면 | ThreeColumnLayout | 다단계 네비게이션 지원 |

---

### 5.3 반응형 고려사항

```typescript
// 섹션 템플릿은 반응형을 기본 지원해야 함
<MasterDetailLayout
  ratio={[3, 7]}
  breakpoint="md"
  mobileLayout="stack"  // 모바일에서는 상하 배치
>
  <MasterPanel>...</MasterPanel>
  <DetailPanel>...</DetailPanel>
</MasterDetailLayout>
```

---

## 6. 관련 문서

- [02-project-structure.md](./02-project-structure.md) - FSD 아키텍처와의 관계
- [05-shared-modules-guide.md](./05-shared-modules-guide.md) - 공통 레이아웃 컴포넌트 개발

---

## 7. 요약

**레이아웃 아키텍처 3계층:**

1. **페이지 템플릿**: 전체 구조 (Header, Sidebar, Main, Footer)
2. **섹션 템플릿**: Main 내부 영역 분할 (좌우, 그리드, 단일 등)
3. **컴포넌트**: 실제 UI 요소 (Table, Card, Form 등)

이 구조를 따르면 일관성 있고 유지보수 가능한 레이아웃 시스템을 구축할 수 있습니다.
