# 레이아웃 시스템

> 페이지 구조와 섹션 템플릿을 위한 레이아웃 패턴

## 목차

1. [레이아웃 개요](#1-레이아웃-개요)
2. [앱 레이아웃](#2-앱-레이아웃)
3. [페이지 레이아웃 패턴](#3-페이지-레이아웃-패턴)
4. [그리드 시스템](#4-그리드-시스템)
5. [반응형 레이아웃](#5-반응형-레이아웃)
6. [실무 예시](#6-실무-예시)

---

## 1. 레이아웃 개요

### 1.1 레이아웃 vs 디자인 시스템

| 구분 | 디자인 시스템 | 레이아웃 시스템 |
|------|---------------|-----------------|
| 목적 | 개별 UI 컴포넌트 (버튼, 카드 등) | 페이지 구조와 배치 |
| 범위 | 원자적 컴포넌트 | 템플릿, 섹션 구성 |
| 위치 | `shared/ui`, `packages/ui` | `widgets`, `pages` |
| 예시 | Button, TextField, Card | Header, Sidebar, PageLayout |

---

### 1.2 레이아웃 레이어

```
app/
  └─ layouts/           # 전역 레이아웃 (AppLayout)

widgets/
  ├─ header/           # 헤더
  ├─ sidebar/          # 사이드바
  └─ footer/           # 푸터

pages/
  └─ users/
      └─ UserListPage  # 페이지별 레이아웃 조합
```

---

## 2. 앱 레이아웃

### 2.1 기본 앱 레이아웃

**위치**: `src/app/layouts/AppLayout.tsx`

```typescript
import { Box } from '@mui/material'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
          <Outlet /> {/* 페이지 컨텐츠 */}
        </Box>
      </Box>
    </Box>
  )
}
```

**구조**:
```
┌─────────────────────────────────┐
│ Sidebar │ Header                │
│         ├───────────────────────┤
│         │                       │
│         │  Main Content         │
│         │  (Outlet)             │
│         │                       │
└─────────────────────────────────┘
```

---

### 2.2 Header Widget

**위치**: `src/widgets/header/ui/Header.tsx`

```typescript
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'

export const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Data Platform
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
```

---

### 2.3 Sidebar Widget

**위치**: `src/widgets/sidebar/ui/Sidebar.tsx`

```typescript
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

const DRAWER_WIDTH = 240

export const Sidebar = () => {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { label: 'Users', icon: <PeopleIcon />, path: '/users' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
```

---

## 3. 페이지 레이아웃 패턴

### 3.1 List 페이지 레이아웃

**패턴**: 헤더 + 필터 + 테이블 + 페이지네이션

```typescript
import { Box, Typography, Stack, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const UserListPage = () => {
  return (
    <Box>
      {/* 페이지 헤더 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Stack>

      {/* 필터 섹션 */}
      <Box mb={3}>
        <UserListFilters />
      </Box>

      {/* 테이블 */}
      <UserTable />

      {/* 페이지네이션 */}
      <Box mt={2}>
        <Pagination />
      </Box>
    </Box>
  )
}
```

**구조**:
```
┌─────────────────────────────────┐
│ Users                [+ Add]    │ ← 헤더
├─────────────────────────────────┤
│ [Filter] [Search] [Sort]        │ ← 필터
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │  Table Rows                 │ │ ← 테이블
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│        [< 1 2 3 >]              │ ← 페이지네이션
└─────────────────────────────────┘
```

---

### 3.2 Detail 페이지 레이아웃

**패턴**: 헤더 + 탭 + 컨텐츠

```typescript
import { Box, Typography, Tabs, Tab, Stack, Button } from '@mui/material'
import { useState } from 'react'

export const UserDetailPage = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box>
      {/* 페이지 헤더 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">User Details</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Edit</Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </Stack>

      {/* 탭 */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab label="Profile" />
        <Tab label="Activity" />
        <Tab label="Settings" />
      </Tabs>

      {/* 탭 컨텐츠 */}
      <Box>
        {activeTab === 0 && <UserProfileTab />}
        {activeTab === 1 && <UserActivityTab />}
        {activeTab === 2 && <UserSettingsTab />}
      </Box>
    </Box>
  )
}
```

**구조**:
```
┌─────────────────────────────────┐
│ User Details      [Edit][Delete]│ ← 헤더
├─────────────────────────────────┤
│ [Profile] [Activity] [Settings] │ ← 탭
├─────────────────────────────────┤
│                                 │
│   Tab Content                   │ ← 컨텐츠
│                                 │
└─────────────────────────────────┘
```

---

### 3.3 Form 페이지 레이아웃

**패턴**: 헤더 + 폼 섹션 + 액션 버튼

```typescript
import { Box, Typography, Stack, Button, Divider } from '@mui/material'

export const UserCreatePage = () => {
  return (
    <Box>
      {/* 페이지 헤더 */}
      <Typography variant="h4" mb={3}>
        Create User
      </Typography>

      {/* 폼 섹션 1 */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          Basic Information
        </Typography>
        <Stack spacing={2}>
          <TextField label="Name" fullWidth />
          <TextField label="Email" fullWidth />
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 폼 섹션 2 */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          Additional Details
        </Typography>
        <Stack spacing={2}>
          <TextField label="Phone" fullWidth />
          <TextField label="Address" fullWidth multiline rows={3} />
        </Stack>
      </Box>

      {/* 액션 버튼 */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Create User</Button>
      </Stack>
    </Box>
  )
}
```

**구조**:
```
┌─────────────────────────────────┐
│ Create User                     │ ← 헤더
├─────────────────────────────────┤
│ Basic Information               │
│ [Name]                          │
│ [Email]                         │
├─────────────────────────────────┤
│ Additional Details              │
│ [Phone]                         │
│ [Address]                       │
├─────────────────────────────────┤
│              [Cancel] [Create]  │ ← 액션
└─────────────────────────────────┘
```

---

### 3.4 Dashboard 페이지 레이아웃

**패턴**: 헤더 + 통계 카드 그리드 + 차트

```typescript
import { Box, Typography, Grid } from '@mui/material'

export const DashboardPage = () => {
  return (
    <Box>
      {/* 페이지 헤더 */}
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      {/* 통계 카드 그리드 */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value="1,234" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active" value="892" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Revenue" value="$12,345" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Growth" value="+12%" />
        </Grid>
      </Grid>

      {/* 차트 섹션 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieChart />
        </Grid>
      </Grid>
    </Box>
  )
}
```

**구조**:
```
┌─────────────────────────────────┐
│ Dashboard                       │
├─────────────────────────────────┤
│ [Stat1] [Stat2] [Stat3] [Stat4] │
├─────────────────────────────────┤
│ ┌──────────────┐ ┌────────────┐ │
│ │              │ │            │ │
│ │  Line Chart  │ │ Pie Chart  │ │
│ │              │ │            │ │
│ └──────────────┘ └────────────┘ │
└─────────────────────────────────┘
```

---

## 4. 그리드 시스템

### 4.1 MUI Grid 기본

```typescript
import { Grid } from '@mui/material'

export const GridExample = () => (
  <Grid container spacing={2}>
    {/* 12 컬럼 시스템 */}
    <Grid item xs={12}>
      {/* 모바일: 전체 너비 */}
      Full width
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      {/* 모바일: 12/12, 태블릿: 6/12, 데스크톱: 4/12 */}
      Responsive column
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      Column 2
    </Grid>
    <Grid item xs={12} sm={12} md={4}>
      Column 3
    </Grid>
  </Grid>
)
```

---

### 4.2 카드 그리드

```typescript
export const ProductGrid = ({ products }: { products: Product[] }) => (
  <Grid container spacing={3}>
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
)
```

**반응형 동작**:
- **Mobile (xs)**: 1열 (12/12)
- **Tablet (sm)**: 2열 (6/12)
- **Desktop (md)**: 3열 (4/12)
- **Large (lg)**: 4열 (3/12)

---

## 5. 반응형 레이아웃

### 5.1 반응형 Sidebar

```typescript
export const ResponsiveSidebar = () => {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  if (isMobile) {
    // 모바일: Temporary Drawer
    return (
      <Drawer open={open} onClose={() => setOpen(false)}>
        <SidebarContent />
      </Drawer>
    )
  }

  // 데스크톱: Permanent Drawer
  return (
    <Drawer variant="permanent">
      <SidebarContent />
    </Drawer>
  )
}
```

---

### 5.2 반응형 간격

```typescript
<Box
  sx={{
    p: { xs: 2, sm: 3, md: 4 }, // 모바일 16px, 태블릿 24px, 데스크톱 32px
  }}
>
  Responsive padding
</Box>
```

---

### 5.3 반응형 방향

```typescript
<Stack
  direction={{ xs: 'column', sm: 'row' }} // 모바일: 세로, 태블릿+: 가로
  spacing={2}
>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Stack>
```

---

## 6. 실무 예시

### 6.1 완전한 페이지 예시

**위치**: `src/pages/users/UserListPage.tsx`

```typescript
import { Box, Typography, Stack, Button, TextField, InputAdornment } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { UserTable } from '@/entities/user'
import { useState } from 'react'

export const UserListPage = () => {
  const [search, setSearch] = useState('')

  return (
    <Box>
      {/* 페이지 헤더 */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />} fullWidth={{ xs: true, sm: false }}>
          Add User
        </Button>
      </Stack>

      {/* 검색 */}
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 테이블 */}
      <UserTable search={search} />
    </Box>
  )
}
```

---

### 6.2 Two Column 레이아웃

```typescript
export const SettingsPage = () => (
  <Grid container spacing={3}>
    {/* 왼쪽: 메뉴 */}
    <Grid item xs={12} md={3}>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem>Profile</ListItem>
          <ListItem>Security</ListItem>
          <ListItem>Notifications</ListItem>
        </List>
      </Paper>
    </Grid>

    {/* 오른쪽: 컨텐츠 */}
    <Grid item xs={12} md={9}>
      <Paper sx={{ p: 3 }}>
        <SettingsContent />
      </Paper>
    </Grid>
  </Grid>
)
```

**구조**:
```
Desktop:
┌──────┬────────────────┐
│ Menu │   Content      │
│      │                │
└──────┴────────────────┘

Mobile:
┌──────────────────────┐
│ Menu                 │
├──────────────────────┤
│ Content              │
└──────────────────────┘
```

---

## 7. Container 사용

### 7.1 Container 컴포넌트

```typescript
import { Container } from '@mui/material'

export const PageWithContainer = () => (
  <Container maxWidth="lg"> {/* lg: 1200px */}
    <Typography variant="h4">Contained Content</Typography>
  </Container>
)
```

**maxWidth 옵션**:
- `xs`: 444px
- `sm`: 600px
- `md`: 900px
- `lg`: 1200px
- `xl`: 1536px
- `false`: 제한 없음

---

- [MUI Layout](https://mui.com/material-ui/react-box/)
- [MUI Grid](https://mui.com/material-ui/react-grid/)
- [MUI Container](https://mui.com/material-ui/react-container/)
- [MUI Stack](https://mui.com/material-ui/react-stack/)

---

