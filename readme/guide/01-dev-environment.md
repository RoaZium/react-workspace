# 개발 환경 구축

> 로컬 개발 환경을 설정하고 프로젝트를 실행하는 방법

## 목차

1. [필수 도구 설치](#1-필수-도구-설치)
2. [프로젝트 클론 및 설치](#2-프로젝트-클론-및-설치)
3. [개발 서버 실행](#3-개발-서버-실행)
4. [프로젝트 구조 확인](#4-프로젝트-구조-확인)
5. [문제 해결](#5-문제-해결)

---

## 1. 필수 도구 설치

### 1.1 Node.js

**최소 버전**: Node.js 18.x 이상

#### Windows

```bash
# 공식 웹사이트에서 설치
https://nodejs.org/

# 또는 nvm 사용 (권장)
nvm install 20
nvm use 20
```

#### macOS

```bash
# Homebrew 사용
brew install node@20

# 또는 nvm 사용 (권장)
brew install nvm
nvm install 20
nvm use 20
```

#### Linux

```bash
# nvm 사용 (권장)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

#### 설치 확인

```bash
node --version
# v20.x.x

npm --version
# 10.x.x
```

---

### 1.2 pnpm

**최소 버전**: pnpm 9.x 이상

#### 설치

```bash
# npm을 통한 설치 (권장)
npm install -g pnpm

# 또는 스크립트 사용
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Windows (PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

#### 설치 확인

```bash
pnpm --version
# 9.x.x
```

---

### 1.3 Git

#### Windows

```bash
# 공식 웹사이트에서 설치
https://git-scm.com/download/win
```

#### macOS

```bash
# Xcode Command Line Tools
xcode-select --install

# 또는 Homebrew
brew install git
```

#### Linux

```bash
sudo apt-get install git
```

#### 설치 확인

```bash
git --version
# git version 2.x.x
```

---

## 2. 프로젝트 클론 및 설치

### 2.1 저장소 클론

```bash
# SSH (권장)
git clone git@github.com:your-org/react-workspace.git

# HTTPS
git clone https://github.com/your-org/react-workspace.git

# 디렉토리 이동
cd react-workspace
```

---

### 2.2 의존성 설치

```bash
# 모든 의존성 설치 (루트 + apps + packages)
pnpm install
```

**소요 시간**: 약 2-5분 (인터넷 속도에 따라 다름)

**설치되는 항목**:
- 루트 의존성
- apps/data-platform 의존성
- packages/ui, packages/shared-api 등 의존성

---

### 2.3 설치 확인

```bash
# pnpm workspace 확인
pnpm list --depth 0

# 출력 예시:
# react-workspace@1.0.0
# ├─ @workspace/data-platform@1.0.0
# ├─ @workspace/ui@1.0.0
# ├─ @workspace/shared-api@1.0.0
# └─ ...
```

---

## 3. 개발 서버 실행

### 3.1 모든 앱 실행

```bash
# Turborepo로 모든 앱 동시 실행
pnpm dev
```

**실행 결과**:
```
✓ apps/data-platform    http://localhost:5173
✓ packages/ui (storybook) http://localhost:6006
```

---

### 3.2 특정 앱만 실행

```bash
# data-platform 앱만 실행
pnpm --filter data-platform dev

# 또는 앱 폴더에서 직접 실행
cd apps/data-platform
pnpm dev
```

---

### 3.3 브라우저 확인

개발 서버가 실행되면 브라우저에서 다음 주소를 엽니다:

```
http://localhost:5173
```

**정상 작동 확인**:
- ✅ 페이지가 로드됨
- ✅ HMR (Hot Module Replacement) 작동 (파일 수정 시 자동 리로드)
- ✅ 콘솔 에러 없음

---

## 4. 프로젝트 구조 확인

### 4.1 주요 폴더

```bash
# 프로젝트 루트 구조 확인
tree -L 2 -I 'node_modules'
```

```
react-workspace/
├── apps/
│   └── data-platform/       # 메인 애플리케이션
├── packages/
│   ├── ui/                  # UI 컴포넌트 라이브러리
│   ├── shared-api/          # API 클라이언트
│   ├── shared-types/        # 공통 타입
│   └── shared-utils/        # 유틸리티
├── pnpm-workspace.yaml      # pnpm workspace 설정
├── turbo.json               # Turborepo 설정
├── package.json
└── README.md
```

---

### 4.2 애플리케이션 내부 구조

```bash
cd apps/data-platform
tree -L 2 src
```

```
src/
├── app/                     # 앱 초기화, 라우팅
├── pages/                   # 페이지 컴포넌트
├── widgets/                 # 복합 UI 블록
├── features/                # 사용자 기능
├── entities/                # 비즈니스 엔티티
└── shared/                  # 공통 리소스
```

자세한 내용은 [04-folder-structure.md](04-folder-structure.md)를 참고하세요.

---

## 5. 문제 해결

### 5.1 포트 충돌

**증상**: `Port 5173 is already in use`

**해결**:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9

# 또는 다른 포트 사용
PORT=3000 pnpm dev
```

---

### 5.2 pnpm 설치 오류

**증상**: `pnpm: command not found`

**해결**:
```bash
# npm으로 재설치
npm install -g pnpm

# 환경 변수 확인 (macOS/Linux)
echo $PATH

# pnpm 경로 추가 (~/.bashrc 또는 ~/.zshrc)
export PATH="$HOME/.local/share/pnpm:$PATH"
source ~/.zshrc
```

---

### 5.3 의존성 설치 실패

**증상**: `ERR_PNPM_...` 에러

**해결**:
```bash
# pnpm 캐시 및 lock 파일 삭제
rm -rf node_modules pnpm-lock.yaml
pnpm store prune

# 재설치
pnpm install
```

---

### 5.4 Git 권한 오류

**증상**: `Permission denied (publickey)`

**해결**:
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 키를 GitHub에 등록
cat ~/.ssh/id_ed25519.pub
# 출력된 키를 GitHub Settings > SSH Keys에 추가

# SSH 연결 테스트
ssh -T git@github.com
```

---

### 5.5 Node 버전 불일치

**증상**: `The engine "node" is incompatible with this module`

**해결**:
```bash
# 현재 Node 버전 확인
node --version

# nvm으로 올바른 버전 설치
nvm install 20
nvm use 20

# 또는 .nvmrc 파일 생성 (권장)
echo "20" > .nvmrc
nvm use
```

---

## 6. 다음 단계

환경 구축이 완료되었습니다! 이제 다음 문서로 진행하세요:

1. **[02-project-setup.md](02-project-setup.md)**: 환경 변수 설정, IDE 설정
2. **[03-fsd-architecture.md](03-fsd-architecture.md)**: 프로젝트 아키텍처 이해
3. **[04-folder-structure.md](04-folder-structure.md)**: 폴더 구조 상세

---

