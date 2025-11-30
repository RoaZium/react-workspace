import { RowsLayout } from '@workspace/ui/layouts'

export function ThreeRowsLayoutPage() {
  return (
    <RowsLayout>
      <RowsLayout.Row columns={1} />
      <RowsLayout.Row columns={3}>
        <RowsLayout.Item />
        <RowsLayout.Item />
        <RowsLayout.Item />
      </RowsLayout.Row>
      <RowsLayout.Row columns={1} />
    </RowsLayout>
  )
}
