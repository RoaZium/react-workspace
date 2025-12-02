import { useQuery } from '@tanstack/react-query'
import type { Resource, ResourceFilter } from '../model'

/**
 * 리소스 목록 조회 (전체)
 */
export const useResources = (filter?: ResourceFilter) => {
  return useQuery({
    queryKey: ['resources', filter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filter?.categoryInternalId) {
        params.append('categoryInternalId', String(filter.categoryInternalId))
      }
      if (filter?.isActive !== undefined) {
        params.append('isActive', String(filter.isActive))
      }
      if (filter?.search) {
        params.append('search', filter.search)
      }

      const response = await fetch(`/api/resources?${params}`)
      if (!response.ok) throw new Error('Failed to fetch resources')
      return response.json() as Promise<Resource[]>
    },
  })
}

/**
 * 특정 카테고리의 리소스 목록 조회
 */
export const useResourcesByCategory = (categoryInternalId: number | null) => {
  return useQuery({
    queryKey: ['resources', 'by-category', categoryInternalId],
    queryFn: async () => {
      if (!categoryInternalId) return []
      const response = await fetch(`/api/categories/${categoryInternalId}/resources`)
      if (!response.ok) throw new Error('Failed to fetch resources')
      return response.json() as Promise<Resource[]>
    },
    enabled: !!categoryInternalId,
  })
}

/**
 * 단일 리소스 조회 (by publicId)
 */
export const useResource = (publicId: string | null) => {
  return useQuery({
    queryKey: ['resources', publicId],
    queryFn: async () => {
      if (!publicId) return null
      const response = await fetch(`/api/resources/${publicId}`)
      if (!response.ok) throw new Error('Failed to fetch resource')
      return response.json() as Promise<Resource>
    },
    enabled: !!publicId,
  })
}

/**
 * 단일 리소스 조회 (by internalId)
 */
export const useResourceById = (internalId: number | null) => {
  return useQuery({
    queryKey: ['resources', 'by-id', internalId],
    queryFn: async () => {
      if (!internalId) return null
      const response = await fetch(`/api/resources/internal/${internalId}`)
      if (!response.ok) throw new Error('Failed to fetch resource')
      return response.json() as Promise<Resource>
    },
    enabled: !!internalId,
  })
}
