import { ReactNode } from 'react'
import { Button as MuiButton } from '@mui/material'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = ''
}: ButtonProps) {
  const getMuiVariant = () => {
    if (variant === 'primary') return 'contained'
    if (variant === 'secondary') return 'outlined'
    if (variant === 'danger') return 'contained'
    if (variant === 'ghost') return 'text'
    return 'contained'
  }

  const getColor = () => {
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
    >
      {children}
    </MuiButton>
  )
}
