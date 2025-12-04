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

**공통 구조 원칙:**
모든 섹션 템플릿은 다음 구조를 따릅니다:
1. **SectionTitle (공통)**: 섹션 타이틀 및 메타 정보
2. **용도별 슬롯**: 각 템플릿의 특성에 맞는 의미 있는 슬롯 (위치 기반이 아닌 용도 기반)

**디자인 스펙 (현대적 스타일):**
- 패딩: 12px (컴팩트하고 효율적)
- 간격: 12px
- 타이틀 폰트: 15px, semibold
- 보조 텍스트: 13px
- **그림자**: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` (미묘한 그림자)
- **border-radius**: 4px
- **배경색**:
  - 페이지 배경: `#f9fafb` (라이트) / `#111827` (다크)
  - 섹션 배경: `#ffffff` (라이트) / `#1f2937` (다크)

**주요 섹션 템플릿 종류:**

#### 2.2.1 Master-Detail Section (마스터-디테일)
```typescript
<MasterDetailSection ratio={[3, 7]} gap={1.5}>
  <MasterDetailSection.Title count={10}>사용자 관리</MasterDetailSection.Title>
  <MasterDetailSection.MasterPanel>
    <UserList />
  </MasterDetailSection.MasterPanel>
  <MasterDetailSection.DetailPanel>
    <UserDetail />
  </MasterDetailSection.DetailPanel>
</MasterDetailSection>
```

**슬롯 구조:**
- `Title`: 섹션 타이틀 (공통, 옵션: count)
- `MasterPanel`: 목록/선택 영역 (용도별)
- `DetailPanel`: 상세 정보 영역 (용도별)

**사용 사례:**
- 목록 + 상세 페이지
- 폴더 탐색기 + 파일 내용
- 이메일 목록 + 이메일 내용

#### 2.2.2 Three Column Section (3단 컬럼)
```typescript
<ThreeColumnSection ratio={[2, 6, 2]} gap={1.5}>
  <ThreeColumnSection.Title>데이터 허브</ThreeColumnSection.Title>
  <ThreeColumnSection.NavigationPanel>
    <DataSourceNav />
  </ThreeColumnSection.NavigationPanel>
  <ThreeColumnSection.MainPanel>
    <CategoryTable />
  </ThreeColumnSection.MainPanel>
  <ThreeColumnSection.WidgetPanel>
    <ResourceInfo />
  </ThreeColumnSection.WidgetPanel>
</ThreeColumnSection>
```

**슬롯 구조:**
- `Title`: 섹션 타이틀 (공통)
- `NavigationPanel`: 네비게이션 영역 (용도별)
- `MainPanel`: 메인 콘텐츠 영역 (용도별)
- `WidgetPanel`: 위젯/부가 정보 영역 (용도별)

**사용 사례:**
- 대시보드 (네비게이션 + 메인 + 위젯)
- SNS 레이아웃 (메뉴 + 피드 + 추천)
- 복잡한 데이터 관리 화면

#### 2.2.3 Grid Section (그리드)
```typescript
<GridSection columns={2} gap={1.5}>
  <GridSection.Title count={4}>대시보드 위젯</GridSection.Title>
  <GridSection.Item role="statistic">
    <SalesCard />
  </GridSection.Item>
  <GridSection.Item role="chart">
    <RevenueChart />
  </GridSection.Item>
  <GridSection.Item role="info">
    <UserStats />
  </GridSection.Item>
  <GridSection.Item role="action">
    <QuickActions />
  </GridSection.Item>
</GridSection>
```

**슬롯 구조:**
- `Title`: 섹션 타이틀 (공통)
- `Item`: 그리드 아이템 (role로 용도 구분: 'statistic' | 'chart' | 'action' | 'info')

**사용 사례:**
- 대시보드
- 갤러리
- 위젯 배치

#### 2.2.4 Single Column Section (단일 컬럼)
```typescript
<SingleColumnSection maxWidth="800px">
  <SingleColumnSection.Title subtitle="2024-12-04">블로그 포스트</SingleColumnSection.Title>
  <SingleColumnSection.Content type="article">
    <ArticleBody />
  </SingleColumnSection.Content>
</SingleColumnSection>
```

**슬롯 구조:**
- `Title`: 섹션 타이틀 (공통, 옵션: subtitle)
- `Content`: 콘텐츠 영역 (type으로 용도 구분: 'article' | 'form' | 'document')

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
      └─ 섹션 템플릿 (MasterDetailSection)
          ├─ Title (공통)
          ├─ MasterPanel (용도별)
          │   └─ 컴포넌트 (UserListTable)
          └─ DetailPanel (용도별)
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
        <MasterDetailSection ratio={[4, 6]} gap={1.5}>
          <MasterDetailSection.Title count={25}>사용자 관리</MasterDetailSection.Title>
          <MasterDetailSection.MasterPanel>
            <UserListTable />
          </MasterDetailSection.MasterPanel>
          <MasterDetailSection.DetailPanel>
            <UserDetailForm />
          </MasterDetailSection.DetailPanel>
        </MasterDetailSection>
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
      └─ 섹션 템플릿 (GridSection)
          ├─ Title (공통)
          ├─ GridItem (chart) → 컴포넌트 (SalesChart)
          ├─ GridItem (statistic) → 컴포넌트 (RevenueCard)
          ├─ GridItem (info) → 컴포넌트 (UserStatsCard)
          └─ GridItem (action) → 컴포넌트 (QuickActions)
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
        <GridSection columns={2} gap={1.5}>
          <GridSection.Title count={4}>대시보드</GridSection.Title>
          <GridSection.Item role="chart">
            <SalesChart />
          </GridSection.Item>
          <GridSection.Item role="statistic">
            <RevenueCard />
          </GridSection.Item>
          <GridSection.Item role="info">
            <UserStatsCard />
          </GridSection.Item>
          <GridSection.Item role="action">
            <QuickActions />
          </GridSection.Item>
        </GridSection>
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
      └─ 섹션 템플릿 (ThreeColumnSection)
          ├─ Title (공통)
          ├─ NavigationPanel (용도별) → 컴포넌트 (DataSourceList)
          ├─ MainPanel (용도별) → 컴포넌트 (CategoryTable)
          └─ WidgetPanel (용도별) → 컴포넌트 (ResourceDetail)
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
        <ThreeColumnSection ratio={[2, 5, 3]} gap={1.5}>
          <ThreeColumnSection.Title>데이터 허브</ThreeColumnSection.Title>
          <ThreeColumnSection.NavigationPanel>
            <DataSourceList
              onSelect={setSelectedDataSource}
              selected={selectedDataSource}
            />
          </ThreeColumnSection.NavigationPanel>
          <ThreeColumnSection.MainPanel>
            <CategoryTable
              dataSourceId={selectedDataSource?.id}
              onSelect={setSelectedCategory}
            />
          </ThreeColumnSection.MainPanel>
          <ThreeColumnSection.WidgetPanel>
            <ResourceDetail
              categoryId={selectedCategory?.id}
            />
          </ThreeColumnSection.WidgetPanel>
        </ThreeColumnSection>
      </MainContent>
    </PageTemplate>
  )
}
```

---

## 4. 구현 가이드

### 4.1 섹션 템플릿 구현 위치

```
packages/ui/src/shared/ui/layouts/
├── section/                      # 섹션 템플릿 (NEW)
│   ├── MasterDetailSection.tsx   # 마스터-디테일 섹션
│   ├── ThreeColumnSection.tsx    # 3단 컬럼 섹션
│   ├── GridSection.tsx           # 그리드 섹션
│   ├── SingleColumnSection.tsx   # 단일 컬럼 섹션
│   └── index.ts
├── page/                         # 페이지 템플릿
│   ├── PageTemplate.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
└── index.ts
```

### 4.2 디자인 토큰

```css
/* 섹션 템플릿 스타일 가이드 - 현대적 스타일 */
:root {
  /* Spacing - 컴팩트 디자인 */
  --section-padding: 12px;        /* 섹션 내부 패딩 */
  --section-gap: 12px;            /* 섹션 간 간격 */
  --section-title-gap: 12px;      /* 타이틀 하단 간격 */

  /* Typography */
  --section-title-size: 0.9375rem;  /* 15px */
  --section-title-weight: 600;      /* semibold */
  --section-caption-size: 0.8125rem; /* 13px */

  /* Border & Shadow */
  --section-border-radius: 4px;
  --section-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  /* Background */
  --page-bg-light: #f9fafb;
  --section-bg-light: #ffffff;
  --page-bg-dark: #111827;
  --section-bg-dark: #1f2937;
}
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

| 화면 유형 | 추천 템플릿 | 슬롯 구성 | 이유 |
|-----------|-------------|-----------|------|
| 목록 + 상세 | MasterDetailSection | Title + MasterPanel + DetailPanel | 선택과 상세 보기의 자연스러운 흐름 |
| 대시보드 | GridSection | Title + Item (role별) | 여러 위젯의 균형잡힌 배치 |
| 문서/폼 | SingleColumnSection | Title + Content (type별) | 읽기 편한 너비 유지 |
| 복잡한 관리 화면 | ThreeColumnSection | Title + NavigationPanel + MainPanel + WidgetPanel | 다단계 네비게이션 지원 |

---

### 5.3 반응형 고려사항

```typescript
// 섹션 템플릿은 반응형을 기본 지원해야 함
<MasterDetailSection
  ratio={[3, 7]}
  gap={1.5}
  breakpoint="md"
  mobileLayout="stack"  // 모바일에서는 상하 배치
>
  <MasterDetailSection.Title count={10}>사용자 관리</MasterDetailSection.Title>
  <MasterDetailSection.MasterPanel>...</MasterDetailSection.MasterPanel>
  <MasterDetailSection.DetailPanel>...</MasterDetailSection.DetailPanel>
</MasterDetailSection>
```

---

## 6. 관련 문서

- [02-project-structure.md](./02-project-structure.md) - FSD 아키텍처와의 관계
- [05-shared-modules-guide.md](./05-shared-modules-guide.md) - 공통 레이아웃 컴포넌트 개발

---

## 7. 요약

**레이아웃 아키텍처 3계층:**

1. **페이지 템플릿**: 전체 구조 (Header, Sidebar, Main, Footer)
2. **섹션 템플릿**: Main 내부 영역 분할
   - **공통**: SectionTitle (타이틀 + 메타 정보)
   - **용도별**: 각 템플릿 특성에 맞는 슬롯 (MasterPanel, NavigationPanel 등)
3. **컴포넌트**: 실제 UI 요소 (Table, Card, Form 등)

**디자인 원칙 (현대적 스타일):**
- 패딩: 12px (컴팩트)
- 간격: 12px
- 타이틀: 15px semibold
- 보조 텍스트: 13px
- **그림자**: 미묘한 shadow (Tailwind CSS shadow-sm 스타일)
- **border-radius**: 4px
- **배경색**: 페이지 `#f9fafb` / 섹션 `#ffffff` (라이트 모드)

**4가지 섹션 템플릿:**
1. **MasterDetailSection**: 목록 + 상세 (Title + MasterPanel + DetailPanel)
2. **ThreeColumnSection**: 3단 분할 (Title + NavigationPanel + MainPanel + WidgetPanel)
3. **GridSection**: 그리드 배치 (Title + Item with role)
4. **SingleColumnSection**: 단일 영역 (Title + Content with type)

이 구조를 따르면 일관성 있고 유지보수 가능한 레이아웃 시스템을 구축할 수 있습니다.
