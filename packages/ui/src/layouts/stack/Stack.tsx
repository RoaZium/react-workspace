import type { ReactNode } from 'react'
import { Box } from '@mui/material'

interface StackProps {
  children: ReactNode
  direction?: 'row' | 'column'
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
}

/**
 * Stack - 스택 레이아웃
 *
 * Flexbox 기반의 단순한 스택 레이아웃
 *
 * @example
 * ```tsx
 * <Stack direction="column" gap={2}>
 *   <Card>...</Card>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </Stack>
 * ```
 */
export function Stack({ children, direction = 'column', gap = 2, align, justify }: StackProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}
