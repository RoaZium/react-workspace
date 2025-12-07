# 스타일링 가이드

> MUI sx prop와 CSS Modules를 활용한 스타일링 방법

## 목차

1. [스타일링 방식 선택](#1-스타일링-방식-선택)
2. [MUI sx prop](#2-mui-sx-prop)
3. [MUI styled API](#3-mui-styled-api)
4. [CSS Modules](#4-css-modules)
5. [스타일 우선순위](#5-스타일-우선순위)
6. [실무 패턴](#6-실무-패턴)

---

## 1. 스타일링 방식 선택

### 1.1 방식별 비교

| 방식 | 사용 시나리오 | 장점 | 단점 |
|------|---------------|------|------|
| **sx prop** | 간단한 스타일, 인라인 조정 | 빠른 작성, TypeScript 지원 | 재사용 어려움 |
| **styled** | 재사용 가능한 컴포넌트 | 컴포넌트화, 테마 접근 | 보일러플레이트 |
| **CSS Modules** | 복잡한 스타일, 애니메이션 | CSS 문법, 격리 | 테마 통합 어려움 |

---

### 1.2 권장 가이드

```typescript
// ✅ 간단한 스타일 → sx prop
<Box sx={{ p: 2, bgcolor: 'primary.main' }}>Content</Box>

// ✅ 재사용 컴포넌트 → styled
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}))

// ✅ 복잡한 애니메이션 → CSS Modules
import styles from './Component.module.css'
<div className={styles.animated}>Content</div>
```

---

## 2. MUI sx prop

### 2.1 기본 사용

```typescript
import { Box } from '@mui/material'

export const Example = () => (
  <Box
    sx={{
      // Spacing
      p: 2,              // padding: theme.spacing(2) = 16px
      m: 1,              // margin: 8px
      px: 3,             // paddingX: 24px
      py: 2,             // paddingY: 16px

      // Size
      width: 300,
      height: '100%',
      minHeight: 400,

      // Color
      bgcolor: 'primary.main',
      color: 'text.primary',

      // Border
      border: 1,
      borderColor: 'divider',
      borderRadius: 2,

      // Typography
      fontSize: 14,
      fontWeight: 700,
      textAlign: 'center',
    }}
  >
    Content
  </Box>
)
```

---

### 2.2 테마 접근

```typescript
<Box
  sx={{
    // 테마 색상
    bgcolor: 'primary.main',
    color: 'primary.contrastText',

    // 테마 간격
    p: 2, // theme.spacing(2)

    // 테마 breakpoints
    display: { xs: 'block', md: 'flex' },

    // 테마 함수 접근
    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
  }}
/>
```

---

### 2.3 반응형 스타일

```typescript
<Box
  sx={{
    width: {
      xs: '100%',    // 0px ~
      sm: '80%',     // 600px ~
      md: '60%',     // 900px ~
      lg: '50%',     // 1200px ~
    },
    p: {
      xs: 2,         // 모바일: 16px
      md: 4,         // 데스크톱: 32px
    },
    display: {
      xs: 'block',   // 모바일: 세로
      md: 'flex',    // 데스크톱: 가로
    },
  }}
>
  Responsive Box
</Box>
```

---

### 2.4 Pseudo 선택자

```typescript
<Button
  sx={{
    // Hover
    '&:hover': {
      bgcolor: 'primary.dark',
      transform: 'scale(1.05)',
    },

    // Active
    '&:active': {
      transform: 'scale(0.95)',
    },

    // Disabled
    '&.Mui-disabled': {
      bgcolor: 'grey.300',
    },

    // Focus
    '&:focus': {
      outline: '2px solid',
      outlineColor: 'primary.main',
    },
  }}
>
  Styled Button
</Button>
```

---

### 2.5 중첩 선택자

```typescript
<Box
  sx={{
    '& .header': {
      fontWeight: 700,
      mb: 2,
    },
    '& .content': {
      color: 'text.secondary',
    },
    '& > div': {
      '&:not(:last-child)': {
        borderBottom: 1,
        borderColor: 'divider',
      },
    },
  }}
>
  <div className="header">Header</div>
  <div className="content">Content</div>
</Box>
```

---

## 3. MUI styled API

### 3.1 기본 사용

```typescript
import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],

  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

// 사용
export const Example = () => <StyledCard>Content</StyledCard>
```

---

### 3.2 Props 기반 스타일

```typescript
interface StyledButtonProps {
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const StyledButton = styled(Button)<StyledButtonProps>(({ theme, variant, fullWidth }) => ({
  borderRadius: 20,
  padding: theme.spacing(1, 3),
  width: fullWidth ? '100%' : 'auto',

  ...(variant === 'primary' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),

  ...(variant === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  }),
}))

// 사용
<StyledButton variant="primary" fullWidth>
  Click me
</StyledButton>
```

---

### 3.3 컴포넌트 확장

```typescript
// 기존 컴포넌트 확장
const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

// 확장된 컴포넌트 재확장
const LargePrimaryButton = styled(PrimaryButton)({
  fontSize: 18,
  padding: '12px 32px',
})
```

---

## 4. CSS Modules

### 4.1 기본 사용

**파일**: `Component.module.css`

```css
.container {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.card {
  background: white;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

**파일**: `Component.tsx`

```typescript
import styles from './Component.module.css'

export const Component = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Title</h1>
    <div className={styles.card}>Card Content</div>
  </div>
)
```

---

### 4.2 조건부 클래스

```typescript
import styles from './Button.module.css'
import clsx from 'clsx' // 또는 classnames 라이브러리

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button = ({ variant = 'primary', disabled }: ButtonProps) => (
  <button
    className={clsx(
      styles.button,
      styles[variant],
      disabled && styles.disabled
    )}
  >
    Click me
  </button>
)
```

**CSS**:
```css
.button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #1976d2;
  color: white;
}

.secondary {
  background-color: #9c27b0;
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

### 4.3 애니메이션

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated {
  animation: fadeIn 0.3s ease-in-out;
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

---

## 5. 스타일 우선순위

### 5.1 우선순위 순서

```
1. Inline styles (style prop)
2. sx prop
3. styled components
4. CSS Modules
5. Global CSS
```

---

### 5.2 Override 예시

```typescript
const StyledButton = styled(Button)({
  backgroundColor: 'blue', // 3순위
})

<StyledButton
  sx={{ backgroundColor: 'red' }} // 2순위 (이것이 적용됨)
  style={{ backgroundColor: 'green' }} // 1순위 (이것이 최종 적용)
>
  Button
</StyledButton>
```

---

## 6. 실무 패턴

### 6.1 카드 컴포넌트

```typescript
import { Card, CardContent, Typography, Box } from '@mui/material'

export const UserCard = ({ user }: { user: User }) => (
  <Card
    sx={{
      p: 2,
      borderRadius: 2,
      boxShadow: 2,
      transition: 'all 0.3s',
      '&:hover': {
        boxShadow: 4,
        transform: 'translateY(-4px)',
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box
        component="img"
        src={user.avatar}
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          mr: 2,
        }}
      />
      <Box>
        <Typography variant="h6" fontWeight={600}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
    </Box>
  </Card>
)
```

---

### 6.2 Glassmorphism 효과

```typescript
<Box
  sx={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: 2,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    p: 3,
  }}
>
  Glassmorphism Content
</Box>
```

---

### 6.3 그라데이션 배경

```typescript
<Box
  sx={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    p: 4,
    borderRadius: 2,
    color: 'white',
  }}
>
  Gradient Background
</Box>
```

---

### 6.4 Sticky Header

```typescript
<AppBar
  sx={{
    position: 'sticky',
    top: 0,
    zIndex: (theme) => theme.zIndex.appBar,
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  }}
>
  <Toolbar>Header</Toolbar>
</AppBar>
```

---

### 6.5 Truncate Text

```typescript
<Typography
  sx={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 200,
  }}
>
  This is a very long text that will be truncated with ellipsis
</Typography>

{/* 여러 줄 Truncate */}
<Typography
  sx={{
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }}
>
  Multi-line text truncation
</Typography>
```

---

### 6.6 스크롤바 스타일

```typescript
<Box
  sx={{
    height: 300,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'grey.200',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'grey.500',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: 'grey.600',
      },
    },
  }}
>
  Scrollable Content
</Box>
```

---

## 7. 성능 최적화

### 7.1 동적 스타일 최소화

```typescript
// ❌ Bad - 매 렌더마다 새 객체 생성
<Box sx={{ p: 2, bgcolor: 'primary.main' }}>Content</Box>

// ✅ Good - 상수로 분리
const boxStyles = { p: 2, bgcolor: 'primary.main' }
<Box sx={boxStyles}>Content</Box>

// ✅ Good - styled 사용
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
}))
```

---

### 7.2 조건부 스타일 최적화

```typescript
// ❌ Bad
<Box sx={{ bgcolor: isActive ? 'primary.main' : 'grey.300' }}>

// ✅ Good - useMemo
const boxSx = useMemo(
  () => ({ bgcolor: isActive ? 'primary.main' : 'grey.300' }),
  [isActive]
)
<Box sx={boxSx}>
```

---

- [MUI sx prop](https://mui.com/system/getting-started/the-sx-prop/)
- [MUI styled](https://mui.com/system/styled/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [CSS Tricks](https://css-tricks.com/)

---

