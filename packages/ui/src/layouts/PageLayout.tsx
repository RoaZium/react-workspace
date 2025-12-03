import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface PageLayoutProps {
  children: ReactNode
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

interface PageContentProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        p: 3,
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexShrink: 0,
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  )
}

export function PageContent({ children, className = '' }: PageContentProps) {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}
