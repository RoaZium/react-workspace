import type { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'

interface SearchLayoutProps {
  children: ReactNode
}

interface SearchConditionProps {
  children: ReactNode
}

interface SearchResultProps {
  children: ReactNode
}

/**
 * SearchLayout - 검색 조건 + 결과 레이아웃
 *
 * 복합 컴포넌트 패턴 (Compound Component Pattern):
 * - SearchLayout.Condition: 검색 조건 영역
 * - SearchLayout.Result: 검색 결과 영역
 */
export function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export function SearchCondition({ children }: SearchConditionProps) {
  return (
    <Paper
      sx={{
        p: 2,
        flexShrink: 0,
      }}
    >
      {children}
    </Paper>
  )
}

export function SearchResult({ children }: SearchResultProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  )
}

SearchLayout.Condition = SearchCondition
SearchLayout.Result = SearchResult
