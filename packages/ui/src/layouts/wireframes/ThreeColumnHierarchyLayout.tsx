import { ReactNode } from 'react'
import { Box, Paper } from '@mui/material'
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
}

export function ThreeColumnHierarchyColumn({
  children,
  width,
  className = ''
}: ThreeColumnHierarchyColumnProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        width: width,
        p: 3,
        overflowY: 'auto',
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
}

export function ThreeColumnHierarchyList({ children, className = '' }: ThreeColumnHierarchyListProps) {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={{
        p: 3,
        flexShrink: 0,
        overflowY: 'auto',
        maxHeight: '40%',
        border: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {children}
    </Paper>
  )
}

interface ThreeColumnHierarchyContentProps {
  children?: ReactNode
  className?: string
}

export function ThreeColumnHierarchyContent({ children, className = '' }: ThreeColumnHierarchyContentProps) {
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

ThreeColumnHierarchyLayout.Column = ThreeColumnHierarchyColumn
ThreeColumnHierarchyLayout.Detail = ThreeColumnHierarchyDetail
ThreeColumnHierarchyLayout.List = ThreeColumnHierarchyList
ThreeColumnHierarchyLayout.Content = ThreeColumnHierarchyContent
