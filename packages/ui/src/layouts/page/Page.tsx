import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface PageProps {
  children: ReactNode
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

/**
 * Page - 페이지 컨테이너
 *
 * 개별 페이지의 기본 구조를 제공하는 단순한 컨테이너
 */
export function Page({ children }: PageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}

/**
 * PageHeader - 페이지 헤더
 *
 * 타이틀, 설명, 액션 버튼을 포함하는 헤더
 */
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

/**
 * PageContent - 페이지 콘텐츠 래퍼
 *
 * 페이지의 메인 콘텐츠를 감싸는 컨테이너
 */
export function PageContent({ children }: PageProps) {
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

// Compound Component 패턴
Page.Header = PageHeader
Page.Content = PageContent
