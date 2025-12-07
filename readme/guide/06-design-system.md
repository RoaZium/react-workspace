# 디자인 시스템

> Material-UI (MUI) 기반의 일관된 UI 컴포넌트 시스템

## 목차

1. [디자인 토큰](#1-디자인-토큰)
2. [컬러 시스템](#2-컬러-시스템)
3. [타이포그래피](#3-타이포그래피)
4. [스페이싱](#4-스페이싱)
5. [기본 컴포넌트](#5-기본-컴포넌트)
6. [테마 설정](#6-테마-설정)

---

## 1. 디자인 토큰

### 1.1 개요

디자인 토큰은 색상, 간격, 글꼴 등 디자인 시스템의 최소 단위입니다.

**위치**: `packages/ui/src/theme/tokens.ts`

```typescript
export const tokens = {
  colors: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    // ...
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  // ...
}
```

---

## 2. 컬러 시스템

### 2.1 Primary Colors

**사용 시나리오**: 주요 액션, 링크, 활성 상태

```typescript
import { Box, Button } from '@mui/material'

export const Example = () => (
  <>
    <Button variant="contained" color="primary">
      Primary Button
    </Button>
    <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
      Primary Background
    </Box>
  </>
)
```

---

### 2.2 Secondary Colors

**사용 시나리오**: 부가 액션, 강조

```typescript
<Button variant="contained" color="secondary">
  Secondary Action
</Button>
```

---

### 2.3 Semantic Colors

**Success, Error, Warning, Info**

```typescript
import { Alert, Chip } from '@mui/material'

export const StatusIndicators = () => (
  <>
    <Alert severity="success">Operation successful!</Alert>
    <Alert severity="error">Error occurred!</Alert>
    <Alert severity="warning">Warning message</Alert>
    <Alert severity="info">Information</Alert>

    <Chip label="Success" color="success" />
    <Chip label="Error" color="error" />
  </>
)
```

---

### 2.4 Neutral Colors (Gray Scale)

```typescript
export const GrayScale = () => (
  <Box>
    <Box sx={{ bgcolor: 'grey.50', p: 2 }}>Grey 50 - 가장 밝음</Box>
    <Box sx={{ bgcolor: 'grey.100', p: 2 }}>Grey 100</Box>
    <Box sx={{ bgcolor: 'grey.200', p: 2 }}>Grey 200</Box>
    <Box sx={{ bgcolor: 'grey.300', p: 2 }}>Grey 300</Box>
    <Box sx={{ bgcolor: 'grey.400', p: 2 }}>Grey 400</Box>
    <Box sx={{ bgcolor: 'grey.500', p: 2 }}>Grey 500 - 중간</Box>
    <Box sx={{ bgcolor: 'grey.600', p: 2 }}>Grey 600</Box>
    <Box sx={{ bgcolor: 'grey.700', p: 2 }}>Grey 700</Box>
    <Box sx={{ bgcolor: 'grey.800', p: 2 }}>Grey 800</Box>
    <Box sx={{ bgcolor: 'grey.900', p: 2 }}>Grey 900 - 가장 어두움</Box>
  </Box>
)
```

**사용 가이드**:
- **배경**: grey.50, grey.100
- **구분선**: grey.300
- **비활성 텍스트**: grey.500
- **보조 텍스트**: grey.600, grey.700
- **주요 텍스트**: grey.900

---

## 3. 타이포그래피

### 3.1 글꼴 크기

```typescript
import { Typography } from '@mui/material'

export const TypographyExample = () => (
  <>
    <Typography variant="h1">Heading 1 - 96px</Typography>
    <Typography variant="h2">Heading 2 - 60px</Typography>
    <Typography variant="h3">Heading 3 - 48px</Typography>
    <Typography variant="h4">Heading 4 - 34px</Typography>
    <Typography variant="h5">Heading 5 - 24px</Typography>
    <Typography variant="h6">Heading 6 - 20px</Typography>

    <Typography variant="subtitle1">Subtitle 1 - 16px</Typography>
    <Typography variant="subtitle2">Subtitle 2 - 14px</Typography>

    <Typography variant="body1">Body 1 - 16px (기본 본문)</Typography>
    <Typography variant="body2">Body 2 - 14px (보조 본문)</Typography>

    <Typography variant="button">BUTTON TEXT - 14px</Typography>
    <Typography variant="caption">Caption text - 12px</Typography>
    <Typography variant="overline">OVERLINE TEXT - 12px</Typography>
  </>
)
```

---

### 3.2 글꼴 굵기

```typescript
<Typography fontWeight={300}>Light (300)</Typography>
<Typography fontWeight={400}>Regular (400) - 기본</Typography>
<Typography fontWeight={500}>Medium (500)</Typography>
<Typography fontWeight={700}>Bold (700)</Typography>
```

---

### 3.3 실용 예시

```typescript
export const UserProfile = ({ user }: { user: User }) => (
  <Box>
    <Typography variant="h5" fontWeight={700} gutterBottom>
      {user.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      {user.email}
    </Typography>
    <Typography variant="caption" color="text.disabled">
      Last login: {user.lastLogin}
    </Typography>
  </Box>
)
```

---

## 4. 스페이싱

### 4.1 간격 단위

MUI는 8px 기반 스페이싱 시스템을 사용합니다.

```typescript
// spacing(1) = 8px
// spacing(2) = 16px
// spacing(3) = 24px
// ...

<Box sx={{ p: 2 }}> {/* padding: 16px */}
<Box sx={{ m: 3 }}> {/* margin: 24px */}
<Box sx={{ px: 2, py: 1 }}> {/* paddingX: 16px, paddingY: 8px */}
```

---

### 4.2 간격 속성

```typescript
// Padding
<Box sx={{ p: 2 }}>       {/* padding: 16px (모든 방향) */}
<Box sx={{ px: 2 }}>      {/* paddingX: 16px (좌우) */}
<Box sx={{ py: 2 }}>      {/* paddingY: 16px (상하) */}
<Box sx={{ pt: 2 }}>      {/* paddingTop: 16px */}
<Box sx={{ pb: 2 }}>      {/* paddingBottom: 16px */}
<Box sx={{ pl: 2 }}>      {/* paddingLeft: 16px */}
<Box sx={{ pr: 2 }}>      {/* paddingRight: 16px */}

// Margin (동일한 패턴)
<Box sx={{ m: 2 }}>
<Box sx={{ mx: 2 }}>
<Box sx={{ my: 2 }}>
```

---

### 4.3 간격 가이드

| 용도 | 간격 | px |
|------|------|-----|
| 아주 작은 간격 (아이콘-텍스트) | `spacing(0.5)` | 4px |
| 작은 간격 (버튼 내부) | `spacing(1)` | 8px |
| 기본 간격 (카드 내부) | `spacing(2)` | 16px |
| 중간 간격 (섹션 간) | `spacing(3)` | 24px |
| 큰 간격 (페이지 여백) | `spacing(4)` | 32px |

---

## 5. 기본 컴포넌트

### 5.1 Button

```typescript
import { Button, Stack } from '@mui/material'

export const ButtonVariants = () => (
  <Stack direction="row" spacing={2}>
    {/* Variant */}
    <Button variant="contained">Contained</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="text">Text</Button>

    {/* Color */}
    <Button variant="contained" color="primary">Primary</Button>
    <Button variant="contained" color="secondary">Secondary</Button>
    <Button variant="contained" color="error">Error</Button>

    {/* Size */}
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>

    {/* State */}
    <Button disabled>Disabled</Button>
  </Stack>
)
```

**사용 가이드**:
- **Primary Action**: `variant="contained"`, `color="primary"`
- **Secondary Action**: `variant="outlined"`
- **Tertiary Action**: `variant="text"`

---

### 5.2 Card

```typescript
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'

export const UserCard = ({ user }: { user: User }) => (
  <Card>
    <CardHeader
      title={user.name}
      subheader={user.email}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {user.bio}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">View Profile</Button>
      <Button size="small">Message</Button>
    </CardActions>
  </Card>
)
```

---

### 5.3 TextField

```typescript
import { TextField, Stack } from '@mui/material'

export const FormExample = () => (
  <Stack spacing={2}>
    {/* Variant */}
    <TextField label="Outlined (기본)" variant="outlined" />
    <TextField label="Filled" variant="filled" />
    <TextField label="Standard" variant="standard" />

    {/* Type */}
    <TextField label="Email" type="email" />
    <TextField label="Password" type="password" />
    <TextField label="Number" type="number" />

    {/* State */}
    <TextField label="Required" required />
    <TextField label="Disabled" disabled />
    <TextField label="Error" error helperText="This field is required" />

    {/* Multiline */}
    <TextField label="Description" multiline rows={4} />
  </Stack>
)
```

---

### 5.4 Dialog (Modal)

```typescript
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

export const ConfirmDialog = ({ open, onClose, onConfirm }: Props) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Action</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to proceed?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} variant="contained" color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)
```

---

### 5.5 Snackbar (Toast)

```typescript
import { Snackbar, Alert } from '@mui/material'

export const NotificationExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Notification</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          Operation successful!
        </Alert>
      </Snackbar>
    </>
  )
}
```

---

### 5.6 Table

```typescript
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material'

export const UserTable = ({ users }: { users: User[] }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell align="right">
              <Button size="small">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
```

---

## 6. 테마 설정

### 6.1 테마 생성

**위치**: `packages/ui/src/theme/theme.ts`

```typescript
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none', // 버튼 텍스트 대문자 변환 비활성화
    },
  },
  spacing: 8, // 기본 간격 단위
  shape: {
    borderRadius: 8, // 기본 모서리 둥글기
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})
```

---

### 6.2 테마 적용

**위치**: `apps/data-platform/src/app/App.tsx`

```typescript
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@workspace/ui'

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* 브라우저 기본 스타일 초기화 */}
    <RouterProvider router={router} />
  </ThemeProvider>
)
```

---

### 6.3 다크 모드

```typescript
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMemo } from 'react'

export const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode colors
                primary: { main: '#1976d2' },
                background: { default: '#f5f5f5' },
              }
            : {
                // Dark mode colors
                primary: { main: '#90caf9' },
                background: { default: '#121212' },
              }),
        },
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </Button>
      {/* ... */}
    </ThemeProvider>
  )
}
```

---

### 6.4 테마 커스터마이징

```typescript
// 특정 컴포넌트 전역 스타일 오버라이드
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // 모든 버튼에 적용
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none', // Contained 버튼 그림자 제거
        },
      },
      defaultProps: {
        disableRipple: true, // 리플 효과 비활성화
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
})
```

---

## 7. 아이콘 사용

### 7.1 MUI Icons

```bash
# 설치
pnpm add @mui/icons-material
```

```typescript
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { Button, IconButton } from '@mui/material'

export const IconExamples = () => (
  <>
    {/* 버튼에 아이콘 */}
    <Button startIcon={<AddIcon />}>Add User</Button>
    <Button endIcon={<DeleteIcon />}>Delete</Button>

    {/* 아이콘 버튼 */}
    <IconButton color="primary">
      <EditIcon />
    </IconButton>

    {/* 아이콘 크기 */}
    <DeleteIcon fontSize="small" />
    <DeleteIcon fontSize="medium" />
    <DeleteIcon fontSize="large" />
  </>
)
```

---

## 8. 반응형 디자인

### 8.1 Breakpoints

```typescript
// theme.breakpoints.values
{
  xs: 0,     // 모바일
  sm: 600,   // 태블릿
  md: 900,   // 소형 노트북
  lg: 1200,  // 데스크톱
  xl: 1536,  // 대형 화면
}
```

---

### 8.2 반응형 스타일

```typescript
<Box
  sx={{
    width: {
      xs: '100%',   // 모바일: 전체 너비
      sm: '80%',    // 태블릿: 80%
      md: '60%',    // 데스크톱: 60%
    },
    padding: {
      xs: 1,        // 모바일: 8px
      sm: 2,        // 태블릿: 16px
      md: 3,        // 데스크톱: 24px
    },
  }}
>
  Responsive Box
</Box>
```

