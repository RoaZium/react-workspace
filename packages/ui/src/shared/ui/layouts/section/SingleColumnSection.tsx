import type { ReactNode } from 'react'
import { Children } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface SingleColumnSectionProps {
  children: ReactNode
  maxWidth?: string
}

interface SectionTitleProps {
  children: ReactNode
  subtitle?: string
}

interface ContentProps {
  children: ReactNode
  type?: 'article' | 'form' | 'document'
}

/**
 * SingleColumnSection - 단일 컬럼 섹션 템플릿
 *
 * 구조:
 * - SectionTitle (공통): 섹션 타이틀
 * - Content (용도별): 콘텐츠 영역 (type으로 용도 구분)
 *
 * @example
 * <SingleColumnSection maxWidth="800px">
 *   <SingleColumnSection.Title subtitle="2024-12-04">블로그 포스트</SingleColumnSection.Title>
 *   <SingleColumnSection.Content type="article">
 *     <ArticleBody />
 *   </SingleColumnSection.Content>
 * </SingleColumnSection>
 */
export function SingleColumnSection({ children, maxWidth = '900px' }: SingleColumnSectionProps) {
  const childArray = Children.toArray(children)
  const titleComponent = childArray.find((child: any) => child.type === SectionTitle)
  const contentComponent = childArray.find((child: any) => child.type === Content)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        maxWidth,
        mx: 'auto',
        width: '100%',
      }}
    >
      {titleComponent}
      {contentComponent}
    </Box>
  )
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <Box sx={{ px: 0.5 }}>
      <Typography variant="subtitle1" fontWeight={600} fontSize="0.9375rem">
        {children}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" fontSize="0.8125rem" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}

export function Content({ children, type = 'document' }: ContentProps) {
  return (
    <Paper
      sx={{
        p: type === 'article' ? 3 : 1.5,
        flex: 1,
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      {children}
    </Paper>
  )
}

SingleColumnSection.Title = SectionTitle
SingleColumnSection.Content = Content
