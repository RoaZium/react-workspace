import { Table } from '@workspace/ui'
import type { Category } from '../model'

interface CategoryTableProps {
  data: Category[]
  selectedRow?: Category | null
  onRowClick: (category: Category) => void
}

/**
 * 카테고리 테이블 (재사용 가능한 UI 컴포넌트)
 */
export function CategoryTable({ data, selectedRow, onRowClick }: CategoryTableProps) {
  const columns = [
    { key: 'name', header: '카테고리', width: '60%' },
    { key: 'code', header: '코드', width: '40%' },
  ]

  return <Table data={data} columns={columns} onRowClick={onRowClick} selectedRow={selectedRow} />
}
