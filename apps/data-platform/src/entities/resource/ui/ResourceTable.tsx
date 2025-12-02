import { Table } from '@workspace/ui'
import type { Resource } from '../model'

interface ResourceTableProps {
  data: Resource[]
  selectedRow?: Resource | null
  onRowClick: (resource: Resource) => void
}

/**
 * 리소스 테이블 (재사용 가능한 UI 컴포넌트)
 */
export function ResourceTable({ data, selectedRow, onRowClick }: ResourceTableProps) {
  const columns = [
    { key: 'name', header: '리소스명', width: '50%' },
    { key: 'code', header: '코드', width: '25%' },
    {
      key: 'isActive',
      header: '상태',
      width: '25%',
      render: (item: Resource) => (
        <span className={`status-badge status-${item.isActive ? 'active' : 'inactive'}`}>
          {item.isActive ? '활성' : '비활성'}
        </span>
      ),
    },
  ]

  return <Table data={data} columns={columns} onRowClick={onRowClick} selectedRow={selectedRow} />
}
