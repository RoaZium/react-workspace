import { useState } from 'react'
import { Box } from '@mui/material'
import { PageLayout, PageHeader, PageContent } from '@workspace/ui'
import { useDataSources } from '@/entities/data-source'
import { useCategories } from '@/entities/category'
import { useResources } from '@/entities/resource'
import type { DataSource } from '@/entities/data-source'
import type { Category } from '@/entities/category'
import type { Resource } from '@/entities/resource'
import { DataHubTree } from './components/DataHubTree'
import { DetailPanel } from './components/DetailPanel'

/**
 * Data Hub 페이지 (최적화 버전)
 *
 * 역할: Data Hub 전용 최적화 UI
 * - 계층 구조를 트리 형태로 표시 (Master-Detail 패턴)
 * - 검색 및 필터링 기능
 * - 상세 정보 패널
 * - 공통 레이아웃을 사용하지 않고 독립적인 최적 UI 구현
 */
export function DataHubPage() {
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [detailType, setDetailType] = useState<'dataSource' | 'category' | 'resource' | null>(null)

  // 모든 데이터 한번에 로드 (트리 구조를 위해)
  const { data: dataSources = [], isLoading: isLoadingDS } = useDataSources()
  const { data: categories = [], isLoading: isLoadingCat } = useCategories()
  const { data: resources = [], isLoading: isLoadingRes } = useResources()

  const handleSelectDataSource = (ds: DataSource) => {
    setSelectedDataSource(ds)
    setSelectedCategory(null)
    setSelectedResource(null)
    setDetailType('dataSource')
  }

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat)
    setSelectedResource(null)
    setDetailType('category')
  }

  const handleSelectResource = (res: Resource) => {
    setSelectedResource(res)
    setDetailType('resource')
  }

  const getDetailData = () => {
    if (detailType === 'dataSource') return selectedDataSource
    if (detailType === 'category') return selectedCategory
    if (detailType === 'resource') return selectedResource
    return null
  }

  const isLoading = isLoadingDS || isLoadingCat || isLoadingRes

  return (
    <PageLayout>
      <PageHeader
        title="데이터 허브 관리"
        description="데이터소스, 카테고리, 리소스를 계층적으로 관리하고 모니터링하세요"
      />

      <PageContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            gap: 2,
            height: '100%',
          }}
        >
          {/* 왼쪽: 계층 구조 트리 */}
          <Box sx={{ height: '100%', overflow: 'hidden' }}>
            <DataHubTree
              dataSources={dataSources}
              categories={categories}
              resources={resources}
              selectedDataSource={selectedDataSource}
              selectedCategory={selectedCategory}
              selectedResource={selectedResource}
              onSelectDataSource={handleSelectDataSource}
              onSelectCategory={handleSelectCategory}
              onSelectResource={handleSelectResource}
            />
          </Box>

          {/* 오른쪽: 상세 정보 패널 */}
          <Box sx={{ height: '100%', overflow: 'hidden' }}>
            <DetailPanel type={detailType} data={getDetailData()} />
          </Box>
        </Box>
      </PageContent>
    </PageLayout>
  )
}
