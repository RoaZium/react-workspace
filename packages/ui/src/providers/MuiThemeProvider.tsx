import { ReactNode, useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface Props {
  children: ReactNode
}

/**
 * Material-UI ThemeProvider wrapper
 * MUI를 사용하는 앱에서만 선택적으로 사용
 * MUI가 없는 프로젝트에서는 사용하지 않아도 됨
 */
export function MuiThemeProvider({ children }: Props) {
  const { theme: mode } = useTheme()

  // MUI가 설치되어 있는지 동적으로 확인
  let MuiThemeProvider: any
  let createTheme: any
  let CssBaseline: any

  try {
    const mui = require('@mui/material')
    MuiThemeProvider = mui.ThemeProvider
    createTheme = mui.createTheme
    CssBaseline = mui.CssBaseline
  } catch (e) {
    // MUI가 없으면 children만 반환
    console.warn('@mui/material is not installed. MuiThemeProvider will not apply MUI theming.')
    return <>{children}</>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
          background: {
            default: mode === 'dark' ? '#111827' : '#ffffff',
            paper: mode === 'dark' ? '#1f2937' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#f9fafb' : '#111827',
            secondary: mode === 'dark' ? '#d1d5db' : '#6b7280',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'dark' ? '#1f2937' : '#1976d2',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'dark' ? '#1f2937' : '#ffffff',
                borderRight: `1px solid ${mode === 'dark' ? '#374151' : '#e5e7eb'}`,
              },
            },
          },
        },
      }),
    [mode, createTheme]
  )

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
