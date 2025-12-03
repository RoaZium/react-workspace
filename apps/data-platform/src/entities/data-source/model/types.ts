/**
 * Data Source Entity Types
 *
 * 데이터 출처 도메인 모델
 * - 최상위 데이터 공급원 정의
 * - 물리적/논리적 데이터 발생 주체 관리
 */

/**
 * 데이터 출처 엔티티
 */
export interface DataSource {
  /** 내부용 프라이머리 키 (성능 최적화) */
  internalId: number

  /** 외부 공개용 UUID (API/URL 노출) */
  publicId: string

  /** 관리 코드 (사람이 읽는 고유 코드) */
  code: string

  /** 관리자(소유자)의 UUID */
  userId: string

  /** 활성화 상태 */
  isActive: boolean

  /** 데이터 출처의 명칭 */
  name: string

  /** 운영 속성 (프로토콜, 타임아웃 등 기술적 사양) */
  attributes: DataSourceAttributes

  /** 관리 속성 (계약 정보, 담당 조직 등 부가 정보) */
  metadata: DataSourceMetadata

  /** 레코드 생성 일시 */
  createdAt: Date

  /** 레코드 최종 수정 일시 */
  updatedAt: Date
}

/**
 * 데이터 출처 운영 속성
 * - 기술적 사양 및 동작 설정
 */
export interface DataSourceAttributes {
  /** 프로토콜 타입 */
  protocol?: 'MQTT' | 'HTTP' | 'HTTPS' | 'WebSocket' | 'TCP' | 'UDP' | 'gRPC'

  /** 연결 타임아웃 (ms) */
  timeout?: number

  /** 재시도 횟수 */
  retryCount?: number

  /** 호스트 주소 */
  host?: string

  /** 포트 번호 */
  port?: number

  /** 인증 타입 */
  authType?: 'none' | 'basic' | 'bearer' | 'api_key' | 'oauth2'

  /** 추가 설정 (유연한 확장) */
  [key: string]: any
}

/**
 * 데이터 출처 관리 속성
 * - 비즈니스 정보 및 부가 데이터
 */
export interface DataSourceMetadata {
  /** 계약 정보 */
  contract?: {
    vendor: string
    contractNumber: string
    expiryDate: string
  }

  /** 조직 정보 */
  organization?: {
    department: string
    manager: string
    contact: string
  }

  /** 태그 */
  tags?: string[]

  /** 문서 URL */
  documentationUrl?: string

  /** 검수 상태 */
  inspectionStatus?: 'pending' | 'approved' | 'rejected'

  /** 추가 메타데이터 (유연한 확장) */
  [key: string]: any
}

/**
 * 데이터 출처 생성 DTO
 */
export interface CreateDataSourceDto {
  code: string
  userId: string
  name: string
  attributes?: DataSourceAttributes
  metadata?: DataSourceMetadata
}

/**
 * 데이터 출처 수정 DTO
 */
export interface UpdateDataSourceDto {
  code?: string
  name?: string
  isActive?: boolean
  attributes?: DataSourceAttributes
  metadata?: DataSourceMetadata
}

/**
 * 데이터 출처 필터 조건
 */
export interface DataSourceFilter {
  userId?: string
  isActive?: boolean
  code?: string
  name?: string
}
