# VI. 데이터 허브 (Data Hub) 도메인

## 목차
1. [개요](#1-개요)
2. [도메인 목적](#2-도메인-목적)
3. [데이터베이스 스키마](#3-데이터베이스-스키마)
4. [엔티티 설계](#4-엔티티-설계)
5. [계층 구조](#5-계층-구조)
6. [주요 특징](#6-주요-특징)
7. [사용 사례](#7-사용-사례)

---

## 1. 개요

**데이터 허브(Data Hub)**는 데이터를 발생시키는 모든 주체(물리적 객체 및 논리적 객체)를 관리하는 메타데이터 레지스트리입니다.

### 핵심 개념

```
데이터 허브 = 데이터 발생 객체 관리 시스템
```

- **데이터를 직접 저장하지 않음**
- **데이터를 생성하는 주체(객체)를 정의하고 관리**
- 실제 측정값/로그 데이터는 별도 테이블에 저장
- "어떤 객체가 데이터를 생성하는가?"를 정의

---

## 2. 도메인 목적

### 2.1 데이터 발생 주체 관리

데이터를 생성하는 모든 주체를 통합 관리:

#### 물리적 객체
- 센서, 장비, 디바이스
- IoT 기기, 측정 장비
- 하드웨어 엔드포인트

#### 논리적 객체
- **배치 작업**: 일일/주간 데이터 집계 프로세스
- **API 엔드포인트**: 외부 시스템이 데이터를 푸시하는 URL
- **계산 모듈**: 파생 지표를 생성하는 로직
- **이벤트 스트림**: 특정 비즈니스 이벤트 발생원
- **가상 센서**: 여러 물리 센서 데이터를 조합한 논리적 측정값
- **사용자 입력 폼**: 수동 입력 데이터 소스

### 2.2 적용 분야

- **산업 IoT (IIoT)**: 스마트 팩토리, 설비 모니터링
- **빌딩 관리**: HVAC, 전력 계측
- **환경 모니터링**: 대기질, 수질 센서
- **물류/유통**: 재고 추적, 위치 센서
- **헬스케어**: 생체 신호 측정 장비
- **에너지**: 스마트 그리드, 전력 소비 측정

---

## 3. 데이터베이스 스키마

### 3.1 테이블 구조

```
data_source (데이터 출처)
    └── category (카테고리)
            └── resource (리소스)
```

### 3.2 data_source (데이터 출처)

**역할**: 최상위 데이터 공급원

| 필드 이름 | 데이터 타입 | 제약 조건 | 주석 |
|-----------|-------------|-----------|------|
| internal_id | BIGINT | PK, A.I. | 내부용 프라이머리 키 (성능 최적화) |
| public_id | VARCHAR(36) | UNIQUE | 외부 공개용 UUID (API/URL 노출) |
| code | VARCHAR(100) | NOT NULL | 관리 코드 (사람이 읽는 고유 코드) |
| user_id | VARCHAR(36) | NOT NULL | 관리자(소유자)의 UUID |
| is_active | BOOLEAN | NOT NULL DEFAULT TRUE | 활성화 상태 |
| name | VARCHAR(255) | NOT NULL | 데이터 출처의 명칭 |
| attributes | JSON | NULL | 운영 속성 (프로토콜, 타임아웃 등 기술적 사양) |
| metadata | JSON | NULL | 관리 속성 (계약 정보, 담당 조직 등 부가 정보) |
| created_at | DATETIME | NOT NULL DEFAULT CURRENT_TIMESTAMP | 레코드 생성 일시 |
| updated_at | DATETIME | NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 레코드 최종 수정 일시 |

**예시**:
- MQTT 브로커
- REST API 서버
- 센서 게이트웨이
- 데이터베이스 커넥션

### 3.3 category (카테고리)

**역할**: 데이터 출처 내의 데이터 분류

| 필드 이름 | 데이터 타입 | 제약 조건 | 주석 |
|-----------|-------------|-----------|------|
| internal_id | BIGINT | PK, A.I. | 내부용 프라이머리 키 |
| public_id | VARCHAR(36) | UNIQUE | 외부 공개용 UUID |
| code | VARCHAR(100) | NOT NULL | 관리 코드 |
| data_source_internal_id | BIGINT | NOT NULL | 참조: data_source.internal_id (FK 제약 없음) |
| is_active | BOOLEAN | NOT NULL DEFAULT TRUE | 활성화 상태 |
| name | VARCHAR(255) | NOT NULL | 카테고리 명칭 |
| description | TEXT | NULL | 카테고리에 대한 상세 설명 |
| attributes | JSON | NULL | 운영 속성 (데이터 정합성 정책 등) |
| metadata | JSON | NULL | 관리 속성 (검수 상태, 문서 링크 등) |
| created_at | DATETIME | NOT NULL DEFAULT CURRENT_TIMESTAMP | 레코드 생성 일시 |
| updated_at | DATETIME | NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 레코드 최종 수정 일시 |

**예시**:
- 온도 센서군
- 압력 센서군
- 환경 데이터 카테고리
- 에너지 측정 카테고리

### 3.4 resource (리소스)

**역할**: 실제 데이터 수집 대상 (최하위 엔티티)

| 필드 이름 | 데이터 타입 | 제약 조건 | 주석 |
|-----------|-------------|-----------|------|
| internal_id | BIGINT | PK, A.I. | 내부용 프라이머리 키 |
| public_id | VARCHAR(36) | UNIQUE | 외부 공개용 UUID |
| code | VARCHAR(100) | NOT NULL | 관리 코드 |
| category_internal_id | BIGINT | NOT NULL | 참조: category.internal_id (FK 제약 없음) |
| is_active | BOOLEAN | NOT NULL DEFAULT TRUE | 활성화 상태 |
| name | VARCHAR(255) | NOT NULL | 리소스 명칭 |
| attributes | JSON | NULL | 운영 속성 (임계점, MQTT 코드 등 기능적 사양) |
| metadata | JSON | NULL | 관리 속성 (태그, 담당자 등) |
| created_at | DATETIME | NOT NULL DEFAULT CURRENT_TIMESTAMP | 레코드 생성 일시 |
| updated_at | DATETIME | NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 레코드 최종 수정 일시 |

**예시**:
- 개별 센서
- 측정 포인트
- 데이터 엔드포인트
- 계산 모듈 인스턴스

---

## 4. 엔티티 설계

### 4.1 이중 ID 전략

```typescript
interface Entity {
  internal_id: number    // 내부 조인 성능 최적화 (BIGINT)
  public_id: string      // 외부 API 노출용 보안 ID (UUID)
}
```

**목적**:
- `internal_id`: 데이터베이스 내부 조인 성능 최적화
- `public_id`: 외부 API/URL 노출 시 보안 및 안정성

### 4.2 Soft FK (FK 제약 없음)

```sql
-- category 테이블
data_source_internal_id BIGINT NOT NULL
-- FK 제약 없음 (참조 무결성 애플리케이션 레벨에서 관리)
```

**장점**:
- 유연한 데이터 관리
- 분산 시스템/마이크로서비스 친화적
- 데이터 삭제 시 유연성 확보

### 4.3 공통 속성 패턴

모든 테이블에 공통으로 적용되는 속성:

```typescript
interface CommonFields {
  code: string           // 사람이 읽을 수 있는 관리 코드
  is_active: boolean     // Soft delete 패턴
  attributes: JSON       // 기술적 설정 (운영 속성)
  metadata: JSON         // 비즈니스 정보 (관리 속성)
  created_at: DateTime   // 생성 일시
  updated_at: DateTime   // 최종 수정 일시
}
```

### 4.4 attributes vs metadata

#### attributes (운영 속성)
기술적 사양 및 동작 설정

```json
{
  "protocol": "MQTT",
  "timeout": 5000,
  "retry_count": 3,
  "threshold": {
    "min": 0,
    "max": 100,
    "warning": 80
  },
  "mqtt_code": "sensor/temp/001",
  "data_type": "float",
  "unit": "celsius"
}
```

#### metadata (관리 속성)
비즈니스 정보 및 부가 데이터

```json
{
  "contract": {
    "vendor": "ABC Corp",
    "contract_number": "CNT-2024-001",
    "expiry_date": "2025-12-31"
  },
  "organization": {
    "department": "Manufacturing",
    "manager": "John Doe",
    "contact": "john@example.com"
  },
  "tags": ["critical", "production", "24/7"],
  "documentation_url": "https://docs.example.com/sensor-001",
  "inspection_status": "approved"
}
```

---

## 5. 계층 구조

### 5.1 3단계 계층

```
Level 1: data_source (출처)
    │
    └─ Level 2: category (분류)
           │
           └─ Level 3: resource (객체)
```

### 5.2 실제 사례

#### 예시 1: 스마트 팩토리

```
data_source: 1번 생산라인
  └── category: 온도 센서류
      ├── resource: 엔진 온도계 #A01
      └── resource: 냉각수 온도계 #A02
  └── category: 압력 센서류
      └── resource: 유압 게이지 #B01
```

#### 예시 2: 빌딩 관리

```
data_source: 본관 건물
  └── category: HVAC 장비
      ├── resource: 1층 에어컨 #AC-101
      └── resource: 2층 에어컨 #AC-201
  └── category: 전력 계측기
      └── resource: 메인 전력계 #PM-001
```

#### 예시 3: 판매 데이터 시스템 (논리적 객체)

```
data_source: 판매 데이터 시스템
  └── category: 일일 집계
      ├── resource: 매출 합계 계산기 (논리적)
      └── resource: 재고 소진율 계산기 (논리적)
  └── category: 실시간 거래
      ├── resource: POS 단말기 #001 (물리적)
      └── resource: 모바일 앱 결제 API (논리적)
```

---

## 6. 주요 특징

### 6.1 멀티테넌시

```typescript
// data_source 테이블
user_id: string  // 소유자의 UUID
```

**기능**:
- 소유자별 데이터 격리
- 권한 기반 접근 제어
- 조직 단위 관리

### 6.2 동적 설정 관리

```typescript
// JSON 필드로 유연한 속성 확장
attributes: {
  // 센서 타입에 따라 다른 속성
  sensor_type: "temperature" | "pressure" | "humidity"

  // 타입별 고유 설정
  temperature: { unit: "celsius", precision: 0.1 }
  pressure: { unit: "psi", range: [0, 1000] }
}
```

### 6.3 감사 추적

```typescript
created_at: DateTime  // 생성 일시
updated_at: DateTime  // 최종 수정 일시
```

**활용**:
- 변경 이력 추적
- 규정 준수 (Compliance)
- 문제 발생 시 원인 분석

### 6.4 활성화 관리 (Soft Delete)

```typescript
is_active: boolean  // true: 활성, false: 비활성
```

**장점**:
- 물리적 삭제 없이 논리적 삭제
- 히스토리 데이터 보존
- 복구 가능성 확보

---

## 7. 사용 사례

### 7.1 센서 데이터 수집

```typescript
// 1. 센서 정의 (Resource)
const sensor = {
  code: "TEMP_001",
  name: "엔진 온도 센서",
  category_internal_id: 100,  // 온도 센서 카테고리
  attributes: {
    mqtt_topic: "factory/line1/temp/001",
    unit: "celsius",
    threshold: { warning: 80, critical: 100 }
  }
}

// 2. 실제 데이터 수집 (별도 테이블)
const measurement = {
  resource_id: sensor.public_id,
  value: 75.5,
  timestamp: new Date(),
  unit: "celsius"
}
```

### 7.2 API 엔드포인트 관리

```typescript
// 1. API 엔드포인트 정의 (Resource)
const apiEndpoint = {
  code: "API_ORDER_WEBHOOK",
  name: "주문 데이터 수신 웹훅",
  category_internal_id: 200,  // API 카테고리
  attributes: {
    url: "https://api.example.com/webhook/orders",
    method: "POST",
    auth_type: "bearer_token",
    timeout: 30000
  },
  metadata: {
    rate_limit: "100req/min",
    vendor: "External Partner Inc."
  }
}

// 2. 실제 데이터 수신 (별도 테이블)
const receivedData = {
  resource_id: apiEndpoint.public_id,
  payload: { order_id: "ORD-001", amount: 1000 },
  received_at: new Date()
}
```

### 7.3 배치 작업 관리

```typescript
// 1. 배치 작업 정의 (Resource)
const batchJob = {
  code: "DAILY_SALES_AGGREGATION",
  name: "일일 매출 집계",
  category_internal_id: 300,  // 배치 작업 카테고리
  attributes: {
    schedule: "0 0 * * *",  // 매일 자정
    execution_timeout: 3600,
    source_tables: ["orders", "payments"]
  },
  metadata: {
    owner: "finance_team",
    criticality: "high"
  }
}

// 2. 배치 실행 결과 (별도 테이블)
const executionResult = {
  resource_id: batchJob.public_id,
  execution_time: new Date(),
  status: "success",
  records_processed: 15000
}
```

### 7.4 Master-Detail 패턴 UI

```typescript
// entities/data-source/ui/DataSourceTable.tsx
import { DataSourceTable } from '@/entities/data-source'
import { CategoryTable } from '@/entities/category'
import { ResourceTable } from '@/entities/resource'

function DataHubPage() {
  const [selectedSource, setSelectedSource] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { data: sources } = useDataSources()
  const { data: categories } = useCategories(selectedSource?.internal_id)
  const { data: resources } = useResources(selectedCategory?.internal_id)

  return (
    <ContentLayout type="three-column" ratio={[2, 3, 5]}>
      <LayoutRegion name="left">
        <DataSourceTable
          data={sources}
          onRowClick={setSelectedSource}
        />
      </LayoutRegion>
      <LayoutRegion name="middle">
        <CategoryTable
          data={categories}
          onRowClick={setSelectedCategory}
        />
      </LayoutRegion>
      <LayoutRegion name="right">
        <ResourceTable data={resources} />
      </LayoutRegion>
    </ContentLayout>
  )
}
```

---

## 8. 구현 가이드

### 8.1 Feature Sliced Design 구조

```
apps/data-hub/src/
├── entities/
│   ├── data-source/
│   │   ├── model/
│   │   │   └── types.ts
│   │   ├── api/
│   │   │   ├── queries.ts       # useDataSources
│   │   │   └── mutations.ts     # createDataSource, updateDataSource
│   │   ├── ui/
│   │   │   ├── DataSourceTable.tsx
│   │   │   └── DataSourceForm.tsx
│   │   └── index.ts
│   ├── category/
│   │   ├── model/types.ts
│   │   ├── api/
│   │   │   └── queries.ts       # useCategoriesBySource
│   │   ├── ui/CategoryTable.tsx
│   │   └── index.ts
│   └── resource/
│       ├── model/types.ts
│       ├── api/
│       │   └── queries.ts       # useResourcesByCategory
│       ├── ui/
│       │   ├── ResourceTable.tsx
│       │   └── ResourceDetail.tsx
│       └── index.ts
└── pages/
    └── DataHubPage/
        └── DataHubPage.tsx      # 조합만 담당
```

### 8.2 타입 정의

```typescript
// entities/data-source/model/types.ts
export interface DataSource {
  internalId: number
  publicId: string
  code: string
  userId: string
  isActive: boolean
  name: string
  attributes: DataSourceAttributes
  metadata: DataSourceMetadata
  createdAt: Date
  updatedAt: Date
}

export interface DataSourceAttributes {
  protocol?: 'MQTT' | 'HTTP' | 'HTTPS' | 'WebSocket'
  timeout?: number
  retryCount?: number
  [key: string]: any
}

export interface DataSourceMetadata {
  contract?: {
    vendor: string
    contractNumber: string
    expiryDate: string
  }
  organization?: {
    department: string
    manager: string
    contact: string
  }
  tags?: string[]
  [key: string]: any
}
```

### 8.3 React Query 사용

```typescript
// entities/data-source/api/queries.ts
import { useQuery } from '@tanstack/react-query'
import type { DataSource } from '../model'

export const useDataSources = () => {
  return useQuery({
    queryKey: ['data-sources'],
    queryFn: async () => {
      const response = await fetch('/api/data-sources')
      return response.json() as Promise<DataSource[]>
    },
  })
}

// entities/category/api/queries.ts
export const useCategoriesBySource = (sourceId?: number) => {
  return useQuery({
    queryKey: ['categories', sourceId],
    queryFn: async () => {
      const response = await fetch(`/api/categories?source_id=${sourceId}`)
      return response.json() as Promise<Category[]>
    },
    enabled: !!sourceId,  // sourceId가 있을 때만 실행
  })
}
```

---

## 9. 베스트 프랙티스

### 9.1 명명 규칙

**code 필드 권장 형식**:
```
[카테고리]_[위치]_[순번]
예: TEMP_LINE1_001, API_ORDER_WEBHOOK, BATCH_DAILY_SALES
```

### 9.2 attributes 설계

```typescript
// ✅ 좋은 예: 타입별로 명확한 구조
{
  type: "sensor",
  sensor: {
    unit: "celsius",
    precision: 0.1,
    range: { min: -20, max: 120 }
  }
}

// ❌ 나쁜 예: 평탄한 구조
{
  unit: "celsius",
  precision: 0.1,
  min: -20,
  max: 120
}
```

### 9.3 성능 최적화

```typescript
// ✅ 인덱스 활용
CREATE INDEX idx_category_source ON category(data_source_internal_id)
CREATE INDEX idx_resource_category ON resource(category_internal_id)
CREATE INDEX idx_is_active ON data_source(is_active)

// ✅ 필요한 컬럼만 조회
SELECT internal_id, public_id, code, name
FROM data_source
WHERE is_active = true
```

### 9.4 보안

```typescript
// ✅ public_id를 외부에 노출
GET /api/data-sources/{public_id}

// ❌ internal_id를 외부에 노출하지 않음
// GET /api/data-sources/{internal_id}  // 금지
```

---

## 10. 참고 문서

- [Feature Sliced Design](02-project-structure.md#3-프로젝트-구조-feature-sliced-design)
- [React Query 사용법](02-project-structure.md#442-react-query)
- [레이아웃 템플릿](02-project-structure.md#49-디자인-시스템---레이아웃-템플릿)
- [개발 가이드](04-development-practices.md)
