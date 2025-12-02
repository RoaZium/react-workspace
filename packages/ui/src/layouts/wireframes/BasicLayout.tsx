import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'
import '../../styles/theme.css'
import './BasicLayout.css'

interface BasicLayoutProps {
  children: ReactNode
}

/**
 * Basic 와이어프레임 레이아웃
 * 단순한 단일 컨텐츠 영역 구조
 */
export function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}

interface BasicSectionProps {
  children?: ReactNode
  className?: string
}

export function BasicSection({ children, className = '' }: BasicSectionProps) {
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

BasicLayout.Section = BasicSection
