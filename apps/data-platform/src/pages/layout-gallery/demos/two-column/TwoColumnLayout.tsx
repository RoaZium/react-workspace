import { Page, PageHeader, PageContent, ThreeColumn, Card } from '@workspace/ui'

export function TwoColumnLayoutPage() {
  return (
    <Page>
      <PageHeader
        title="2단 컬럼 레이아웃"
        description="콘텐츠를 두 개의 컬럼으로 나누어 표시"
      />

      <PageContent>
        <ThreeColumn columns={2}>
          <Card title="왼쪽 컬럼">
            <p>첫 번째 컬럼의 콘텐츠입니다.</p>
            <p>목록이나 필터를 배치하기 좋습니다.</p>
          </Card>

          <Card title="오른쪽 컬럼">
            <p>두 번째 컬럼의 콘텐츠입니다.</p>
            <p>상세 정보를 표시하기 좋습니다.</p>
          </Card>
        </ThreeColumn>
      </PageContent>
    </Page>
  )
}
