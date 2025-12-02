import { useState } from 'react'
import {
  Button,
  PageLayout,
  PageHeader,
  PageContent,
  Card,
  ThreeColumnHierarchyLayout,
} from '@workspace/ui'
import { useDataSources, DataSourceTable } from '@/entities/data-source'
import { useCategoriesByDataSource, CategoryTable } from '@/entities/category'
import { useResourcesByCategory, ResourceTable, ResourceDetail } from '@/entities/resource'
import type { DataSource } from '@/entities/data-source'
import type { Category } from '@/entities/category'
import type { Resource } from '@/entities/resource'
import './DataHubPage.css'

/**
 * Data Hub 페이지 (FSD: pages 레이어)
 *
 * 역할: 조합만 담당 (Composition Layer)
 * - entities의 UI 컴포넌트 조합
 * - entities의 API hooks 사용
 * - 페이지 레벨 상태 관리 (선택 상태)
 */
export function DataHubPage() {
  // 페이지 레벨 상태 (선택된 항목)
  const [selectedDatasource, setSelectedDatasource] = useState<DataSource | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  // API 호출 (entities의 hooks 사용)
  const { data: dataSources = [], isLoading: isLoadingDS } = useDataSources()
  const { data: categories = [], isLoading: isLoadingCat } = useCategoriesByDataSource(
    selectedDatasource?.internalId ?? null
  )
  const { data: resources = [], isLoading: isLoadingRes } = useResourcesByCategory(
    selectedCategory?.internalId ?? null
  )

  return (
    <PageLayout>
      <PageHeader
        title="데이터 허브 관리"
        description="데이터소스, 카테고리, 리소스를 계층적으로 관리하고 모니터링하세요"
        actions={
          <>
            <Button variant="secondary" size="medium">
              새로고침
            </Button>
            <Button variant="secondary" size="medium">
              가져오기
            </Button>
            <Button variant="primary" size="medium">
              데이터소스 추가
            </Button>
          </>
        }
      />

      <PageContent>
        <ThreeColumnHierarchyLayout gap="medium">
          {/* 1단계: 데이터소스 (대) */}
          <ThreeColumnHierarchyLayout.Column width="28%">
            <div className="column-header">
              <h3 className="column-title">데이터소스</h3>
              <span className="column-count">{dataSources.length}</span>
            </div>
            <Card padding="none">
              {isLoadingDS ? (
                <div className="empty-state">
                  <p>로딩 중...</p>
                </div>
              ) : dataSources.length > 0 ? (
                <DataSourceTable
                  data={dataSources}
                  selectedRow={selectedDatasource}
                  onRowClick={(ds) => {
                    setSelectedDatasource(ds)
                    setSelectedCategory(null)
                    setSelectedResource(null)
                  }}
                />
              ) : (
                <div className="empty-state">
                  <p>데이터소스가 없습니다</p>
                </div>
              )}
            </Card>
          </ThreeColumnHierarchyLayout.Column>

          {/* 2단계: 카테고리 (중) */}
          <ThreeColumnHierarchyLayout.Column width="28%">
            <div className="column-header">
              <h3 className="column-title">카테고리</h3>
              <span className="column-count">{categories.length}</span>
            </div>
            <Card padding="none">
              {!selectedDatasource ? (
                <div className="empty-state">
                  <p>데이터소스를 선택하세요</p>
                </div>
              ) : isLoadingCat ? (
                <div className="empty-state">
                  <p>로딩 중...</p>
                </div>
              ) : categories.length > 0 ? (
                <CategoryTable
                  data={categories}
                  selectedRow={selectedCategory}
                  onRowClick={(cat) => {
                    setSelectedCategory(cat)
                    setSelectedResource(null)
                  }}
                />
              ) : (
                <div className="empty-state">
                  <p>카테고리가 없습니다</p>
                </div>
              )}
            </Card>
          </ThreeColumnHierarchyLayout.Column>

          {/* 3단계: 리소스 (소) - 리스트와 상세 */}
          <ThreeColumnHierarchyLayout.Detail>
            <div className="column-header">
              <h3 className="column-title">리소스</h3>
              <span className="column-count">{resources.length}</span>
            </div>

            {!selectedCategory ? (
              <Card>
                <div className="empty-state">
                  <p>카테고리를 선택하세요</p>
                </div>
              </Card>
            ) : (
              <>
                {/* 리소스 리스트 */}
                <ThreeColumnHierarchyLayout.List>
                  {isLoadingRes ? (
                    <div className="empty-state">
                      <p>로딩 중...</p>
                    </div>
                  ) : resources.length > 0 ? (
                    <ResourceTable
                      data={resources}
                      selectedRow={selectedResource}
                      onRowClick={setSelectedResource}
                    />
                  ) : (
                    <div className="empty-state">
                      <p>리소스가 없습니다</p>
                    </div>
                  )}
                </ThreeColumnHierarchyLayout.List>

                {/* 리소스 상세 */}
                {selectedResource && (
                  <ThreeColumnHierarchyLayout.Content>
                    <ResourceDetail
                      resource={selectedResource}
                      dataSourceName={selectedDatasource?.name}
                      categoryName={selectedCategory?.name}
                    />
                  </ThreeColumnHierarchyLayout.Content>
                )}
              </>
            )}
          </ThreeColumnHierarchyLayout.Detail>
        </ThreeColumnHierarchyLayout>
      </PageContent>
    </PageLayout>
  )
}
