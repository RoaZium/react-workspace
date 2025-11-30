import { MultiColumnLayout } from '@workspace/ui/layouts'

export function ThreeColumnLayoutPage() {
  return (
    <MultiColumnLayout columns={3}>
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
    </MultiColumnLayout>
  )
}
