import type { ReactNode } from 'react'
import { Button as MuiButton, type SxProps, type Theme } from '@mui/material'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
  sx?: SxProps<Theme>
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  color,
  size = 'medium',
  disabled = false,
  className = '',
  sx,
}: ButtonProps) {
  const getMuiVariant = () => {
    // Material-UI variant이 직접 전달된 경우
    if (variant === 'contained' || variant === 'outlined' || variant === 'text') {
      return variant
    }

    // 커스텀 variant 매핑
    if (variant === 'primary') return 'contained'
    if (variant === 'secondary') return 'outlined'
    if (variant === 'danger') return 'contained'
    if (variant === 'ghost') return 'text'
    return 'contained'
  }

  const getColor = () => {
    // color prop이 명시적으로 전달된 경우 우선 사용
    if (color) return color

    // variant 기반 color 매핑
    if (variant === 'danger') return 'error'
    if (variant === 'primary') return 'primary'
    return 'primary'
  }

  return (
    <MuiButton
      variant={getMuiVariant()}
      color={getColor()}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      sx={sx}
    >
      {children}
    </MuiButton>
  )
}
