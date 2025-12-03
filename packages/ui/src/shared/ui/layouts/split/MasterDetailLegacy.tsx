import type { ReactNode } from 'react'
import { Children } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface MasterDetailLayoutProps {
  children: ReactNode
  ratio?: [number, number]
  gap?: number
}

interface PanelProps {
  children: ReactNode
  title?: string
}

/**
 * MasterDetailLayout - 레거시 복합 컴포넌트 패턴
 *
 * @deprecated - Use MasterDetail with props API instead
 *
 * 기존 코드 호환성을 위한 레거시 버전:
 * - MasterPanel + DetailPanel 복합 컴포넌트 패턴
 */
export function MasterDetailLayout({ children, ratio = [3, 7], gap = 2 }: MasterDetailLayoutProps) {
  const [masterRatio, detailRatio] = ratio
  const total = masterRatio + detailRatio

  const childArray = Children.toArray(children)
  const masterPanel = childArray.find((child: any) => child.type === MasterPanel)
  const detailPanel = childArray.find((child: any) => child.type === DetailPanel)

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${(masterRatio / total) * 100}% ${(detailRatio / total) * 100}%`,
        gap,
        height: '100%',
      }}
    >
      {masterPanel}
      {detailPanel}
    </Box>
  )
}

export function MasterPanel({ children, title }: PanelProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

export function DetailPanel({ children, title }: PanelProps) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {title && (
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Paper>
  )
}

MasterDetailLayout.MasterPanel = MasterPanel
MasterDetailLayout.DetailPanel = DetailPanel
