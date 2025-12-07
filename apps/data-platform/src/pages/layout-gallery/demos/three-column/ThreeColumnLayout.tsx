import { Page, PageHeader, PageContent, ThreeColumn, Card } from '@workspace/ui'

export function ThreeColumnLayout() {
  return (
    <Page>
      <PageHeader
        title="3단 컬럼 레이아웃"
        description="콘텐츠를 세 개의 컬럼으로 균등하게 분할"
      />

      <PageContent>
        <ThreeColumn columns={3}>
          <Card title="첫 번째 컬럼">
            <p>왼쪽 컬럼입니다.</p>
          </Card>

          <Card title="두 번째 컬럼">
            <p>중앙 컬럼입니다.</p>
          </Card>

          <Card title="세 번째 컬럼">
            <p>오른쪽 컬럼입니다.</p>
          </Card>
        </ThreeColumn>
      </PageContent>
    </Page>
  )
}
