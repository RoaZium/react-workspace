/**
 * Resource API Queries
 */

import { useQuery } from '@tanstack/react-query'
import type { Resource, ResourceFilter } from '../model'
import { mockResources } from './mockData'

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
