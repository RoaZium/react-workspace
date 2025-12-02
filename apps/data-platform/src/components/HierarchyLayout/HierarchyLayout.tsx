import { PageLayout, PageHeader, PageContent, Card, Table } from '@workspace/ui'
import type { HierarchyLayoutProps } from './types'
import './HierarchyLayout.css'

export function HierarchyLayout({
  datasources,
  categories,
  resources,
  selectedDatasource,
  selectedCategory,
  selectedResource,
  onDatasourceSelect,
  onCategorySelect,
  onResourceSelect,
  renderDatasourceItem,
  renderCategoryItem,
  renderResourceDetail,
  datasourceColumns,
  categoryColumns,
  resourceColumns,
  datasourceWidth = '30%',
  categoryWidth = '30%',
  showEmptyState = true,
  title,
  description,
  actions,
}: HierarchyLayoutProps) {
  // 선택된 데이터소스에 속한 카테고리 필터링
  const filteredCategories = selectedDatasource
    ? categories.filter((cat) => cat.datasourceId === selectedDatasource.id)
    : []

  // 선택된 카테고리에 속한 리소스 필터링
  const filteredResources = selectedCategory
    ? resources.filter((res) => res.categoryId === selectedCategory.id)
    : []

  // 기본 컬럼 설정
  const defaultDatasourceColumns = datasourceColumns || [
    { key: 'name', header: '데이터소스', width: '100%' },
  ]

  const defaultCategoryColumns = categoryColumns || [
    { key: 'name', header: '카테고리', width: '80%' },
    { key: 'count', header: '개수', width: '20%' },
  ]

  const defaultResourceColumns = resourceColumns || [
    { key: 'name', header: '리소스', width: '60%' },
    { key: 'type', header: '타입', width: '20%' },
    { key: 'status', header: '상태', width: '20%' },
  ]

  return (
    <PageLayout>
      {(title || description || actions) && (
        <PageHeader title={title || ''} description={description} actions={actions} />
      )}

      <PageContent>
        <div className="hierarchy-layout">
          {/* 1단계: 데이터소스 (대) */}
          <div className="hierarchy-layout__column" style={{ width: datasourceWidth }}>
            <div className="hierarchy-layout__column-header">
              <h3 className="hierarchy-layout__column-title">데이터소스</h3>
              <span className="hierarchy-layout__column-count">{datasources.length}</span>
            </div>
            <Card padding="none" className="hierarchy-layout__card">
              {datasources.length > 0 ? (
                <Table
                  data={datasources}
                  columns={defaultDatasourceColumns}
                  onRowClick={onDatasourceSelect}
                  selectedRow={selectedDatasource}
                />
              ) : (
                showEmptyState && (
                  <div className="hierarchy-layout__empty">
                    <p>데이터소스가 없습니다</p>
                  </div>
                )
              )}
            </Card>
          </div>

          {/* 2단계: 카테고리 (중) */}
          <div className="hierarchy-layout__column" style={{ width: categoryWidth }}>
            <div className="hierarchy-layout__column-header">
              <h3 className="hierarchy-layout__column-title">카테고리</h3>
              <span className="hierarchy-layout__column-count">{filteredCategories.length}</span>
            </div>
            <Card padding="none" className="hierarchy-layout__card">
              {selectedDatasource ? (
                filteredCategories.length > 0 ? (
                  <Table
                    data={filteredCategories}
                    columns={defaultCategoryColumns}
                    onRowClick={onCategorySelect}
                    selectedRow={selectedCategory}
                  />
                ) : (
                  showEmptyState && (
                    <div className="hierarchy-layout__empty">
                      <p>카테고리가 없습니다</p>
                    </div>
                  )
                )
              ) : (
                showEmptyState && (
                  <div className="hierarchy-layout__empty">
                    <p>데이터소스를 선택하세요</p>
                  </div>
                )
              )}
            </Card>
          </div>

          {/* 3단계: 리소스 (소) - 리스트와 상세 */}
          <div className="hierarchy-layout__column hierarchy-layout__column--flex">
            <div className="hierarchy-layout__column-header">
              <h3 className="hierarchy-layout__column-title">리소스</h3>
              <span className="hierarchy-layout__column-count">{filteredResources.length}</span>
            </div>

            {selectedCategory ? (
              <div className="hierarchy-layout__split">
                {/* 리소스 리스트 */}
                <Card padding="none" className="hierarchy-layout__card hierarchy-layout__resource-list">
                  {filteredResources.length > 0 ? (
                    <Table
                      data={filteredResources}
                      columns={defaultResourceColumns}
                      onRowClick={onResourceSelect}
                      selectedRow={selectedResource}
                    />
                  ) : (
                    showEmptyState && (
                      <div className="hierarchy-layout__empty">
                        <p>리소스가 없습니다</p>
                      </div>
                    )
                  )}
                </Card>

                {/* 리소스 상세 */}
                {selectedResource && (
                  <Card className="hierarchy-layout__card hierarchy-layout__resource-detail">
                    {renderResourceDetail ? (
                      renderResourceDetail(selectedResource)
                    ) : (
                      <div className="hierarchy-layout__detail">
                        <h2 className="hierarchy-layout__detail-title">{selectedResource.name}</h2>
                        <div className="hierarchy-layout__detail-section">
                          {Object.entries(selectedResource).map(
                            ([key, value]) =>
                              key !== 'id' &&
                              key !== 'data' && (
                                <div key={key} className="hierarchy-layout__detail-row">
                                  <span className="hierarchy-layout__detail-label">
                                    {key}:
                                  </span>
                                  <span className="hierarchy-layout__detail-value">
                                    {String(value)}
                                  </span>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            ) : (
              showEmptyState && (
                <Card className="hierarchy-layout__card">
                  <div className="hierarchy-layout__empty">
                    <p>카테고리를 선택하세요</p>
                  </div>
                </Card>
              )
            )}
          </div>
        </div>
      </PageContent>
    </PageLayout>
  )
}
