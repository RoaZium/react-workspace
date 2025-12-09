# Material Design 3 디자인 가이드

## 개요

data-platform은 Material Design 3 (MD3) 디자인 시스템을 기반으로 일관된 UI/UX를 제공합니다.

## 핵심 원칙

### 1. 색상 시스템

#### 라이트 모드
- **Primary**: `#1976d2` (Blue)
- **Secondary**: `#dc004e` (Pink)
- **Background**: `#fafafa` (Light Gray)
- **Surface**: `#ffffff` (White)

#### 다크 모드
- **Primary**: `#A8C7FA` (Light Blue)
- **Secondary**: `#F9A825` (Amber)
- **Background**: `#1a1c1e` (Dark Gray)
- **Surface**: `#1f2124` (Slightly Lighter Dark)

### 2. Typography

MD3는 Roboto 폰트를 기본으로 사용하며, 다음 스케일을 따릅니다:

- **H1**: 2rem (32px), weight 600
- **H2**: 1.75rem (28px), weight 600
- **H3**: 1.5rem (24px), weight 600
- **H4**: 1.25rem (20px), weight 600
- **H5**: 1.125rem (18px), weight 600
- **H6**: 1rem (16px), weight 600
- **Body1**: 1rem (16px), line-height 1.5
- **Body2**: 0.875rem (14px), line-height 1.43

### 3. Spacing

MD3는 8px 기반 그리드 시스템을 사용합니다:

- **small**: 16px (2 units)
- **medium**: 24px (3 units)
- **large**: 32px (4 units)

### 4. Shape & Elevation

#### Border Radius
- **Card/Paper**: 12px
- **Button**: 20px (pill-shaped)
- **Chip**: 8px

#### Elevation
MD3는 최소한의 그림자를 사용합니다:
- **Level 1**: `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)`

## 아이콘 사용 가이드

### ✅ 아이콘을 사용해야 할 곳

1. **네비게이션**
   - 상단 메뉴
   - 사이드바 메뉴
   ```tsx
   <DashboardIcon /> 데이터 허브
   ```

2. **주요 액션 버튼**
   - CTA(Call-to-Action) 버튼
   - 폼 제출 버튼
   ```tsx
   <Button startIcon={<AddIcon />}>추가</Button>
   ```

3. **상태 표시**
   - 성공/에러 메시지
   - 진행 상태
   ```tsx
   <CheckCircleIcon color="success" />
   ```

4. **통계 카드**
   - 지표를 나타내는 아이콘
   ```tsx
   <StatCard icon={<FolderOpenIcon />} value="24" label="DataSource" />
   ```

### ❌ 아이콘을 피해야 할 곳

1. **텍스트만으로 충분한 곳**
   - 페이지 제목: ~~"📊 데이터 허브"~~ → "데이터 허브"
   - 본문 내용

2. **장식용 아이콘**
   - 의미 없는 장식
   - 이모지 남용

3. **과도한 사용**
   - 모든 텍스트 앞에 아이콘
   - 중복된 의미 전달

### 권장 사항

1. **MUI Icons 사용**: 이모지 대신 Material UI Icons 사용
   ```tsx
   // ❌ Bad
   icon="📊"

   // ✅ Good
   icon={<DashboardIcon />}
   ```

2. **의미 있는 아이콘**: 아이콘은 기능을 명확히 전달해야 함
   ```tsx
   // ✅ 검색 버튼
   <IconButton><SearchIcon /></IconButton>

   // ✅ 삭제 버튼
   <IconButton><DeleteIcon /></IconButton>
   ```

3. **일관성**: 같은 기능에는 같은 아이콘 사용
   - 추가: `<AddIcon />`
   - 편집: `<EditIcon />`
   - 삭제: `<DeleteIcon />`
   - 검색: `<SearchIcon />`

## 컴포넌트 가이드

### Page Layout

```tsx
import { PageLayout, PageHeader, PageContent } from '@workspace/ui'

function MyPage() {
  return (
    <PageLayout>
      <PageHeader
        title="페이지 제목"
        description="페이지 설명"
        actions={<Button>액션</Button>}
      />
      <PageContent>
        {/* 페이지 내용 */}
      </PageContent>
    </PageLayout>
  )
}
```

### Card

```tsx
import { Card } from '@workspace/ui'

// 기본 카드
<Card>
  <Typography>내용</Typography>
</Card>

// 제목이 있는 카드
<Card title="카드 제목">
  <Typography>내용</Typography>
</Card>

// StatCard
<StatCard
  icon={<FolderOpenIcon />}
  value="24"
  label="DataSource"
  trend={{ value: '+3', isPositive: true }}
/>
```

### Grid Layout

```tsx
import { GridLayout } from '@workspace/ui'

<GridLayout columns={4} gap="medium">
  <StatCard />
  <StatCard />
  <StatCard />
  <StatCard />
</GridLayout>
```

### Button

```tsx
// Primary action
<Button variant="contained">확인</Button>

// Secondary action
<Button variant="outlined">취소</Button>

// With icon
<Button variant="contained" startIcon={<AddIcon />}>
  추가
</Button>
```

## 레이아웃 패턴

### 1. Dashboard 레이아웃
- 상단: 통계 카드 그리드 (4열)
- 중간: 주요 정보 카드
- 하단: 상세 정보 그리드 (2열)

### 2. Master-Detail 레이아웃
- 왼쪽 (30%): 목록
- 오른쪽 (70%): 상세 정보

### 3. Three-Column 레이아웃
- 왼쪽 (20%): 트리/네비게이션
- 중간 (30%): 목록
- 오른쪽 (50%): 상세 정보

## 테마 적용

테마는 `packages/ui/src/providers/MuiThemeProvider.tsx`에서 중앙 관리됩니다.

```tsx
import { MuiThemeProvider } from '@workspace/ui'

function App() {
  return (
    <MuiThemeProvider>
      {/* 앱 내용 */}
    </MuiThemeProvider>
  )
}
```

## 참고 자료

- [Material Design 3](https://m3.material.io/)
- [MUI Documentation](https://mui.com/)
- [Material Icons](https://mui.com/material-ui/material-icons/)
