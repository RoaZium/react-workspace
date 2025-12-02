import { useQuery } from '@tanstack/react-query'
import type { DataSource, DataSourceFilter } from '../model'

/**
 * 데이터소스 목록 조회
 */
export const useDataSources = (filter?: DataSourceFilter) => {
  return useQuery({
    queryKey: ['data-sources', filter],
    queryFn: async () => {
      // TODO: 실제 API 엔드포인트로 교체
      const params = new URLSearchParams()
      if (filter?.isActive !== undefined) {
        params.append('isActive', String(filter.isActive))
      }
      if (filter?.search) {
        params.append('search', filter.search)
      }

      const response = await fetch(`/api/data-sources?${params}`)
      if (!response.ok) throw new Error('Failed to fetch data sources')
      return response.json() as Promise<DataSource[]>
    },
  })
}

/**
 * 단일 데이터소스 조회 (by publicId)
 */
export const useDataSource = (publicId: string | null) => {
  return useQuery({
    queryKey: ['data-sources', publicId],
    queryFn: async () => {
      if (!publicId) return null
      const response = await fetch(`/api/data-sources/${publicId}`)
      if (!response.ok) throw new Error('Failed to fetch data source')
      return response.json() as Promise<DataSource>
    },
    enabled: !!publicId,
  })
}

/**
 * 단일 데이터소스 조회 (by internalId)
 */
export const useDataSourceById = (internalId: number | null) => {
  return useQuery({
    queryKey: ['data-sources', 'by-id', internalId],
    queryFn: async () => {
      if (!internalId) return null
      const response = await fetch(`/api/data-sources/internal/${internalId}`)
      if (!response.ok) throw new Error('Failed to fetch data source')
      return response.json() as Promise<DataSource>
    },
    enabled: !!internalId,
  })
}
