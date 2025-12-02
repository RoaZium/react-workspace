/**
 * Category 도메인 타입 정의
 *
 * 데이터베이스 스키마와 1:1 매핑
 */

export interface Category {
  internalId: number
  publicId: string
  code: string
  dataSourceInternalId: number
  isActive: boolean
  name: string
  description: string | null
  attributes: CategoryAttributes | null
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

/**
 * 운영 속성 (기능적 사양)
 */
export interface CategoryAttributes {
  dataIntegrityPolicy?: 'strict' | 'relaxed'
  validationRules?: string[]
  refreshInterval?: number
  schema?: Record<string, unknown>
}

/**
 * 관리 속성 (부가 정보)
 */
export interface CategoryMetadata {
  reviewStatus?: 'pending' | 'approved' | 'rejected'
  documentLink?: string
  tags?: string[]
  owner?: string
}

/**
 * 생성 DTO
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
 * 수정 DTO
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
 * 목록 조회 필터
 */
export interface CategoryFilter {
  dataSourceInternalId?: number
  isActive?: boolean
  search?: string
}
