# React Workspace - 개발 가이드

> Monorepo 기반 React + TypeScript 프로젝트 개발 표준 문서

## 📋 프로젝트 개요

이 프로젝트는 **pnpm workspace**와 **Turborepo**를 활용한 Monorepo 구조로, 여러 React 애플리케이션과 공통 패키지를 효율적으로 관리합니다.

### 기술 스택

- **프레임워크**: React 18
- **언어**: TypeScript 5
- **빌드 도구**: Vite 5
- **패키지 매니저**: pnpm 9
- **Monorepo**: Turborepo
- **UI 라이브러리**: Material-UI (MUI)
- **상태 관리**: Zustand
- **데이터 페칭**: React Query (TanStack Query)
- **라우팅**: React Router v6
- **테스팅**: Vitest, React Testing Library
- **스타일링**: CSS Modules, MUI sx prop
- **아키텍처**: Feature-Sliced Design (FSD)

---

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18 이상
- pnpm 9 이상

### 설치 및 실행

```bash
# 1. 의존성 설치
pnpm install

# 2. 개발 서버 실행 (모든 앱)
pnpm dev

# 3. 특정 앱만 실행
pnpm --filter data-platform dev
```

### 주요 명령어

```bash
# 빌드
pnpm build

# 테스트
pnpm test

# 린트
pnpm lint

# 타입 체크
pnpm type-check
```

---

## 📚 문서 가이드

### 🎯 시작하기 (필수)

개발을 시작하기 전에 반드시 읽어야 할 문서입니다.

| 순서 | 문서 | 설명 |
|------|------|------|
| 1 | [개발 환경 구축](01-dev-environment.md) | Node.js, pnpm 설치 및 프로젝트 클론 |
| 2 | [프로젝트 초기 설정](02-project-setup.md) | 환경 변수, IDE 설정, Git 설정 |
| 3 | [FSD 아키텍처](03-fsd-architecture.md) | Feature-Sliced Design 원칙 및 레이어 개념 |
| 4 | [폴더 구조](04-folder-structure.md) | 파일 배치 기준 및 실무 예시 |
| 5 | [코드 작성 규칙](05-code-conventions.md) | 네이밍, 컴포넌트 패턴, TypeScript 스타일 |

### 🎨 UI 개발

사용자 인터페이스를 구현하기 위한 가이드입니다.

| 문서 | 설명 |
|------|------|
| [디자인 시스템](06-design-system.md) | UI 컴포넌트, 색상, 타이포그래피, 테마 |
| [레이아웃 시스템](07-layout-system.md) | 페이지/섹션 템플릿, 레이아웃 패턴 |
| [스타일링 가이드](08-styling-guide.md) | MUI 사용법, sx prop, CSS 작성 |

### 💾 데이터 처리

API 통신 및 상태 관리 방법입니다.

| 문서 | 설명 |
|------|------|
| [API 통합](09-api-integration.md) | React Query, Axios, 인증, 에러 처리 |
| [상태 관리](10-state-management.md) | 로컬 상태, 전역 상태 (Zustand) |

### 🧪 품질 관리

테스트, 성능, 배포 관련 가이드입니다.

| 문서 | 설명 |
|------|------|
| [테스트](11-testing.md) | 단위/통합/E2E 테스트 작성 |
| [성능 최적화](12-performance.md) | 메모이제이션, 코드 분할, 최적화 |
| [CI/CD & 배포](13-cicd-deployment.md) | 배포 파이프라인, 환경 변수, 모니터링 |

### 🔧 고급 주제 (선택)

필요시 참고하는 심화 문서입니다.

| 문서 | 설명 |
|------|------|
| [Monorepo 구조](14-monorepo-structure.md) | pnpm workspace, Turborepo, apps vs packages |
| [공통 패키지 개발](15-shared-packages.md) | 패키지 생성, 버전 관리, 배포 |
| [도메인: Data Hub](16-domain-data-hub.md) | Data Hub 도메인 로직 (프로젝트별) |
| [고급 패턴](17-advanced-patterns.md) | i18n, 에러 바운더리, 로깅 |

---

## 📁 프로젝트 구조 (개요)

```
react-workspace/
├── apps/                    # 애플리케이션
│   └── data-platform/       # 데이터 플랫폼 앱
│       └── src/
│           ├── app/         # 앱 초기화, 라우터, 프로바이더
│           ├── pages/       # 페이지 컴포넌트
│           ├── widgets/     # 복합 UI 블록
│           ├── features/    # 사용자 기능
│           ├── entities/    # 비즈니스 엔티티
│           └── shared/      # 공통 리소스
│
├── packages/                # 공통 패키지
│   ├── ui/                  # UI 컴포넌트 라이브러리
│   ├── shared-api/          # API 클라이언트
│   ├── shared-types/        # 공통 타입
│   └── shared-utils/        # 유틸리티 함수
│
├── pnpm-workspace.yaml      # pnpm workspace 설정
├── turbo.json               # Turborepo 설정
└── package.json             # 루트 package.json
```

자세한 구조는 [04-folder-structure.md](04-folder-structure.md)를 참고하세요.

---

## 🎯 학습 로드맵

### 첫 주차: 기초 다지기

```
환경 구축 (01, 02)
  → 구조 이해 (03, 04)
    → 코드 규칙 (05)
      → UI 구현 (06, 07, 08)
```

### 둘째 주차: 실전 개발

```
데이터 처리 (09, 10)
  → 첫 기능 구현 (CRUD)
    → 테스트 작성 (11)
```

### 셋째 주차: 심화 학습

```
성능 최적화 (12)
  → CI/CD (13)
    → 고급 주제 (14-17, 필요시)
```

---

## 🤝 기여 가이드

### 브랜치 전략

- `main`: 프로덕션 코드
- `develop`: 개발 브랜치
- `feature/*`: 새 기능
- `fix/*`: 버그 수정

### 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정 등
```

### Pull Request

1. feature 브랜치 생성
2. 작업 완료 후 커밋
3. PR 생성 (제목: `[기능] 작업 내용`)
4. 코드 리뷰 후 머지

---

## 📞 문의 및 지원

- **문서 관련**: 팀 리드에게 문의
- **기술 지원**: Slack #dev-support 채널
- **버그 리포트**: GitHub Issues

---

## 📄 라이선스

This project is proprietary and confidential.

---

**관리자**: Development Team
