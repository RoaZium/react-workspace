/**
 * DataSource 도메인 타입 정의
 *
 * 데이터베이스 스키마와 1:1 매핑
 */

export interface DataSource {
  internalId: number
  publicId: string
  code: string
  userId: string
  isActive: boolean
  name: string
  attributes: DataSourceAttributes | null
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

/**
 * 운영 속성 (기술적 사양)
 */
export interface DataSourceAttributes {
  protocol?: 'mqtt' | 'http' | 'https' | 'jdbc' | 's3' | 'ftp'
  connectionString?: string
  timeout?: number
  retryCount?: number
  host?: string
  port?: number
  username?: string
  // password는 보안상 프론트엔드에서 다루지 않음
}

/**
 * 관리 속성 (부가 정보)
 */
export interface DataSourceMetadata {
  contractInfo?: string
  organization?: string
  contact?: string
  description?: string
  tags?: string[]
}

/**
 * 생성 DTO
 */
export interface CreateDataSourceDto {
  code: string
  name: string
  attributes?: DataSourceAttributes
  metadata?: DataSourceMetadata
}

/**
 * 수정 DTO
 */
export interface UpdateDataSourceDto {
  code?: string
  name?: string
  isActive?: boolean
  attributes?: DataSourceAttributes
  metadata?: DataSourceMetadata
}

/**
 * 목록 조회 필터
 */
export interface DataSourceFilter {
  isActive?: boolean
  search?: string
}
