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
          primary: {
            main: mode === 'dark' ? '#60a5fa' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f87171' : '#dc004e',
          },
          success: {
            main: mode === 'dark' ? '#4ade80' : '#4caf50',
          },
          warning: {
            main: mode === 'dark' ? '#fbbf24' : '#ff9800',
          },
          error: {
            main: mode === 'dark' ? '#ef4444' : '#f44336',
          },
          background: {
            default: mode === 'dark' ? '#111827' : '#ffffff',
            paper: mode === 'dark' ? '#1f2937' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#f9fafb' : '#111827',
            secondary: mode === 'dark' ? '#d1d5db' : '#6b7280',
            disabled: mode === 'dark' ? '#9ca3af' : '#9ca3af',
          },
        },
        typography: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.3,
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
          },
          h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
          },
          h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
          button: {
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
          },
          caption: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
          },
          overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor: mode === 'dark' ? '#1f2937' : '#1976d2',
                color: mode === 'dark' ? '#f9fafb' : '#ffffff',
              },
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
