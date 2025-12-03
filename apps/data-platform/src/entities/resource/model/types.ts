/**
 * Resource Entity Types
 *
 * 리소스 도메인 모델
 * - 실제 데이터 수집 대상 (최하위 엔티티)
 * - 개별 센서, 측정 포인트, 데이터 엔드포인트
 */

/**
 * 리소스 엔티티
 */
export interface Resource {
  /** 내부용 프라이머리 키 */
  internalId: number

  /** 외부 공개용 UUID */
  publicId: string

  /** 관리 코드 */
  code: string

  /** 참조: category.internal_id */
  categoryInternalId: number

  /** 활성화 상태 */
  isActive: boolean

  /** 리소스 명칭 */
  name: string

  /** 운영 속성 (임계점, MQTT 코드 등 기능적 사양) */
  attributes: ResourceAttributes

  /** 관리 속성 (태그, 담당자 등) */
  metadata: ResourceMetadata

  /** 레코드 생성 일시 */
  createdAt: Date

  /** 레코드 최종 수정 일시 */
  updatedAt: Date
}

/**
 * 리소스 운영 속성
 * - 기능적 사양 및 측정 설정
 */
export interface ResourceAttributes {
  /** 리소스 타입 */
  resourceType?: 'sensor' | 'api' | 'database' | 'file' | 'stream' | 'batch' | 'manual'

  /** 센서 설정 (리소스 타입이 sensor인 경우) */
  sensor?: {
    sensorType?: 'temperature' | 'pressure' | 'humidity' | 'vibration' | 'current' | 'voltage'
    unit?: string
    precision?: number
    range?: {
      min?: number
      max?: number
    }
  }

  /** 임계값 설정 */
  threshold?: {
    warning?: {
      min?: number
      max?: number
    }
    critical?: {
      min?: number
      max?: number
    }
  }

  /** MQTT 설정 */
  mqtt?: {
    topic?: string
    qos?: 0 | 1 | 2
    retain?: boolean
  }

  /** API 설정 */
  api?: {
    endpoint?: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers?: Record<string, string>
  }

  /** 배치 작업 설정 */
  batch?: {
    schedule?: string // cron expression
    executionTimeout?: number // seconds
    sourceTables?: string[]
  }

  /** 샘플링 설정 */
  sampling?: {
    enabled?: boolean
    interval?: number // seconds
    aggregation?: 'avg' | 'sum' | 'min' | 'max' | 'last'
  }

  /** 추가 설정 (유연한 확장) */
  [key: string]: any
}

/**
 * 리소스 관리 속성
 * - 담당자 및 운영 정보
 */
export interface ResourceMetadata {
  /** 담당자 정보 */
  owner?: {
    userId?: string
    name?: string
    email?: string
    team?: string
  }

  /** 위치 정보 */
  location?: {
    facility?: string
    building?: string
    floor?: string
    room?: string
    coordinates?: {
      latitude?: number
      longitude?: number
    }
  }

  /** 설치 정보 */
  installation?: {
    installedAt?: string
    installedBy?: string
    warranty?: {
      provider?: string
      expiryDate?: string
    }
  }

  /** 유지보수 정보 */
  maintenance?: {
    lastCheckAt?: string
    nextCheckAt?: string
    checkInterval?: number // days
    status?: 'normal' | 'warning' | 'maintenance' | 'failure'
  }

  /** 태그 */
  tags?: string[]

  /** 우선순위 */
  priority?: 'low' | 'medium' | 'high' | 'critical'

  /** 추가 메타데이터 (유연한 확장) */
  [key: string]: any
}

/**
 * 리소스 생성 DTO
 */
export interface CreateResourceDto {
  code: string
  categoryInternalId: number
  name: string
  attributes?: ResourceAttributes
  metadata?: ResourceMetadata
}

/**
 * 리소스 수정 DTO
 */
export interface UpdateResourceDto {
  code?: string
  name?: string
  isActive?: boolean
  attributes?: ResourceAttributes
  metadata?: ResourceMetadata
}

/**
 * 리소스 필터 조건
 */
export interface ResourceFilter {
  categoryInternalId?: number
  isActive?: boolean
  code?: string
  name?: string
  resourceType?: string
}
