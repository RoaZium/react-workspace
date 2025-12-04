import { ReactNode, useMemo } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useTheme } from '../contexts/ThemeContext'

interface Props {
  children: ReactNode
}

/**
 * Material-UI ThemeProvider wrapper
 * MUI 기본 테마를 최대한 활용하며, 다크/라이트 모드만 동적으로 전환
 */
export function MuiThemeProvider({ children }: Props) {
  const { theme: mode } = useTheme()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === 'dark' ? 'dark' : 'light',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
            },
          },
        },
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
