/**
 * Category API Queries
 */

import { useQuery } from '@tanstack/react-query'
import type { Category, CategoryFilter } from '../model'
import { mockCategories } from './mockData'


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
