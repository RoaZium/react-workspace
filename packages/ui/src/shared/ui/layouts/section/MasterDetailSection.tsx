import type { ReactNode } from 'react'
import { Children } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface MasterDetailSectionProps {
  children: ReactNode
  ratio?: [number, number]
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
 * MasterDetailSection - 마스터-디테일 섹션 템플릿
 *
 * 구조:
 * - SectionTitle (공통): 섹션 타이틀
 * - MasterPanel (용도별): 목록/선택 영역
 * - DetailPanel (용도별): 상세 정보 영역
 *
 * @example
 * <MasterDetailSection ratio={[3, 7]} gap={12}>
 *   <MasterDetailSection.Title count={10}>사용자 목록</MasterDetailSection.Title>
 *   <MasterDetailSection.MasterPanel>
 *     <UserList />
 *   </MasterDetailSection.MasterPanel>
 *   <MasterDetailSection.DetailPanel>
 *     <UserDetail />
 *   </MasterDetailSection.DetailPanel>
 * </MasterDetailSection>
 */
export function MasterDetailSection({ children, ratio = [3, 7], gap = 1.5 }: MasterDetailSectionProps) {
  const [masterRatio, detailRatio] = ratio
  const total = masterRatio + detailRatio

  const childArray = Children.toArray(children)
  const titleComponent = childArray.find((child: any) => child.type === SectionTitle)
  const masterPanel = childArray.find((child: any) => child.type === MasterPanel)
  const detailPanel = childArray.find((child: any) => child.type === DetailPanel)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {titleComponent}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `${(masterRatio / total) * 100}% ${(detailRatio / total) * 100}%`,
          gap,
          flex: 1,
          minHeight: 0,
        }}
      >
        {masterPanel}
        {detailPanel}
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

export function MasterPanel({ children }: PanelProps) {
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

export function DetailPanel({ children }: PanelProps) {
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

MasterDetailSection.Title = SectionTitle
MasterDetailSection.MasterPanel = MasterPanel
MasterDetailSection.DetailPanel = DetailPanel
