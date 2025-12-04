import type { ReactNode } from 'react'
import { Children } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface GridSectionProps {
  children: ReactNode
  columns?: number
  gap?: number
}

interface SectionTitleProps {
  children: ReactNode
  count?: number
}

interface GridItemProps {
  children: ReactNode
  role?: 'statistic' | 'chart' | 'action' | 'info'
}

/**
 * GridSection - 그리드 섹션 템플릿
 *
 * 구조:
 * - SectionTitle (공통): 섹션 타이틀
 * - GridItem (용도별): 그리드 아이템 (role로 용도 구분)
 *
 * @example
 * <GridSection columns={2} gap={12}>
 *   <GridSection.Title count={4}>대시보드 위젯</GridSection.Title>
 *   <GridSection.Item role="statistic">
 *     <SalesCard />
 *   </GridSection.Item>
 *   <GridSection.Item role="chart">
 *     <RevenueChart />
 *   </GridSection.Item>
 *   <GridSection.Item role="info">
 *     <UserStats />
 *   </GridSection.Item>
 *   <GridSection.Item role="action">
 *     <QuickActions />
 *   </GridSection.Item>
 * </GridSection>
 */
export function GridSection({ children, columns = 2, gap = 1.5 }: GridSectionProps) {
  const childArray = Children.toArray(children)
  const titleComponent = childArray.find((child: any) => child.type === SectionTitle)
  const gridItems = childArray.filter((child: any) => child.type === GridItem)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {titleComponent}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          flex: 1,
          minHeight: 0,
          alignContent: 'start',
        }}
      >
        {gridItems}
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

export function GridItem({ children, role = 'info' }: GridItemProps) {
  return (
    <Paper
      sx={{
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        minHeight: role === 'chart' ? '300px' : '150px',
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

GridSection.Title = SectionTitle
GridSection.Item = GridItem
