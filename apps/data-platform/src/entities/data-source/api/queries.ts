/**
 * Data Source API Queries
 *
 * React Query를 사용한 데이터 출처 조회 API
 */

import { useQuery } from '@tanstack/react-query'
import type { DataSource, DataSourceFilter } from '../model'

/**
 * Mock 데이터 (실제 구현 시 API 호출로 대체)
 */
const mockDataSources: DataSource[] = [
  {
    internalId: 1,
    publicId: 'ds-uuid-001',
    code: 'FACTORY_LINE_1',
    userId: 'user-001',
    isActive: true,
    name: '1번 생산라인',
    attributes: {
      protocol: 'MQTT',
      host: 'mqtt.example.com',
      port: 1883,
      timeout: 5000,
      retryCount: 3,
    },
    metadata: {
      organization: {
        department: 'Manufacturing',
        manager: '김철수',
        contact: 'kim@example.com',
      },
      tags: ['production', 'critical'],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    internalId: 2,
    publicId: 'ds-uuid-002',
    code: 'BUILDING_MAIN',
    userId: 'user-001',
    isActive: true,
    name: '본관 건물',
    attributes: {
      protocol: 'HTTP',
      host: 'building.example.com',
      port: 80,
      timeout: 3000,
    },
    metadata: {
      organization: {
        department: 'Facilities',
        manager: '이영희',
        contact: 'lee@example.com',
      },
      tags: ['building', 'hvac'],
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    internalId: 3,
    publicId: 'ds-uuid-003',
    code: 'SALES_SYSTEM',
    userId: 'user-002',
    isActive: true,
    name: '판매 데이터 시스템',
    attributes: {
      protocol: 'HTTPS',
      host: 'api.sales.example.com',
      port: 443,
      authType: 'bearer',
    },
    metadata: {
      organization: {
        department: 'Sales',
        manager: '박민수',
        contact: 'park@example.com',
      },
      tags: ['sales', 'api'],
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-20'),
  },
]

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
