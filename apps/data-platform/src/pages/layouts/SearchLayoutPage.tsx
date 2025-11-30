import { SearchLayout } from '@workspace/ui/layouts'

export function SearchLayoutPage() {
  return (
    <SearchLayout>
      <SearchLayout.Condition />
      <SearchLayout.Result />
    </SearchLayout>
  )
}
