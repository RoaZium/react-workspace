import { AppLayout as BaseAppLayout } from '@workspace/ui'
import { layoutConfig } from './navigation.config'

export function AppLayout() {
  return <BaseAppLayout config={layoutConfig} />
}
