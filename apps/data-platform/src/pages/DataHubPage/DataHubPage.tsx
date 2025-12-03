import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { PageLayout, PageHeader, PageContent, TwoColumnPlusSplitLayout } from '@workspace/ui'
import { useDataSources, DataSourceTable } from '@/entities/data-source'
import { useCategoriesByDataSource, CategoryTable } from '@/entities/category'
import { useResourcesByCategory, ResourceTable, ResourceDetail } from '@/entities/resource'
import type { DataSource } from '@/entities/data-source'
import type { Category } from '@/entities/category'
import type { Resource } from '@/entities/resource'

/**
 * Data Hub 페이지 (FSD + DDD)
 *
 * 역할: 조합만 담당 (Composition Layer)
 * - entities의 UI 컴포넌트 조합
 * - entities의 API hooks 사용
 * - 페이지 레벨 상태 관리 (선택 상태)
 * - @workspace/ui의 TwoColumnPlusSplitLayout 와이어프레임 사용 (2개 전체 높이 열 + 1개 분할 열)
 */
export function DataHubPage() {
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const { data: dataSources = [], isLoading: isLoadingDS } = useDataSources()
  const { data: categories = [] } = useCategoriesByDataSource(selectedDataSource?.internalId)
  const { data: resources = [] } = useResourcesByCategory(selectedCategory?.internalId)

  return (
    <PageLayout>
      <PageHeader
        title="데이터 허브 관리"
        description="데이터소스, 카테고리, 리소스를 계층적으로 관리하고 모니터링하세요"
      />

      <PageContent>
        <TwoColumnPlusSplitLayout column1Width="25%" column2Width="25%" splitTopHeight="40%">
          {/* Column 1: 데이터소스 (전체 높이) */}
          <TwoColumnPlusSplitLayout.Column1 title="데이터소스" count={dataSources.length}>
            <DataSourceTable
              data={dataSources}
              isLoading={isLoadingDS}
              selectedId={selectedDataSource?.internalId}
              onRowClick={(ds) => {
                setSelectedDataSource(ds)
                setSelectedCategory(null)
                setSelectedResource(null)
              }}
            />
          </TwoColumnPlusSplitLayout.Column1>

          {/* Column 2: 카테고리 (전체 높이) */}
          <TwoColumnPlusSplitLayout.Column2 title="카테고리" count={categories.length}>
            {!selectedDataSource ? (
              <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                데이터소스를 선택하세요
              </Typography>
            ) : (
              <CategoryTable
                data={categories}
                selectedRow={selectedCategory}
                onRowClick={(cat) => {
                  setSelectedCategory(cat)
                  setSelectedResource(null)
                }}
              />
            )}
          </TwoColumnPlusSplitLayout.Column2>

          {/* 분할 영역 상단: 리소스 목록 */}
          <TwoColumnPlusSplitLayout.SplitTop title="리소스" count={resources.length}>
            {!selectedCategory ? (
              <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                카테고리를 선택하세요
              </Typography>
            ) : (
              <ResourceTable
                data={resources}
                selectedRow={selectedResource}
                onRowClick={setSelectedResource}
              />
            )}
          </TwoColumnPlusSplitLayout.SplitTop>

          {/* 분할 영역 하단: 리소스 상세 - 항상 표시 */}
          <TwoColumnPlusSplitLayout.SplitBottom title="리소스 상세" emptyMessage="리소스를 선택하세요">
            {selectedResource && (
              <Box sx={{ p: 2 }}>
                <ResourceDetail
                  resource={selectedResource}
                  dataSourceName={selectedDataSource?.name}
                  categoryName={selectedCategory?.name}
                />
              </Box>
            )}
          </TwoColumnPlusSplitLayout.SplitBottom>
        </TwoColumnPlusSplitLayout>
      </PageContent>
    </PageLayout>
  )
}
