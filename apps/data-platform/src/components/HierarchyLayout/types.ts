export interface HierarchyItem<T = any> {
  id: string | number
  name: string
  data?: T
  [key: string]: any
}

export interface DatasourceItem extends HierarchyItem {
  type?: string
  status?: string
  description?: string
}

export interface CategoryItem extends HierarchyItem {
  datasourceId: string | number
  count?: number
  icon?: string
}

export interface ResourceItem extends HierarchyItem {
  categoryId: string | number
  datasourceId: string | number
  type?: string
  status?: string
}

export interface HierarchyLayoutProps {
  // 데이터
  datasources: DatasourceItem[]
  categories: CategoryItem[]
  resources: ResourceItem[]

  // 선택된 항목
  selectedDatasource?: DatasourceItem | null
  selectedCategory?: CategoryItem | null
  selectedResource?: ResourceItem | null

  // 이벤트 핸들러
  onDatasourceSelect?: (datasource: DatasourceItem) => void
  onCategorySelect?: (category: CategoryItem) => void
  onResourceSelect?: (resource: ResourceItem) => void

  // 렌더 커스터마이징 (선택사항)
  renderDatasourceItem?: (item: DatasourceItem, isSelected: boolean) => React.ReactNode
  renderCategoryItem?: (item: CategoryItem, isSelected: boolean) => React.ReactNode
  renderResourceDetail?: (resource: ResourceItem) => React.ReactNode

  // 컬럼 설정
  datasourceColumns?: Array<{
    key: string
    header: string
    width?: string
    render?: (item: DatasourceItem) => React.ReactNode
  }>
  categoryColumns?: Array<{
    key: string
    header: string
    width?: string
    render?: (item: CategoryItem) => React.ReactNode
  }>
  resourceColumns?: Array<{
    key: string
    header: string
    width?: string
    render?: (item: ResourceItem) => React.ReactNode
  }>

  // 레이아웃 설정
  datasourceWidth?: string
  categoryWidth?: string
  showEmptyState?: boolean

  // 헤더/액션
  title?: string
  description?: string
  actions?: React.ReactNode
}
