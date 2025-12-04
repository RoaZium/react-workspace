/**
 * Data Source API Queries
 *
 * React Query를 사용한 데이터 출처 조회 API
 */

import { useQuery } from '@tanstack/react-query'
import type { DataSource, DataSourceFilter } from '../model'
import { mockDataSources } from './mockData'

/**
 * 모든 데이터 출처 조회
 */
export function useDataSources(filter?: DataSourceFilter) {
  return useQuery({
    queryKey: ['data-sources', filter],
    queryFn: async () => {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch('/api/data-sources?' + new URLSearchParams(filter))
      // return response.json() as Promise<DataSource[]>

      // Mock 데이터 필터링
      await new Promise((resolve) => setTimeout(resolve, 300)) // 네트워크 지연 시뮬레이션

      let filtered = mockDataSources

      if (filter?.userId) {
        filtered = filtered.filter((ds) => ds.userId === filter.userId)
      }
      if (filter?.isActive !== undefined) {
        filtered = filtered.filter((ds) => ds.isActive === filter.isActive)
      }
      if (filter?.code) {
        filtered = filtered.filter((ds) => ds.code.includes(filter.code))
      }
      if (filter?.name) {
        filtered = filtered.filter((ds) => ds.name.includes(filter.name))
      }

      return filtered
    },
  })
}

/**
 * 단일 데이터 출처 조회 (by public ID)
 */
export function useDataSource(publicId: string) {
  return useQuery({
    queryKey: ['data-source', publicId],
    queryFn: async () => {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch(`/api/data-sources/${publicId}`)
      // return response.json() as Promise<DataSource>

      await new Promise((resolve) => setTimeout(resolve, 200))

      const dataSource = mockDataSources.find((ds) => ds.publicId === publicId)
      if (!dataSource) {
        throw new Error('Data source not found')
      }
      return dataSource
    },
    enabled: !!publicId,
  })
}

/**
 * 데이터 출처 통계 조회
 */
export function useDataSourceStats() {
  return useQuery({
    queryKey: ['data-source-stats'],
    queryFn: async () => {
      // TODO: 실제 API 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 200))

      return {
        total: mockDataSources.length,
        active: mockDataSources.filter((ds) => ds.isActive).length,
        inactive: mockDataSources.filter((ds) => !ds.isActive).length,
        byProtocol: mockDataSources.reduce(
          (acc, ds) => {
            const protocol = ds.attributes.protocol || 'unknown'
            acc[protocol] = (acc[protocol] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        ),
      }
    },
  })
}
