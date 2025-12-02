import { Table } from '@workspace/ui'
import type { DataSource } from '../model'

interface DataSourceTableProps {
  data: DataSource[]
  selectedRow?: DataSource | null
  onRowClick: (dataSource: DataSource) => void
}

/**
 * 데이터소스 테이블 (재사용 가능한 UI 컴포넌트)
 */
export function DataSourceTable({ data, selectedRow, onRowClick }: DataSourceTableProps) {
  const columns = [
    { key: 'name', header: '이름', width: '50%' },
    { key: 'code', header: '코드', width: '25%' },
    {
      key: 'isActive',
      header: '상태',
      width: '25%',
      render: (item: DataSource) => (
        <span className={`status-badge status-${item.isActive ? 'active' : 'inactive'}`}>
          {item.isActive ? '활성' : '비활성'}
        </span>
      ),
    },
  ]

  return <Table data={data} columns={columns} onRowClick={onRowClick} selectedRow={selectedRow} />
}
