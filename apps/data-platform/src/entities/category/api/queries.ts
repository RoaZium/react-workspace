import { useQuery } from '@tanstack/react-query'
import type { Category, CategoryFilter } from '../model'

/**
 * 카테고리 목록 조회 (전체)
 */
export const useCategories = (filter?: CategoryFilter) => {
  return useQuery({
    queryKey: ['categories', filter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filter?.dataSourceInternalId) {
        params.append('dataSourceInternalId', String(filter.dataSourceInternalId))
      }
      if (filter?.isActive !== undefined) {
        params.append('isActive', String(filter.isActive))
      }
      if (filter?.search) {
        params.append('search', filter.search)
      }

      const response = await fetch(`/api/categories?${params}`)
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json() as Promise<Category[]>
    },
  })
}

/**
 * 특정 데이터소스의 카테고리 목록 조회
 */
export const useCategoriesByDataSource = (dataSourceInternalId: number | null) => {
  return useQuery({
    queryKey: ['categories', 'by-datasource', dataSourceInternalId],
    queryFn: async () => {
      if (!dataSourceInternalId) return []
      const response = await fetch(`/api/data-sources/${dataSourceInternalId}/categories`)
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json() as Promise<Category[]>
    },
    enabled: !!dataSourceInternalId,
  })
}

/**
 * 단일 카테고리 조회 (by publicId)
 */
export const useCategory = (publicId: string | null) => {
  return useQuery({
    queryKey: ['categories', publicId],
    queryFn: async () => {
      if (!publicId) return null
      const response = await fetch(`/api/categories/${publicId}`)
      if (!response.ok) throw new Error('Failed to fetch category')
      return response.json() as Promise<Category>
    },
    enabled: !!publicId,
  })
}

/**
 * 단일 카테고리 조회 (by internalId)
 */
export const useCategoryById = (internalId: number | null) => {
  return useQuery({
    queryKey: ['categories', 'by-id', internalId],
    queryFn: async () => {
      if (!internalId) return null
      const response = await fetch(`/api/categories/internal/${internalId}`)
      if (!response.ok) throw new Error('Failed to fetch category')
      return response.json() as Promise<Category>
    },
    enabled: !!internalId,
  })
}
