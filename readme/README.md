# React Workspace Documentation

React Monorepo 프로젝트의 전체 아키텍처, 개발 가이드 및 도메인 문서 모음입니다.

## 문서 목차

### I. 아키텍처 및 설정

1. [**Workspace Architecture (워크스페이스 아키텍처)**](./01-workspace-architecture.md)
   - Monorepo 구조 및 패키지 구성
   - 공통 모듈(packages) 설계
   - Workspace 설정 및 의존성 관리

2. [**Project Structure (프로젝트 구조 및 개발 환경)**](./02-project-structure.md)
   - 개발 환경 구축 가이드
   - Feature Sliced Design (FSD) 적용
   - 주요 라이브러리 및 도구
   - 레이아웃 템플릿 및 디자인 시스템

### II. 개발 규칙 및 가이드

3. [**Code Conventions (코드 컨벤션)**](./03-code-conventions.md)
   - TypeScript 코딩 스타일
   - 명명 규칙
   - 컴포넌트 작성 규칙

4. [**Development Practices (개발 실무)**](./04-development-practices.md)
   - Git 워크플로우
   - 테스트 전략
   - 성능 최적화

5. [**Shared Modules Guide (공통 모듈 개발 가이드)**](./05-shared-modules-guide.md)
   - 공통 모듈 개발 방법
   - 패키지 간 의존성 관리
   - 공통 UI 컴포넌트 개발

6. [**Layout Architecture (레이아웃 아키텍처)**](./07-layout-architecture.md)
   - 레이아웃 계층 구조 (페이지/섹션/컴포넌트)
   - 섹션 템플릿 종류 및 사용법
   - 실무 적용 예시

### III. 도메인 문서

7. [**Data Hub Domain (데이터 허브 도메인)**](./06-data-hub-domain.md)
   - 데이터 발생 객체 관리 시스템
   - 데이터베이스 스키마 설계
   - 계층 구조 (data_source → category → resource)
   - 구현 가이드 및 사용 사례

---

## 빠른 시작

### 새 프로젝트 시작하기

1. **Workspace 설정** → [01-workspace-architecture.md](./01-workspace-architecture.md)
2. **개발 환경 구축** → [02-project-structure.md](./02-project-structure.md)
3. **코드 작성 규칙** → [03-code-conventions.md](./03-code-conventions.md)

### 새 앱 생성하기

```bash
# apps/ 디렉토리에 새 앱 생성
cd apps
pnpm create vite@latest my-new-app -- --template react-ts

# package.json 수정
# "name": "@workspace/my-new-app"

# 공통 모듈 의존성 추가
# "@workspace/ui": "workspace:*"

# 루트에서 의존성 설치
cd ../..
pnpm install
```

상세 내용: [02-project-structure.md](./02-project-structure.md#22-workspace-내에서-새-앱-생성)

---

## 주요 기술 스택

### 코어
- **React 18.3.1**: UI 라이브러리
- **TypeScript 5.6.2**: 정적 타입 검사
- **Vite 5.4.8**: 빌드 도구

### 상태 관리
- **Zustand 4.5.5**: 전역 상태 관리
- **React Query 5.59.13**: 서버 상태 관리

### 라우팅
- **React Router DOM 7.6.1**: 클라이언트 사이드 라우팅

### 데이터 페칭
- **Axios 1.7.7**: HTTP 클라이언트

### UI 및 스타일링
- **Material UI**: 디자인 시스템
- **Styled Components**: CSS-in-JS
- **Tailwind CSS**: 유틸리티 CSS

### 차트 및 시각화
- **ECharts 5.6.0**: 고성능 데이터 시각화

---

## 프로젝트 구조

```
react-workspace/
├── apps/                      # 개별 애플리케이션
│   ├── data-platform/         # 데이터 플랫폼 앱
│   ├── rpa-flow/              # RPA 플로우 앱
│   └── visitor-manager/       # 방문자 관리 앱
├── packages/                  # 공통 모듈
│   ├── ui/                    # 공통 UI 컴포넌트
│   ├── api/                   # API 클라이언트
│   ├── auth/                  # 인증 모듈
│   └── utils/                 # 유틸리티 함수
├── readme/                    # 문서 디렉토리
│   ├── 01-workspace-architecture.md
│   ├── 02-project-structure.md
│   ├── 03-code-conventions.md
│   ├── 04-development-practices.md
│   ├── 05-shared-modules-guide.md
│   └── 06-data-hub-domain.md
└── package.json               # Workspace 루트 설정
```

---

## Feature Sliced Design (FSD)

프로젝트는 FSD 아키텍처를 따릅니다:

```
src/
├── app/          # 전역 설정, 프로바이더
├── pages/        # 라우팅 페이지 (조합만 담당)
├── entities/     # 도메인 엔티티 (model + api + ui)
└── shared/       # 공통 리소스 (ui, lib, config)
```

상세 내용: [02-project-structure.md](./02-project-structure.md#3-프로젝트-구조-feature-sliced-design)

---

## 도메인별 문서

### Data Hub (데이터 허브)

데이터를 발생시키는 모든 주체(물리적/논리적 객체)를 관리하는 시스템

**계층 구조**:
```
data_source (출처)
    └── category (분류)
            └── resource (객체)
```

**적용 분야**:
- IoT/센서 데이터 수집
- API 엔드포인트 관리
- 배치 작업 정의
- 이벤트 스트림 관리

상세 내용: [06-data-hub-domain.md](./06-data-hub-domain.md)

---

## 기여 가이드

### 코드 작성 시

1. **FSD 구조 준수**: entities → pages → app 계층 의존성
2. **타입 안정성**: TypeScript strict mode 활용
3. **컴포넌트 재사용**: shared/ui에 공통 컴포넌트 작성
4. **명명 규칙**: [03-code-conventions.md](./03-code-conventions.md) 참조

### 문서 업데이트

- 새로운 도메인 추가 시 `readme/` 디렉토리에 문서 추가
- 이 README에 링크 추가
- 관련 문서 간 상호 참조 업데이트

---

## 라이선스

이 프로젝트는 내부 사용 목적으로 작성되었습니다.

---

## 연락처

문의 사항이 있으시면 개발팀에 연락해주세요.
