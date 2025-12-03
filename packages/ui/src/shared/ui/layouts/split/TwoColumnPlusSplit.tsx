import type { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface TwoColumnPlusSplitLayoutProps {
  children: ReactNode
  column1Width?: string
  column2Width?: string
  splitTopHeight?: string
}

interface ColumnProps {
  children: ReactNode
  title?: string
  count?: number
}

interface SplitProps {
  children: ReactNode
  title?: string
  count?: number
  emptyMessage?: string
}

/**
 * TwoColumnPlusSplitLayout - 2개 전체 높이 열 + 1개 분할 열 레이아웃
 *
 * 복합 컴포넌트 패턴:
 * - Column1: 왼쪽 전체 높이 열
 * - Column2: 중간 전체 높이 열
 * - SplitTop: 오른쪽 상단 분할 영역
 * - SplitBottom: 오른쪽 하단 분할 영역
 */
export function TwoColumnPlusSplitLayout({
  children,
  column1Width = '25%',
  column2Width = '25%',
  splitTopHeight = '40%',
}: TwoColumnPlusSplitLayoutProps) {
  const column3Width = `calc(100% - ${column1Width} - ${column2Width})`
  const splitBottomHeight = `calc(100% - ${splitTopHeight})`

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${column1Width} ${column2Width} ${column3Width}`,
        gridTemplateRows: '1fr',
        gap: 2,
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export function Column1({ children, title, count }: ColumnProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          {count !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {count}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

export function Column2({ children, title, count }: ColumnProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          {count !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {count}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

export function SplitTop({ children, title, count }: SplitProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          {count !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {count}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

export function SplitBottom({ children, title, emptyMessage }: SplitProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: 'calc(60% - 16px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {!children && emptyMessage ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
            {emptyMessage}
          </Typography>
        ) : (
          children
        )}
      </Box>
    </Paper>
  )
}

TwoColumnPlusSplitLayout.Column1 = Column1
TwoColumnPlusSplitLayout.Column2 = Column2
TwoColumnPlusSplitLayout.SplitTop = SplitTop
TwoColumnPlusSplitLayout.SplitBottom = SplitBottom
