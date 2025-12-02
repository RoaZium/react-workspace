import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'
import '../../styles/theme.css'
import './MultiColumnLayout.css'

interface MultiColumnLayoutProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
}

const gapMap = {
  small: 2,
  medium: 3,
  large: 4,
}

/**
 * MultiColumn 와이어프레임 레이아웃
 * 2, 3, 4 컬럼 그리드 구조
 */
export function MultiColumnLayout({
  children,
  columns = 3,
  gap = 'medium'
}: MultiColumnLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gapMap[gap],
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}

interface ColumnProps {
  children?: ReactNode
  span?: number
  className?: string
}

export function Column({ children, span = 1, className = '' }: ColumnProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        p: 3,
        overflowY: 'auto',
        gridColumn: span > 1 ? `span ${span}` : undefined,
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {children}
    </Paper>
  )
}

MultiColumnLayout.Column = Column
