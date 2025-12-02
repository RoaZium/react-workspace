# 테마 기능 사용 가이드

다크/라이트 테마 전환 기능이 구현되었습니다.

## 설치 및 설정

### 1. ThemeProvider로 앱 감싸기

애플리케이션의 최상위 컴포넌트를 `ThemeProvider`로 감싸주세요:

```tsx
import { ThemeProvider } from '@workspace/ui'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      {/* 나머지 앱 컴포넌트 */}
    </ThemeProvider>
  )
}
```

**Props:**
- `defaultTheme` (선택): 기본 테마 ('light' | 'dark'), 기본값: 'light'
- `storageKey` (선택): localStorage 키 이름, 기본값: 'ui-theme'

### 2. 테마 토글 버튼 추가

원하는 위치에 테마 토글 버튼을 추가하세요:

```tsx
import { ThemeToggle } from '@workspace/ui'

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  )
}
```

### 3. BasicLayout 사용 예시

```tsx
import { BasicLayout, ThemeToggle } from '@workspace/ui'

function MyPage() {
  return (
    <BasicLayout>
      <BasicLayout.Section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>페이지 제목</h1>
          <ThemeToggle />
        </div>
        <p>페이지 내용</p>
      </BasicLayout.Section>
    </BasicLayout>
  )
}
```

## 프로그래밍 방식으로 테마 제어

`useTheme` 훅을 사용하여 테마를 프로그래밍 방식으로 제어할 수 있습니다:

```tsx
import { useTheme } from '@workspace/ui'

function CustomThemeControl() {
  const { theme, toggleTheme, setTheme } = useTheme()

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>테마 전환</button>
      <button onClick={() => setTheme('light')}>라이트 모드</button>
      <button onClick={() => setTheme('dark')}>다크 모드</button>
    </div>
  )
}
```

## 사용 가능한 CSS 변수

테마 시스템은 CSS 변수를 사용하므로 커스텀 컴포넌트에서도 쉽게 사용할 수 있습니다:

### 배경색
- `--bg-primary`: 주요 배경색
- `--bg-secondary`: 보조 배경색
- `--bg-tertiary`: 3차 배경색

### 텍스트 색상
- `--text-primary`: 주요 텍스트 색상
- `--text-secondary`: 보조 텍스트 색상
- `--text-tertiary`: 3차 텍스트 색상

### 테두리
- `--border-color`: 기본 테두리 색상
- `--border-hover`: 호버 시 테두리 색상

### 카드
- `--card-bg`: 카드 배경색
- `--card-border`: 카드 테두리 색상

### 버튼
- `--button-bg`: 버튼 배경색
- `--button-hover`: 버튼 호버 배경색
- `--button-active`: 버튼 활성화 배경색

### 그림자
- `--shadow-sm`: 작은 그림자
- `--shadow-md`: 중간 그림자
- `--shadow-lg`: 큰 그림자

## 커스텀 컴포넌트에서 테마 사용

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.my-component:hover {
  border-color: var(--border-hover);
}
```

## 특징

- ✅ LocalStorage에 테마 설정 자동 저장
- ✅ 부드러운 전환 애니메이션
- ✅ TypeScript 완전 지원
- ✅ CSS 변수 기반으로 확장 용이
- ✅ 접근성 고려 (aria-label)
