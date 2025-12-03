import type { ReactNode } from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

interface Column<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  width?: string
}

interface TablePropsWithData<T> {
  data: T[]
  columns: Column<T>[]
  children?: never
  className?: string
  onRowClick?: (row: T) => void
}

interface TablePropsWithChildren {
  children: ReactNode
  data?: never
  columns?: never
  className?: string
  onRowClick?: never
}

type TableProps<T = Record<string, any>> = TablePropsWithData<T> | TablePropsWithChildren

export function Table<T extends Record<string, any>>({
  data,
  columns,
  children,
  className = '',
  onRowClick,
}: TableProps<T>) {
  // children 모드: 사용자가 직접 HTML table 구조 작성
  if (children) {
    return (
      <TableContainer component={Paper} className={className} elevation={0}>
        <MuiTable>{children}</MuiTable>
      </TableContainer>
    )
  }

  // data/columns 모드: props로 동적 테이블 생성
  if (!data || !columns) {
    throw new Error('Table requires either children or both data and columns props')
  }

  return (
    <TableContainer component={Paper} className={className} elevation={0}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.875rem',
                  width: col.width,
                }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={idx}
              onClick={() => onRowClick?.(row)}
              hover={!!onRowClick}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
              }}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>{col.render ? col.render(row) : row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
