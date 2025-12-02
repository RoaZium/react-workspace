import { ReactNode, useMemo } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useTheme } from '../contexts/ThemeContext'

interface Props {
  children: ReactNode
}

/**
 * Material-UI ThemeProvider wrapper
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
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
            defaultProps: {
              color: 'default',
            },
          },
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
