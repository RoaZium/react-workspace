import { Page, PageHeader, PageContent, Stack, Card } from '@workspace/ui'

export function ThreeRowsLayout() {
  return (
    <Page>
      <PageHeader
        title="3단 행 레이아웃"
        description="헤더, 콘텐츠, 푸터로 구성된 전통적인 3단 레이아웃"
      />

      <PageContent>
        <Stack gap={2}>
          <Card title="헤더 영역">
            <p>페이지 상단 헤더 콘텐츠</p>
          </Card>

          <Card title="메인 콘텐츠 영역">
            <p>페이지의 주요 콘텐츠가 표시됩니다.</p>
            <p>이 영역이 가장 많은 공간을 차지합니다.</p>
          </Card>

          <Card title="푸터 영역">
            <p>페이지 하단 푸터 콘텐츠</p>
          </Card>
        </Stack>
      </PageContent>
    </Page>
  )
}
