import type { ReactNode } from 'react'
import { Children } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface ThreeColumnSectionProps {
  children: ReactNode
  ratio?: [number, number, number]
  gap?: number
}

interface SectionTitleProps {
  children: ReactNode
  count?: number
}

interface PanelProps {
  children: ReactNode
}

/**
 * ThreeColumnSection - 3단 컬럼 섹션 템플릿
 *
 * 구조:
 * - SectionTitle (공통): 섹션 타이틀
 * - NavigationPanel (용도별): 좌측 네비게이션 영역
 * - MainPanel (용도별): 중앙 메인 콘텐츠 영역
 * - WidgetPanel (용도별): 우측 위젯/부가 정보 영역
 *
 * @example
 * <ThreeColumnSection ratio={[2, 6, 2]}>
 *   <ThreeColumnSection.Title>데이터 허브</ThreeColumnSection.Title>
 *   <ThreeColumnSection.NavigationPanel>
 *     <DataSourceNav />
 *   </ThreeColumnSection.NavigationPanel>
 *   <ThreeColumnSection.MainPanel>
 *     <CategoryTable />
 *   </ThreeColumnSection.MainPanel>
 *   <ThreeColumnSection.WidgetPanel>
 *     <ResourceInfo />
 *   </ThreeColumnSection.WidgetPanel>
 * </ThreeColumnSection>
 */
export function ThreeColumnSection({ children, ratio = [2, 6, 2], gap = 1.5 }: ThreeColumnSectionProps) {
  const [navRatio, mainRatio, widgetRatio] = ratio
  const total = navRatio + mainRatio + widgetRatio

  const childArray = Children.toArray(children)
  const titleComponent = childArray.find((child: any) => child.type === SectionTitle)
  const navPanel = childArray.find((child: any) => child.type === NavigationPanel)
  const mainPanel = childArray.find((child: any) => child.type === MainPanel)
  const widgetPanel = childArray.find((child: any) => child.type === WidgetPanel)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {titleComponent}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `${(navRatio / total) * 100}% ${(mainRatio / total) * 100}% ${(widgetRatio / total) * 100}%`,
          gap,
          flex: 1,
          minHeight: 0,
        }}
      >
        {navPanel}
        {mainPanel}
        {widgetPanel}
      </Box>
    </Box>
  )
}

export function SectionTitle({ children, count }: SectionTitleProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
      <Typography variant="subtitle1" fontWeight={600} fontSize="0.9375rem">
        {children}
      </Typography>
      {count !== undefined && (
        <Typography variant="caption" color="text.secondary" fontSize="0.8125rem">
          {count}
        </Typography>
      )}
    </Box>
  )
}

export function NavigationPanel({ children }: PanelProps) {
  return (
    <Paper
      sx={{
        p: 1.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

export function MainPanel({ children }: PanelProps) {
  return (
    <Paper
      sx={{
        p: 1.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

export function WidgetPanel({ children }: PanelProps) {
  return (
    <Paper
      sx={{
        p: 1.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

ThreeColumnSection.Title = SectionTitle
ThreeColumnSection.NavigationPanel = NavigationPanel
ThreeColumnSection.MainPanel = MainPanel
ThreeColumnSection.WidgetPanel = WidgetPanel
