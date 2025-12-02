import { ReactNode } from 'react'
import { Card as MuiCard, CardContent, Box, Typography } from '@mui/material'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
}

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

const paddingMap = {
  none: 0,
  small: 1.5,
  medium: 3,
  large: 4,
}

export function Card({ children, className = '', padding = 'medium' }: CardProps) {
  return (
    <MuiCard
      className={className}
      sx={{
        boxShadow: 1,
        '&:hover': {
          boxShadow: 3,
        },
        transition: 'box-shadow 0.2s',
      }}
    >
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
                color={trend.isPositive ? 'success.main' : 'error.main'}
                sx={{ mt: 0.5 }}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  )
}
