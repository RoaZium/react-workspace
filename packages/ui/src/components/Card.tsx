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
  small: 1,
  medium: 1.5,
  large: 2,
}

/**
 * Card - Material Design 3 Card Component
 * MD3 elevation, shape, spacing 가이드라인 적용
 */
export function Card({ children, className = '', padding = 'medium', title, sx }: CardProps) {
  return (
    <MuiCard
      className={className}
      elevation={1}
      sx={{
        bgcolor: 'background.paper',
        // borderRadius는 theme에서 설정 (12px)
        transition: 'box-shadow 0.2s ease',
        ...sx,
      }}
    >
      {title && (
        <Box
          sx={{
            px: paddingMap[padding] * 2,
            pt: paddingMap[padding] * 2,
            pb: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
      <CardContent sx={{ p: paddingMap[padding] * 2, '&:last-child': { pb: paddingMap[padding] * 2 } }}>
        {children}
      </CardContent>
    </MuiCard>
  )
}

/**
 * StatCard - Material Design 3 Statistics Card
 * MD3 스타일 지표 카드 컴포넌트
 */
export function StatCard({ icon, value, label, trend }: StatCardProps) {
  return (
    <MuiCard
      elevation={1}
      sx={{
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.2s ease',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Icon */}
          <Box
            sx={{
              fontSize: '2rem',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 2,
            }}
          >
            {icon}
          </Box>

          {/* Value & Label */}
          <Box>
            <Typography variant="h4" fontWeight={600} sx={{ mb: 0.5 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>

          {/* Trend */}
          {trend && (
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: trend.isPositive !== undefined
                  ? trend.isPositive
                    ? 'success.main'
                    : 'error.main'
                  : trend.direction === 'up'
                  ? 'success.main'
                  : 'error.main',
              }}
            >
              {trend.direction === 'up' || trend.isPositive ? '↑' : '↓'} {trend.value}
              {typeof trend.value === 'number' ? '%' : ''}
            </Typography>
          )}
        </Box>
      </CardContent>
    </MuiCard>
  )
}
