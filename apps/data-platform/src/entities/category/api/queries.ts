/**
 * Category API Queries
 */

import { useQuery } from '@tanstack/react-query'
import type { Category, CategoryFilter } from '../model'

const mockCategories: Category[] = [
  {
    internalId: 1,
    publicId: 'cat-uuid-001',
    code: 'TEMP_SENSORS',
    dataSourceInternalId: 1,
    isActive: true,
    name: '온도 센서군',
    description: '생산라인 온도 측정 센서',
    attributes: {},
    metadata: { tags: ['temperature', 'sensor'] },
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    internalId: 2,
    publicId: 'cat-uuid-002',
    code: 'PRESSURE_SENSORS',
    dataSourceInternalId: 1,
    isActive: true,
    name: '압력 센서군',
    description: '유압 시스템 압력 측정',
    attributes: {},
    metadata: { tags: ['pressure', 'sensor'] },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    internalId: 3,
    publicId: 'cat-uuid-003',
    code: 'HVAC_EQUIPMENT',
    dataSourceInternalId: 2,
    isActive: true,
    name: 'HVAC 장비',
    description: '냉난방 공조 장비',
    attributes: {},
    metadata: { tags: ['hvac', 'building'] },
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    internalId: 4,
    publicId: 'cat-uuid-004',
    code: 'POWER_METERS',
    dataSourceInternalId: 2,
    isActive: true,
    name: '전력 계측기',
    description: '건물 전력 사용량 측정',
    attributes: {},
    metadata: { tags: ['power', 'meter'] },
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-14'),
  },
]

export function useCategories(filter?: CategoryFilter) {
  return useQuery({
    queryKey: ['categories', filter],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))

      let filtered = mockCategories
      if (filter?.dataSourceInternalId) {
        filtered = filtered.filter((c) => c.dataSourceInternalId === filter.dataSourceInternalId)
      }
      if (filter?.isActive !== undefined) {
        filtered = filtered.filter((c) => c.isActive === filter.isActive)
      }

      return filtered
    },
  })
}

export function useCategoriesByDataSource(dataSourceInternalId?: number) {
  return useQuery({
    queryKey: ['categories', 'by-source', dataSourceInternalId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return mockCategories.filter((c) => c.dataSourceInternalId === dataSourceInternalId)
    },
    enabled: !!dataSourceInternalId,
  })
}
