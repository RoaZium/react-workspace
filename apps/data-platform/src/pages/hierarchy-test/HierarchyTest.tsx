import { useState } from 'react'
import { HierarchyLayout } from '@/widgets/hierarchy-layout'
import type { DatasourceItem, CategoryItem, ResourceItem } from '@/widgets/hierarchy-layout'

// Mock data
const mockDatasources: DatasourceItem[] = [
  { id: 'ds1', name: 'IoT Sensor Hub', type: 'MQTT', status: 'active' },
  { id: 'ds2', name: 'ERP System', type: 'Database', status: 'active' },
  { id: 'ds3', name: 'CRM Database', type: 'Database', status: 'inactive' },
]

const mockCategories: CategoryItem[] = [
  { id: 'cat1', name: '온도 센서', datasourceId: 'ds1', count: 15 },
  { id: 'cat2', name: '습도 센서', datasourceId: 'ds1', count: 12 },
  { id: 'cat3', name: '고객 정보', datasourceId: 'ds2', count: 1247 },
  { id: 'cat4', name: '주문 정보', datasourceId: 'ds2', count: 890 },
  { id: 'cat5', name: '영업 정보', datasourceId: 'ds3', count: 345 },
]

const mockResources: ResourceItem[] = [
  { id: 'res1', name: 'TEMP-001', datasourceId: 'ds1', categoryId: 'cat1', type: 'Sensor', status: 'active' },
  { id: 'res2', name: 'TEMP-002', datasourceId: 'ds1', categoryId: 'cat1', type: 'Sensor', status: 'active' },
  { id: 'res3', name: 'HUM-001', datasourceId: 'ds1', categoryId: 'cat2', type: 'Sensor', status: 'active' },
  { id: 'res4', name: 'CUSTOMER-TABLE', datasourceId: 'ds2', categoryId: 'cat3', type: 'Table', status: 'active' },
  { id: 'res5', name: 'ORDER-TABLE', datasourceId: 'ds2', categoryId: 'cat4', type: 'Table', status: 'active' },
]

export function HierarchyTest() {
  const [selectedDatasource, setSelectedDatasource] = useState<DatasourceItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null)

  return (
    <HierarchyLayout
      title="🧪 Hierarchy Layout 테스트"
      description="FSD widgets 레이어로 리팩토링된 HierarchyLayout 컴포넌트 테스트"
      datasources={mockDatasources}
      categories={mockCategories}
      resources={mockResources}
      selectedDatasource={selectedDatasource}
      selectedCategory={selectedCategory}
      selectedResource={selectedResource}
      onDatasourceSelect={setSelectedDatasource}
      onCategorySelect={setSelectedCategory}
      onResourceSelect={setSelectedResource}
    />
  )
}
