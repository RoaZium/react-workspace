import type { ReactNode } from 'react'
import { Box } from '@mui/material'

interface GridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: number | 'small' | 'medium' | 'large'
}

/**
 * Grid - 그리드 레이아웃
 *
 * 동일한 크기의 그리드 셀로 영역 분할
 *
 * @example
 * ```tsx
 * <Grid columns={4} gap={3}>
 *   <StatCard />
 *   <StatCard />
 *   <StatCard />
 *   <StatCard />
 * </Grid>
 * ```
 */
export function Grid({ children, columns = 4, gap = 2 }: GridProps) {
  const gapValue = typeof gap === 'string'
    ? { small: 1, medium: 2, large: 3 }[gap]
    : gap

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: columns >= 2 ? 'repeat(2, 1fr)' : '1fr',
          md: columns >= 3 ? 'repeat(3, 1fr)' : `repeat(${columns}, 1fr)`,
          lg: `repeat(${columns}, 1fr)`,
        },
        gap: gapValue,
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}
