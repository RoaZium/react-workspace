import type { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface ThreeColumnProps {
  left: ReactNode
  center: ReactNode
  right: ReactNode
  leftTitle?: string
  centerTitle?: string
  rightTitle?: string
  ratio?: [number, number, number]
  gap?: number
}

/**
 * ThreeColumn - 3단 분할 레이아웃
 *
 * 좌측 + 중앙 + 우측 3개 영역
 *
 * @example
 * ```tsx
 * <ThreeColumn
 *   ratio={[2, 6, 2]}
 *   left={<Navigation />}
 *   center={<Content />}
 *   right={<Sidebar />}
 * />
 * ```
 */
export function ThreeColumn({
  left,
  center,
  right,
  leftTitle,
  centerTitle,
  rightTitle,
  ratio = [2, 6, 2],
  gap = 2,
}: ThreeColumnProps) {
  const [leftRatio, centerRatio, rightRatio] = ratio
  const total = leftRatio + centerRatio + rightRatio

  const renderPanel = (content: ReactNode, title?: string) => (
    <Paper elevation={0} sx={{ p: 2, overflow: 'auto', border: 1, borderColor: 'divider' }}>
      {title && (
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      {content}
    </Paper>
  )

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${(leftRatio / total) * 100}% ${(centerRatio / total) * 100}% ${(rightRatio / total) * 100}%`,
        gap,
        height: '100%',
      }}
    >
      {renderPanel(left, leftTitle)}
      {renderPanel(center, centerTitle)}
      {renderPanel(right, rightTitle)}
    </Box>
  )
}
