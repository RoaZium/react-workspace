import type { ReactNode } from 'react'
import { Card as MuiCard, CardContent, Box, Typography, type SxProps, type Theme } from '@mui/material'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
  title?: string
  sx?: SxProps<Theme>
}

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  trend?: {
    value: string | number
    direction?: 'up' | 'down'
    isPositive?: boolean
  }
}

const paddingMap = {
  none: 0,
  small: 1.5,
  medium: 3,
  large: 4,
}

export function Card({ children, className = '', padding = 'medium', title, sx }: CardProps) {
  return (
    <MuiCard
      className={className}
      sx={{
        boxShadow: 1,
        '&:hover': {
          boxShadow: 3,
        },
        transition: 'box-shadow 0.2s',
        ...sx,
      }}
    >
      {title && (
        <Box
          sx={{
            px: paddingMap[padding],
            pt: paddingMap[padding],
            pb: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
      <CardContent sx={{ p: paddingMap[padding] }}>
        {children}
      </CardContent>
    </MuiCard>
  )
}

export function StatCard({ icon, value, label, trend }: StatCardProps) {
  return (
    <MuiCard
      sx={{
        boxShadow: 1,
        '&:hover': {
          boxShadow: 3,
        },
        transition: 'box-shadow 0.2s',
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              fontSize: '2.5rem',
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            {icon}
          </Box>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            {trend && (
              <Typography
                variant="body2"
                fontWeight={600}
                color={
                  trend.isPositive !== undefined
                    ? trend.isPositive
                      ? 'success.main'
                      : 'error.main'
                    : trend.direction === 'up'
                    ? 'success.main'
                    : 'error.main'
                }
                sx={{ mt: 0.5 }}
              >
                {trend.direction === 'up' || trend.isPositive ? '↑' : '↓'} {trend.value}
                {typeof trend.value === 'number' ? '%' : ''}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  )
}
