import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'
import '../../styles/theme.css'
import './RowsLayout.css'

interface RowsLayoutProps {
  children: ReactNode
  gap?: 'small' | 'medium' | 'large'
}

const gapMap = {
  small: 2,
  medium: 3,
  large: 4,
}

/**
 * Rows 와이어프레임 레이아웃
 * 행 기반 레이아웃 (각 행은 내부에서 컬럼을 가질 수 있음)
 */
export function RowsLayout({ children, gap = 'medium' }: RowsLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: gapMap[gap],
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}

interface RowProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * 단일 행 컴포넌트
 * columns prop으로 내부 컬럼 수 지정 가능
 */
export function Row({ children, columns = 1, className = '' }: RowProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        p: 3,
        display: columns > 1 ? 'grid' : 'block',
        gridTemplateColumns: columns > 1 ? `repeat(${columns}, 1fr)` : undefined,
        gap: columns > 1 ? 2 : undefined,
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {children}
    </Paper>
  )
}

interface RowItemProps {
  children: ReactNode
  span?: number
  className?: string
}

/**
 * 행 내부의 아이템 (컬럼이 여러 개일 때 사용)
 */
export function RowItem({ children, span = 1, className = '' }: RowItemProps) {
  return (
    <Box
      className={className}
      sx={{
        gridColumn: span > 1 ? `span ${span}` : undefined,
      }}
    >
      {children}
    </Box>
  )
}

RowsLayout.Row = Row
RowsLayout.Item = RowItem
