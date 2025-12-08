import type { Company } from '../model/types'
import { mockCompanies } from './mockData'

/**
 * Company API
 * Mock 데이터를 사용한 API
 */
export const companyApi = {
  /**
   * 전체 회사 목록 조회
   */
  getCompanies: async (): Promise<Company[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockCompanies
  },

  /**
   * 특정 회사 조회
   */
  getCompany: async (id: number): Promise<Company | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockCompanies.find((c) => c.internalId === id)
  },

  /**
   * 활성화된 회사 목록 조회
   */
  getActiveCompanies: async (): Promise<Company[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockCompanies.filter((c) => c.isActive)
  },
}
