import { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import '../../styles/theme.css'
import './ThreeColumnHierarchyLayout.css'

interface ThreeColumnHierarchyLayoutProps {
  children: ReactNode
  gap?: 'small' | 'medium' | 'large'
}

const gapMap = {
  small: 2,
  medium: 3,
  large: 4,
}

export function ThreeColumnHierarchyLayout({ children, gap = 'medium' }: ThreeColumnHierarchyLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: gapMap[gap],
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}

interface ThreeColumnHierarchyColumnProps {
  children?: ReactNode
  width?: string
  className?: string
  title?: string
  count?: number
}

export function ThreeColumnHierarchyColumn({
  children,
  width,
  className = '',
  title,
  count
}: ThreeColumnHierarchyColumnProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        width: width,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title} {count !== undefined && `(${count})`}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>{children}</Box>
    </Paper>
  )
}

interface ThreeColumnHierarchyDetailProps {
  children?: ReactNode
  className?: string
}

export function ThreeColumnHierarchyDetail({ children, className = '' }: ThreeColumnHierarchyDetailProps) {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}

interface ThreeColumnHierarchyListProps {
  children?: ReactNode
  className?: string
  title?: string
  count?: number
}

export function ThreeColumnHierarchyList({ children, className = '', title, count }: ThreeColumnHierarchyListProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        maxHeight: '40%',
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title} {count !== undefined && `(${count})`}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>{children}</Box>
    </Paper>
  )
}

interface ThreeColumnHierarchyContentProps {
  children?: ReactNode
  className?: string
  title?: string
}

export function ThreeColumnHierarchyContent({ children, className = '', title }: ThreeColumnHierarchyContentProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box sx={{ p: 2, flexShrink: 0, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom={false}>
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>{children}</Box>
    </Paper>
  )
}

ThreeColumnHierarchyLayout.Column = ThreeColumnHierarchyColumn
ThreeColumnHierarchyLayout.Detail = ThreeColumnHierarchyDetail
ThreeColumnHierarchyLayout.List = ThreeColumnHierarchyList
ThreeColumnHierarchyLayout.Content = ThreeColumnHierarchyContent
