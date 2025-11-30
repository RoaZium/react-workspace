import { MultiColumnLayout } from '@workspace/ui/layouts'

export function TwoColumnLayoutPage() {
  return (
    <MultiColumnLayout columns={2}>
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
    </MultiColumnLayout>
  )
}
