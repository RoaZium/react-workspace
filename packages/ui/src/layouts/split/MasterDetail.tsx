import type { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface MasterDetailProps {
  master: ReactNode
  detail: ReactNode
  masterTitle?: string
  detailTitle?: string
  ratio?: [number, number]
  gap?: number
}

/**
 * MasterDetail - Master-Detail 패턴
 *
 * 목록(Master)과 상세(Detail)를 좌우로 분할
 *
 * @example
 * ```tsx
 * <MasterDetail
 *   ratio={[3, 7]}
 *   master={<UserList />}
 *   detail={<UserDetail />}
 * />
 * ```
 */
export function MasterDetail({
  master,
  detail,
  masterTitle,
  detailTitle,
  ratio = [3, 7],
  gap = 2,
}: MasterDetailProps) {
  const [masterRatio, detailRatio] = ratio
  const total = masterRatio + detailRatio

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${(masterRatio / total) * 100}% ${(detailRatio / total) * 100}%`,
        gap,
        height: '100%',
      }}
    >
      <Paper elevation={0} sx={{ p: 2, overflow: 'auto', border: 1, borderColor: 'divider' }}>
        {masterTitle && (
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {masterTitle}
          </Typography>
        )}
        {master}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, overflow: 'auto', border: 1, borderColor: 'divider' }}>
        {detailTitle && (
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {detailTitle}
          </Typography>
        )}
        {detail}
      </Paper>
    </Box>
  )
}
