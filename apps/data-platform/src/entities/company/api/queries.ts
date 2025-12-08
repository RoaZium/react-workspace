import { useQuery } from '@tanstack/react-query'
import { companyApi } from './companyApi'

/**
 * 전체 회사 목록 조회 Hook
 */
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: companyApi.getCompanies,
  })
}

/**
 * 특정 회사 조회 Hook
 */
export const useCompany = (id: number) => {
  return useQuery({
    queryKey: ['companies', id],
    queryFn: () => companyApi.getCompany(id),
    enabled: !!id,
  })
}

/**
 * 활성화된 회사 목록 조회 Hook
 */
export const useActiveCompanies = () => {
  return useQuery({
    queryKey: ['companies', 'active'],
    queryFn: companyApi.getActiveCompanies,
  })
}
