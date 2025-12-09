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
 * Page - 페이지 컨테이너 (Material Design 3)
 *
 * 개별 페이지의 기본 구조를 제공하는 단순한 컨테이너
 * MD3 spacing과 layout 가이드라인 적용
 */
export function Page({ children }: PageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 3, // MD3 spacing: 24px
        p: 3, // MD3 page padding
      }}
    >
      {children}
    </Box>
  )
}

/**
 * PageHeader - 페이지 헤더 (Material Design 3)
 *
 * 타이틀, 설명, 액션 버튼을 포함하는 헤더
 * MD3 Typography와 spacing 가이드라인 적용
 */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexShrink: 0,
        mb: 1,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: description ? 1 : 0,
            fontWeight: 600, // MD3 headings
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      {actions && (
        <Box sx={{ ml: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          {actions}
        </Box>
      )}
    </Box>
  )
}

/**
 * PageContent - 페이지 콘텐츠 래퍼 (Material Design 3)
 *
 * 페이지의 메인 콘텐츠를 감싸는 컨테이너
 * MD3 spacing과 overflow 처리
 */
export function PageContent({ children }: PageProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3, // MD3 content spacing
      }}
    >
      {children}
    </Box>
  )
}

// Compound Component 패턴
Page.Header = PageHeader
Page.Content = PageContent
