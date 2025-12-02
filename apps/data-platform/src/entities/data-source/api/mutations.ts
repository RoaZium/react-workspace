import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateDataSourceDto, UpdateDataSourceDto } from '../model'

/**
 * 데이터소스 생성
 */
export const useCreateDataSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateDataSourceDto) => {
      const response = await fetch('/api/data-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create data source')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
    },
  })
}

/**
 * 데이터소스 수정
 */
export const useUpdateDataSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ publicId, data }: { publicId: string; data: UpdateDataSourceDto }) => {
      const response = await fetch(`/api/data-sources/${publicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update data source')
      return response.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
      queryClient.invalidateQueries({ queryKey: ['data-sources', variables.publicId] })
    },
  })
}

/**
 * 데이터소스 삭제
 */
export const useDeleteDataSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (publicId: string) => {
      const response = await fetch(`/api/data-sources/${publicId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete data source')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
    },
  })
}

/**
 * 데이터소스 활성화/비활성화 토글
 */
export const useToggleDataSourceActive = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ publicId, isActive }: { publicId: string; isActive: boolean }) => {
      const response = await fetch(`/api/data-sources/${publicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      })
      if (!response.ok) throw new Error('Failed to toggle data source active status')
      return response.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
      queryClient.invalidateQueries({ queryKey: ['data-sources', variables.publicId] })
    },
  })
}
