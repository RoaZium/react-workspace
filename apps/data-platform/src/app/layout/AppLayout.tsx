import { AppShell } from '@workspace/ui'
import { layoutConfig } from './navigation.config'

export function AppLayout() {
  return <AppShell config={layoutConfig} />
}
