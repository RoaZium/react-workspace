import { useState } from 'react'
import { Button } from '@workspace/ui'
import { HierarchyLayout } from '@/components/HierarchyLayout'
import type { DatasourceItem, CategoryItem, ResourceItem } from '@/components/HierarchyLayout'
import './DataHubPage.css'

// Mock 데이터소스 (대)
const mockDatasources: DatasourceItem[] = [
  { id: 1, name: 'MySQL Production', type: 'MySQL', status: 'Connected', description: '운영 데이터베이스' },
  { id: 2, name: 'PostgreSQL Analytics', type: 'PostgreSQL', status: 'Connected', description: '분석용 데이터베이스' },
  { id: 3, name: 'MongoDB Logs', type: 'MongoDB', status: 'Disconnected', description: '로그 저장소' },
  { id: 4, name: 'S3 Data Lake', type: 'S3', status: 'Connected', description: '데이터 레이크' },
]

// Mock 카테고리 (중)
const mockCategories: CategoryItem[] = [
  { id: 11, datasourceId: 1, name: 'Users', count: 25, icon: '👥' },
  { id: 12, datasourceId: 1, name: 'Orders', count: 42, icon: '🛒' },
  { id: 13, datasourceId: 1, name: 'Products', count: 18, icon: '📦' },
  { id: 21, datasourceId: 2, name: 'Analytics', count: 15, icon: '📊' },
  { id: 22, datasourceId: 2, name: 'Reports', count: 8, icon: '📈' },
  { id: 31, datasourceId: 3, name: 'Application Logs', count: 1250, icon: '📝' },
  { id: 32, datasourceId: 3, name: 'System Logs', count: 820, icon: '⚙️' },
  { id: 41, datasourceId: 4, name: 'Raw Data', count: 152, icon: '💾' },
  { id: 42, datasourceId: 4, name: 'Processed Data', count: 89, icon: '✨' },
]

// Mock 리소스 (소)
const mockResources: ResourceItem[] = [
  // Users 카테고리
  { id: 111, categoryId: 11, datasourceId: 1, name: 'user_profiles', type: 'Table', status: 'Active', records: '1.2M' },
  { id: 112, categoryId: 11, datasourceId: 1, name: 'user_sessions', type: 'Table', status: 'Active', records: '5.8M' },
  { id: 113, categoryId: 11, datasourceId: 1, name: 'user_preferences', type: 'Table', status: 'Active', records: '850K' },

  // Orders 카테고리
  { id: 121, categoryId: 12, datasourceId: 1, name: 'orders', type: 'Table', status: 'Active', records: '3.5M' },
  { id: 122, categoryId: 12, datasourceId: 1, name: 'order_items', type: 'Table', status: 'Active', records: '12M' },
  { id: 123, categoryId: 12, datasourceId: 1, name: 'order_status_history', type: 'Table', status: 'Active', records: '8.2M' },

  // Products 카테고리
  { id: 131, categoryId: 13, datasourceId: 1, name: 'products', type: 'Table', status: 'Active', records: '125K' },
  { id: 132, categoryId: 13, datasourceId: 1, name: 'product_categories', type: 'Table', status: 'Active', records: '2.5K' },
  { id: 133, categoryId: 13, datasourceId: 1, name: 'product_inventory', type: 'Table', status: 'Active', records: '125K' },

  // Analytics 카테고리
  { id: 211, categoryId: 21, datasourceId: 2, name: 'daily_sales', type: 'View', status: 'Active', records: '365' },
  { id: 212, categoryId: 21, datasourceId: 2, name: 'user_behavior', type: 'View', status: 'Active', records: '1.2M' },

  // Reports 카테고리
  { id: 221, categoryId: 22, datasourceId: 2, name: 'monthly_revenue', type: 'View', status: 'Active', records: '36' },
  { id: 222, categoryId: 22, datasourceId: 2, name: 'top_products', type: 'View', status: 'Active', records: '100' },

  // Application Logs
  { id: 311, categoryId: 31, datasourceId: 3, name: 'api_logs', type: 'Collection', status: 'Active', records: '15M' },
  { id: 312, categoryId: 31, datasourceId: 3, name: 'error_logs', type: 'Collection', status: 'Active', records: '250K' },

  // System Logs
  { id: 321, categoryId: 32, datasourceId: 3, name: 'system_events', type: 'Collection', status: 'Active', records: '8.5M' },

  // Raw Data
  { id: 411, categoryId: 41, datasourceId: 4, name: 'customer_data_raw', type: 'S3 Bucket', status: 'Active', size: '2.5TB' },
  { id: 412, categoryId: 41, datasourceId: 4, name: 'transaction_logs_raw', type: 'S3 Bucket', status: 'Active', size: '5.8TB' },

  // Processed Data
  { id: 421, categoryId: 42, datasourceId: 4, name: 'customer_data_processed', type: 'S3 Bucket', status: 'Active', size: '850GB' },
  { id: 422, categoryId: 42, datasourceId: 4, name: 'analytics_ready', type: 'S3 Bucket', status: 'Active', size: '1.2TB' },
]

export function DataHubPage() {
  const [selectedDatasource, setSelectedDatasource] = useState<DatasourceItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null)

  // 데이터소스 컬럼 설정
  const datasourceColumns = [
    { key: 'name', header: '이름', width: '50%' },
    { key: 'type', header: '타입', width: '25%' },
    {
      key: 'status',
      header: '상태',
      width: '25%',
      render: (item: DatasourceItem) => (
        <span className={`status-badge status-${item.status?.toLowerCase()}`}>
          {item.status}
        </span>
      ),
    },
  ]

  // 카테고리 컬럼 설정
  const categoryColumns = [
    {
      key: 'name',
      header: '카테고리',
      width: '70%',
      render: (item: CategoryItem) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ),
    },
    { key: 'count', header: '개수', width: '30%' },
  ]

  // 리소스 컬럼 설정
  const resourceColumns = [
    { key: 'name', header: '리소스명', width: '50%' },
    { key: 'type', header: '타입', width: '25%' },
    {
      key: 'status',
      header: '상태',
      width: '25%',
      render: (item: ResourceItem) => (
        <span className={`status-badge status-${item.status?.toLowerCase()}`}>
          {item.status}
        </span>
      ),
    },
  ]

  // 리소스 상세 정보 렌더링
  const renderResourceDetail = (resource: ResourceItem) => (
    <div className="resource-detail">
      <h2 className="detail-title">{resource.name}</h2>

      <div className="detail-section">
        <h3 className="detail-section-title">기본 정보</h3>
        <div className="detail-row">
          <span className="detail-label">리소스명:</span>
          <span className="detail-value">{resource.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">타입:</span>
          <span className="detail-value">{resource.type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">상태:</span>
          <span className={`status-badge status-${resource.status?.toLowerCase()}`}>
            {resource.status}
          </span>
        </div>
        {resource.records && (
          <div className="detail-row">
            <span className="detail-label">레코드 수:</span>
            <span className="detail-value">{resource.records}</span>
          </div>
        )}
        {resource.size && (
          <div className="detail-row">
            <span className="detail-label">크기:</span>
            <span className="detail-value">{resource.size}</span>
          </div>
        )}
      </div>

      <div className="detail-section">
        <h3 className="detail-section-title">위치 정보</h3>
        <div className="detail-row">
          <span className="detail-label">데이터소스:</span>
          <span className="detail-value">
            {mockDatasources.find(d => d.id === resource.datasourceId)?.name}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">카테고리:</span>
          <span className="detail-value">
            {mockCategories.find(c => c.id === resource.categoryId)?.name}
          </span>
        </div>
      </div>

      <div className="detail-actions">
        <Button variant="primary">쿼리 실행</Button>
        <Button variant="secondary">스키마 보기</Button>
        <Button variant="secondary">메타데이터 편집</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </div>
  )

  return (
    <HierarchyLayout
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
      datasources={mockDatasources}
      categories={mockCategories}
      resources={mockResources}
      selectedDatasource={selectedDatasource}
      selectedCategory={selectedCategory}
      selectedResource={selectedResource}
      onDatasourceSelect={(ds) => {
        setSelectedDatasource(ds)
        setSelectedCategory(null)
        setSelectedResource(null)
      }}
      onCategorySelect={(cat) => {
        setSelectedCategory(cat)
        setSelectedResource(null)
      }}
      onResourceSelect={setSelectedResource}
      datasourceColumns={datasourceColumns}
      categoryColumns={categoryColumns}
      resourceColumns={resourceColumns}
      renderResourceDetail={renderResourceDetail}
      datasourceWidth="28%"
      categoryWidth="28%"
    />
  )
}
