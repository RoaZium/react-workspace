# Domain: Data Hub

> Data Hub 도메인 로직 및 비즈니스 규칙 (프로젝트별 커스텀)

## 목차

1. [Data Hub 개요](#1-data-hub-개요)
2. [도메인 엔티티](#2-도메인-엔티티)
3. [비즈니스 로직](#3-비즈니스-로직)
4. [API 통합](#4-api-통합)
5. [상태 관리](#5-상태-관리)

---

## 1. Data Hub 개요

### 1.1 Data Hub란?

데이터 수집, 변환, 분석을 위한 플랫폼

**주요 기능**:
- 데이터 소스 연결 관리
- 데이터 파이프라인 실행
- 데이터 품질 모니터링
- 메타데이터 관리

---

### 1.2 도메인 구조

```
src/entities/
├── data-source/        # 데이터 소스
├── pipeline/           # 파이프라인
├── dataset/            # 데이터셋
└── metadata/           # 메타데이터
```

---

## 2. 도메인 엔티티

### 2.1 DataSource (데이터 소스)

**위치**: `src/entities/data-source/model/types.ts`

```typescript
export interface DataSource {
  id: string
  name: string
  type: 'database' | 'api' | 'file' | 'stream'
  connectionInfo: ConnectionInfo
  status: 'active' | 'inactive' | 'error'
  createdAt: string
  updatedAt: string
}

export interface ConnectionInfo {
  host?: string
  port?: number
  database?: string
  username?: string
  // password는 노출하지 않음
}

export interface DataSourceCreatePayload {
  name: string
  type: DataSource['type']
  connectionInfo: ConnectionInfo
}
```

---

### 2.2 Pipeline (파이프라인)

**위치**: `src/entities/pipeline/model/types.ts`

```typescript
export interface Pipeline {
  id: string
  name: string
  description: string
  sourceId: string
  targetId: string
  schedule: string // cron expression
  status: 'running' | 'stopped' | 'failed'
  lastRunAt?: string
  createdAt: string
}

export interface PipelineRun {
  id: string
  pipelineId: string
  status: 'pending' | 'running' | 'success' | 'failed'
  startedAt: string
  completedAt?: string
  error?: string
  recordsProcessed: number
}
```

---

### 2.3 Dataset (데이터셋)

**위치**: `src/entities/dataset/model/types.ts`

```typescript
export interface Dataset {
  id: string
  name: string
  sourceId: string
  schema: DatasetSchema[]
  rowCount: number
  sizeBytes: number
  createdAt: string
  updatedAt: string
}

export interface DatasetSchema {
  name: string
  type: 'string' | 'number' | 'boolean' | 'date'
  nullable: boolean
  description?: string
}
```

---

## 3. 비즈니스 로직

### 3.1 파이프라인 실행

**위치**: `src/entities/pipeline/model/executePipeline.ts`

```typescript
export interface PipelineExecutionResult {
  success: boolean
  recordsProcessed: number
  duration: number
  error?: string
}

export const executePipeline = async (
  pipelineId: string
): Promise<PipelineExecutionResult> => {
  const startTime = Date.now()

  try {
    // 1. 파이프라인 정보 조회
    const pipeline = await pipelineApi.getPipeline(pipelineId)

    // 2. 소스에서 데이터 읽기
    const sourceData = await dataSourceApi.readData(pipeline.sourceId)

    // 3. 데이터 변환
    const transformedData = transformData(sourceData, pipeline.transformRules)

    // 4. 타겟에 데이터 쓰기
    await dataSourceApi.writeData(pipeline.targetId, transformedData)

    return {
      success: true,
      recordsProcessed: transformedData.length,
      duration: Date.now() - startTime,
    }
  } catch (error) {
    return {
      success: false,
      recordsProcessed: 0,
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

---

### 3.2 데이터 검증

**위치**: `src/entities/dataset/model/validateData.ts`

```typescript
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export interface ValidationError {
  row: number
  column: string
  message: string
}

export const validateData = (
  data: Record<string, any>[],
  schema: DatasetSchema[]
): ValidationResult => {
  const errors: ValidationError[] = []

  data.forEach((row, rowIndex) => {
    schema.forEach((field) => {
      const value = row[field.name]

      // Nullable 체크
      if (!field.nullable && (value === null || value === undefined)) {
        errors.push({
          row: rowIndex,
          column: field.name,
          message: `${field.name} cannot be null`,
        })
      }

      // 타입 체크
      if (value !== null && typeof value !== field.type) {
        errors.push({
          row: rowIndex,
          column: field.name,
          message: `${field.name} must be ${field.type}`,
        })
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}
```

---

## 4. API 통합

### 4.1 DataSource API

**위치**: `src/entities/data-source/api/dataSourceApi.ts`

```typescript
import { apiClient } from '@workspace/shared-api'
import type { DataSource, DataSourceCreatePayload } from '../model/types'

export const dataSourceApi = {
  getDataSources: async (): Promise<DataSource[]> => {
    const response = await apiClient.get<DataSource[]>('/data-sources')
    return response.data
  },

  getDataSource: async (id: string): Promise<DataSource> => {
    const response = await apiClient.get<DataSource>(`/data-sources/${id}`)
    return response.data
  },

  createDataSource: async (payload: DataSourceCreatePayload): Promise<DataSource> => {
    const response = await apiClient.post<DataSource>('/data-sources', payload)
    return response.data
  },

  testConnection: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post(`/data-sources/${id}/test`)
    return response.data
  },
}
```

---

### 4.2 React Query Hooks

**위치**: `src/entities/data-source/api/queries.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dataSourceApi } from './dataSourceApi'

export const useDataSources = () => {
  return useQuery({
    queryKey: ['dataSources'],
    queryFn: dataSourceApi.getDataSources,
  })
}

export const useDataSource = (id: string) => {
  return useQuery({
    queryKey: ['dataSources', id],
    queryFn: () => dataSourceApi.getDataSource(id),
    enabled: !!id,
  })
}

export const useCreateDataSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dataSourceApi.createDataSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataSources'] })
    },
  })
}

export const useTestConnection = () => {
  return useMutation({
    mutationFn: dataSourceApi.testConnection,
  })
}
```

---

## 5. 상태 관리

### 5.1 Pipeline Store

**위치**: `src/entities/pipeline/model/pipelineStore.ts`

```typescript
import { create } from 'zustand'
import type { Pipeline } from './types'

interface PipelineState {
  selectedPipeline: Pipeline | null
  isRunning: boolean
  setSelectedPipeline: (pipeline: Pipeline | null) => void
  setIsRunning: (isRunning: boolean) => void
}

export const usePipelineStore = create<PipelineState>((set) => ({
  selectedPipeline: null,
  isRunning: false,
  setSelectedPipeline: (pipeline) => set({ selectedPipeline: pipeline }),
  setIsRunning: (isRunning) => set({ isRunning }),
}))
```

---

## 6. 페이지 구현 예시

### 6.1 DataSource 목록 페이지

**위치**: `src/pages/data-sources/DataSourceListPage.tsx`

```typescript
import { Box, Typography, Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useDataSources } from '@/entities/data-source'
import { DataSourceTable } from '@/widgets/data-source-table'

export const DataSourceListPage = () => {
  const { data: dataSources, isLoading } = useDataSources()

  if (isLoading) return <div>Loading...</div>

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Data Sources</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Data Source
        </Button>
      </Stack>

      <DataSourceTable dataSources={dataSources || []} />
    </Box>
  )
}
```

---

## 7. 참고

이 문서는 **Data Hub 프로젝트 전용**입니다. 다른 도메인(예: E-Commerce, CRM)은 별도의 도메인 문서를 작성하세요.

---

