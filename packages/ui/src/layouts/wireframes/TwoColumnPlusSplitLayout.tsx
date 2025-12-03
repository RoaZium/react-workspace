/**
 * TwoColumnPlusSplitLayout - 2개의 전체 높이 열 + 1개의 분할된 열
 *
 * 구조:
 * ┌──────────┬──────────┬──────────┐
 * │          │          │          │
 * │  Col 1   │  Col 2   │  Split   │
 * │ (전체 높이)│ (전체 높이)│  Top     │
 * │          │          ├──────────┤
 * │          │          │  Split   │
 * │          │          │  Bottom  │
 * └──────────┴──────────┴──────────┘
 *
 * 사용 사례:
 * - 데이터 허브: [데이터소스] [카테고리] [리소스목록/상세]
 * - 이메일: [계정] [폴더] [메일목록/내용]
 */

import { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface TwoColumnPlusSplitLayoutProps {
  children: ReactNode
  gap?: number
  column1Width?: string
  column2Width?: string
  splitTopHeight?: string
}

/**
 * 메인 레이아웃
 */
export function TwoColumnPlusSplitLayout({
  children,
  gap = 2,
  column1Width = '25%',
  column2Width = '25%',
  splitTopHeight = '40%',
}: TwoColumnPlusSplitLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${column1Width} ${column2Width} 1fr`,
        gridTemplateRows: `${splitTopHeight} 1fr`,
        gap,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}

interface ColumnProps {
  children: ReactNode
  title?: string
  count?: number
}

/**
 * 1열 (전체 높이)
 */
export function Column1({ children, title, count }: ColumnProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        gridColumn: '1',
        gridRow: '1 / 3',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title} {count !== undefined && `(${count})`}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

/**
 * 2열 (전체 높이)
 */
export function Column2({ children, title, count }: ColumnProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        gridColumn: '2',
        gridRow: '1 / 3',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title} {count !== undefined && `(${count})`}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

/**
 * 분할 영역 - 상단
 */
export function SplitTop({ children, title, count }: ColumnProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        gridColumn: '3',
        gridRow: '1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title} {count !== undefined && `(${count})`}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

interface SplitBottomProps {
  children?: ReactNode
  emptyMessage?: string
  title?: string
}

/**
 * 분할 영역 - 하단
 */
export function SplitBottom({ children, emptyMessage = '항목을 선택하세요', title }: SplitBottomProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        gridColumn: '3',
        gridRow: '2',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {children || (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
            }}
          >
            {emptyMessage}
          </Box>
        )}
      </Box>
    </Paper>
  )
}

// Compound Component 패턴
TwoColumnPlusSplitLayout.Column1 = Column1
TwoColumnPlusSplitLayout.Column2 = Column2
TwoColumnPlusSplitLayout.SplitTop = SplitTop
TwoColumnPlusSplitLayout.SplitBottom = SplitBottom
