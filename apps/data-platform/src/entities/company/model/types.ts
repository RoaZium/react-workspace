/**
 * Company Entity Types
 *
 * 회사 도메인 모델
 * - 데이터 허브의 최상위 조직 단위
 */

/**
 * 회사 엔티티
 */
export interface Company {
  /** 내부용 프라이머리 키 */
  internalId: number

  /** 외부 공개용 UUID */
  publicId: string

  /** 회사 코드 (사람이 읽는 고유 코드) */
  code: string

  /** 회사명 */
  name: string

  /** 활성화 상태 */
  isActive: boolean

  /** 회사 설명 */
  description?: string

  /** 운영 속성 */
  attributes: CompanyAttributes

  /** 관리 속성 */
  metadata: CompanyMetadata

  /** 레코드 생성 일시 */
  createdAt: Date

  /** 레코드 최종 수정 일시 */
  updatedAt: Date
}

/**
 * 회사 운영 속성
 */
export interface CompanyAttributes {
  /** 사업자 등록번호 */
  businessNumber?: string

  /** 산업 분류 */
  industry?: string

  /** 회사 규모 */
  size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'

  /** 추가 설정 */
  [key: string]: any
}

/**
 * 회사 관리 속성
 */
export interface CompanyMetadata {
  /** 주소 */
  address?: string

  /** 대표자 */
  ceo?: string

  /** 담당자 정보 */
  contact?: {
    name: string
    email: string
    phone: string
  }

  /** 태그 */
  tags?: string[]

  /** 추가 메타데이터 */
  [key: string]: any
}

/**
 * 회사 생성 DTO
 */
export interface CreateCompanyDto {
  code: string
  name: string
  description?: string
  attributes?: CompanyAttributes
  metadata?: CompanyMetadata
}

/**
 * 회사 수정 DTO
 */
export interface UpdateCompanyDto {
  code?: string
  name?: string
  description?: string
  isActive?: boolean
  attributes?: CompanyAttributes
  metadata?: CompanyMetadata
}

/**
 * 회사 필터 조건
 */
export interface CompanyFilter {
  isActive?: boolean
  code?: string
  name?: string
}
