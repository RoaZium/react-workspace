/**
 * Data Source API Mutations
 *
 * React Query를 사용한 데이터 출처 변경(생성/수정/삭제) API
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { DataSource, CreateDataSourceDto, UpdateDataSourceDto } from '../model'

/**
 * 데이터 출처 생성
 */
export function useCreateDataSource() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateDataSourceDto): Promise<DataSource> => {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch('/api/data-sources', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      // return response.json()

      // Mock 구현 (시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newDataSource: DataSource = {
        internalId: Date.now(),
        publicId: `ds-uuid-${Date.now()}`,
        code: data.code,
        userId: data.userId,
        isActive: true,
        name: data.name,
        attributes: data.attributes || {},
        metadata: data.metadata || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return newDataSource
    },
    onSuccess: () => {
      // 성공 시 목록 쿼리를 무효화하여 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
    },
  })
}

/**
 * 데이터 출처 수정
 */
export function useUpdateDataSource() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      publicId,
      data,
    }: {
      publicId: string
      data: UpdateDataSourceDto
    }): Promise<DataSource> => {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch(`/api/data-sources/${publicId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      // return response.json()

      // Mock 구현
      await new Promise((resolve) => setTimeout(resolve, 500))
      throw new Error('Mock: Update not implemented yet')
    },
    onSuccess: (updatedDataSource) => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
      // 개별 항목 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['data-source', updatedDataSource.publicId] })
    },
  })
}

/**
 * 데이터 출처 삭제
 */
export function useDeleteDataSource() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (publicId: string): Promise<void> => {
      // TODO: 실제 API 호출로 교체
      // await fetch(`/api/data-sources/${publicId}`, {
      //   method: 'DELETE',
      // })

      // Mock 구현
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    onSuccess: () => {
      // 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
    },
  })
}

/**
 * 데이터 출처 활성화/비활성화 토글
 */
export function useToggleDataSourceActive() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      publicId,
      isActive,
    }: {
      publicId: string
      isActive: boolean
    }): Promise<DataSource> => {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch(`/api/data-sources/${publicId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ isActive }),
      // })
      // return response.json()

      // Mock 구현
      await new Promise((resolve) => setTimeout(resolve, 300))
      throw new Error('Mock: Toggle not implemented yet')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data-sources'] })
    },
  })
}
