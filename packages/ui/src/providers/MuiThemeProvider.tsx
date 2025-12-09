import { ReactNode, useMemo } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useTheme } from '../contexts/ThemeContext'

interface Props {
  children: ReactNode
}

/**
 * Material Design 3 ThemeProvider
 * MD3 디자인 토큰과 컴포넌트 스타일을 적용
 */
export function MuiThemeProvider({ children }: Props) {
  const { theme: mode } = useTheme()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === 'dark' ? 'dark' : 'light',
          primary: {
            main: mode === 'dark' ? '#A8C7FA' : '#1976d2',
            light: mode === 'dark' ? '#C2D9FF' : '#42a5f5',
            dark: mode === 'dark' ? '#8AB4F8' : '#1565c0',
          },
          secondary: {
            main: mode === 'dark' ? '#F9A825' : '#dc004e',
            light: mode === 'dark' ? '#FDD835' : '#e33371',
            dark: mode === 'dark' ? '#F57F17' : '#c51162',
          },
          background: {
            default: mode === 'dark' ? '#1a1c1e' : '#fafafa',
            paper: mode === 'dark' ? '#1f2124' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#e3e3e3' : '#1c1b1f',
            secondary: mode === 'dark' ? '#c4c6ca' : '#49454f',
          },
          divider: mode === 'dark' ? '#2d2f31' : '#e7e0ec',
        },
        shape: {
          borderRadius: 12, // MD3 rounded corners
        },
        typography: {
          fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: 0,
          },
          h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: 0,
          },
          h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: 0,
          },
          h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: 0,
          },
          h5: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: 0,
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: 0,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: 0.15,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: 0.15,
          },
          button: {
            textTransform: 'none', // MD3 uses sentence case
            fontWeight: 500,
            letterSpacing: 0.1,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === 'dark'
                  ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)'
                  : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 20, // MD3 pill-shaped buttons
                padding: '10px 24px',
                textTransform: 'none',
                fontWeight: 500,
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
              elevation1: {
                boxShadow: mode === 'dark'
                  ? '0 1px 3px rgba(0, 0, 0, 0.5)'
                  : '0 1px 3px rgba(0, 0, 0, 0.12)',
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
