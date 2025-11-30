import { MultiColumnLayout } from '@workspace/ui/layouts'

export function FourColumnLayoutPage() {
  return (
    <MultiColumnLayout columns={4}>
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
      <MultiColumnLayout.Column />
    </MultiColumnLayout>
  )
}
