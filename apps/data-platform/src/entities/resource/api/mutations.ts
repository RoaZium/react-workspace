import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateResourceDto, UpdateResourceDto } from '../model'

/**
 * 리소스 생성
 */
export const useCreateResource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateResourceDto) => {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create resource')
      return response.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({
        queryKey: ['resources', 'by-category', variables.categoryInternalId]
      })
    },
  })
}

/**
 * 리소스 수정
 */
export const useUpdateResource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ publicId, data }: { publicId: string; data: UpdateResourceDto }) => {
      const response = await fetch(`/api/resources/${publicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update resource')
      return response.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      queryClient.invalidateQueries({ queryKey: ['resources', variables.publicId] })
    },
  })
}

/**
 * 리소스 삭제
 */
export const useDeleteResource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (publicId: string) => {
      const response = await fetch(`/api/resources/${publicId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete resource')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
    },
  })
}
