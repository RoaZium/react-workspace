/**
 * Resource 도메인 타입 정의
 *
 * 데이터베이스 스키마와 1:1 매핑
 */

export interface Resource {
  internalId: number
  publicId: string
  code: string
  categoryInternalId: number
  isActive: boolean
  name: string
  attributes: ResourceAttributes | null
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

/**
 * 운영 속성 (기능적 사양)
 */
export interface ResourceAttributes {
  threshold?: {
    min?: number
    max?: number
    warning?: number
    critical?: number
  }
  mqttCode?: string
  unit?: string
  dataType?: 'number' | 'string' | 'boolean' | 'object'
  sampleRate?: number
}

/**
 * 관리 속성 (부가 정보)
 */
export interface ResourceMetadata {
  tags?: string[]
  owner?: string
  criticality?: 'low' | 'medium' | 'high' | 'critical'
  location?: string
  description?: string
}

/**
 * 생성 DTO
 */
export interface CreateResourceDto {
  code: string
  categoryInternalId: number
  name: string
  attributes?: ResourceAttributes
  metadata?: ResourceMetadata
}

/**
 * 수정 DTO
 */
export interface UpdateResourceDto {
  code?: string
  name?: string
  isActive?: boolean
  attributes?: ResourceAttributes
  metadata?: ResourceMetadata
}

/**
 * 목록 조회 필터
 */
export interface ResourceFilter {
  categoryInternalId?: number
  isActive?: boolean
  search?: string
}
