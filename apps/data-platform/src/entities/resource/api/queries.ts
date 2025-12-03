/**
 * Resource API Queries
 */

import { useQuery } from '@tanstack/react-query'
import type { Resource, ResourceFilter } from '../model'

const mockResources: Resource[] = [
  {
    internalId: 1,
    publicId: 'res-uuid-001',
    code: 'TEMP_001',
    categoryInternalId: 1,
    isActive: true,
    name: '엔진 온도계 #A01',
    attributes: {
      resourceType: 'sensor',
      sensor: { sensorType: 'temperature', unit: 'celsius', precision: 0.1, range: { min: -20, max: 120 } },
      threshold: { warning: { min: 60, max: 80 }, critical: { min: 50, max: 90 } },
      mqtt: { topic: 'factory/line1/temp/001', qos: 1 },
    },
    metadata: { tags: ['critical', 'production'], priority: 'high' },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    internalId: 2,
    publicId: 'res-uuid-002',
    code: 'TEMP_002',
    categoryInternalId: 1,
    isActive: true,
    name: '냉각수 온도계 #A02',
    attributes: {
      resourceType: 'sensor',
      sensor: { sensorType: 'temperature', unit: 'celsius', precision: 0.1 },
      mqtt: { topic: 'factory/line1/temp/002', qos: 1 },
    },
    metadata: { tags: ['production'] },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    internalId: 3,
    publicId: 'res-uuid-003',
    code: 'PRESS_001',
    categoryInternalId: 2,
    isActive: true,
    name: '유압 게이지 #B01',
    attributes: {
      resourceType: 'sensor',
      sensor: { sensorType: 'pressure', unit: 'psi', range: { min: 0, max: 1000 } },
      mqtt: { topic: 'factory/line1/pressure/001' },
    },
    metadata: { tags: ['critical'] },
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    internalId: 4,
    publicId: 'res-uuid-004',
    code: 'AC_101',
    categoryInternalId: 3,
    isActive: true,
    name: '1층 에어컨 #AC-101',
    attributes: { resourceType: 'sensor' },
    metadata: { tags: ['hvac'], location: { building: '본관', floor: '1층' } },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
  },
]

export function useResources(filter?: ResourceFilter) {
  return useQuery({
    queryKey: ['resources', filter],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      let filtered = mockResources
      if (filter?.categoryInternalId) {
        filtered = filtered.filter((r) => r.categoryInternalId === filter.categoryInternalId)
      }
      if (filter?.isActive !== undefined) {
        filtered = filtered.filter((r) => r.isActive === filter.isActive)
      }
      return filtered
    },
  })
}

export function useResourcesByCategory(categoryInternalId?: number) {
  return useQuery({
    queryKey: ['resources', 'by-category', categoryInternalId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return mockResources.filter((r) => r.categoryInternalId === categoryInternalId)
    },
    enabled: !!categoryInternalId,
  })
}
