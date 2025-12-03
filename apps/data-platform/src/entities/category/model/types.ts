/**
 * Category Entity Types
 *
 * 카테고리 도메인 모델
 * - 데이터 출처 내의 데이터 분류
 * - 계층 구조의 중간 레벨
 */

/**
 * 카테고리 엔티티
 */
export interface Category {
  /** 내부용 프라이머리 키 */
  internalId: number

  /** 외부 공개용 UUID */
  publicId: string

  /** 관리 코드 */
  code: string

  /** 참조: data_source.internal_id */
  dataSourceInternalId: number

  /** 활성화 상태 */
  isActive: boolean

  /** 카테고리 명칭 */
  name: string

  /** 카테고리에 대한 상세 설명 */
  description: string | null

  /** 운영 속성 (데이터 정합성 정책 등) */
  attributes: CategoryAttributes

  /** 관리 속성 (검수 상태, 문서 링크 등) */
  metadata: CategoryMetadata

  /** 레코드 생성 일시 */
  createdAt: Date

  /** 레코드 최종 수정 일시 */
  updatedAt: Date
}

/**
 * 카테고리 운영 속성
 * - 데이터 정합성 및 검증 정책
 */
export interface CategoryAttributes {
  /** 데이터 검증 규칙 */
  validation?: {
    required?: boolean
    dataType?: 'string' | 'number' | 'boolean' | 'object' | 'array'
    pattern?: string
  }

  /** 데이터 보존 정책 */
  retention?: {
    enabled?: boolean
    period?: number // days
    archiveAfter?: number // days
  }

  /** 알림 설정 */
  notification?: {
    enabled?: boolean
    channels?: ('email' | 'slack' | 'webhook')[]
    threshold?: number
  }

  /** 추가 설정 (유연한 확장) */
  [key: string]: any
}

/**
 * 카테고리 관리 속성
 * - 검수 및 문서 관리
 */
export interface CategoryMetadata {
  /** 검수 정보 */
  inspection?: {
    status?: 'pending' | 'in_review' | 'approved' | 'rejected'
    reviewer?: string
    reviewedAt?: string
    comments?: string
  }

  /** 문서 링크 */
  documentation?: {
    url?: string
    version?: string
    lastUpdated?: string
  }

  /** 우선순위 */
  priority?: 'low' | 'medium' | 'high' | 'critical'

  /** 태그 */
  tags?: string[]

  /** 추가 메타데이터 (유연한 확장) */
  [key: string]: any
}

/**
 * 카테고리 생성 DTO
 */
export interface CreateCategoryDto {
  code: string
  dataSourceInternalId: number
  name: string
  description?: string
  attributes?: CategoryAttributes
  metadata?: CategoryMetadata
}

/**
 * 카테고리 수정 DTO
 */
export interface UpdateCategoryDto {
  code?: string
  name?: string
  description?: string
  isActive?: boolean
  attributes?: CategoryAttributes
  metadata?: CategoryMetadata
}

/**
 * 카테고리 필터 조건
 */
export interface CategoryFilter {
  dataSourceInternalId?: number
  isActive?: boolean
  code?: string
  name?: string
}
