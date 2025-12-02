import { ThemeProvider, MuiThemeProvider } from '@workspace/ui'
import { QueryProvider } from './providers'
import { AppRouter } from './router'
import './styles/globals.css'

export function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider>
        <QueryProvider>
          <AppRouter />
        </QueryProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}
