import { Page, PageHeader, PageContent, Card } from '@workspace/ui'

export function BasicLayoutPage() {
  return (
    <Page>
      <PageHeader
        title="기본 레이아웃"
        description="단순하고 깔끔한 기본 섹션 레이아웃"
      />

      <PageContent>
        <Card title="섹션 1">
          <p>기본 레이아웃의 첫 번째 섹션입니다.</p>
        </Card>

        <Card title="섹션 2">
          <p>기본 레이아웃의 두 번째 섹션입니다.</p>
        </Card>

        <Card title="섹션 3">
          <p>기본 레이아웃의 세 번째 섹션입니다.</p>
        </Card>
      </PageContent>
    </Page>
  )
}
