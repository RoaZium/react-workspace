import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'
import '../../styles/theme.css'
import './SearchLayout.css'

interface SearchLayoutProps {
  children: ReactNode
  gap?: 'small' | 'medium' | 'large'
}

const gapMap = {
  small: 2,
  medium: 3,
  large: 4,
}

/**
 * Search 와이어프레임 레이아웃
 * 조건 조회 영역과 조회 결과 영역으로 구성된 레이아웃
 */
export function SearchLayout({ children, gap = 'medium' }: SearchLayoutProps) {
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

interface SearchConditionProps {
  children: ReactNode
  className?: string
}

/**
 * 조건 조회 영역
 */
export function SearchCondition({
  children,
  className = ''
}: SearchConditionProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        p: 3,
        flexShrink: 0,
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {children}
    </Paper>
  )
}

interface SearchResultProps {
  children: ReactNode
  className?: string
}

/**
 * 조회 결과 영역
 */
export function SearchResult({ children, className = '' }: SearchResultProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        p: 3,
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {children}
    </Paper>
  )
}

SearchLayout.Condition = SearchCondition
SearchLayout.Result = SearchResult
