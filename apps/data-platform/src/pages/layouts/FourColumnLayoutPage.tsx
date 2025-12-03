import { Page, PageHeader, PageContent, Grid, StatCard } from '@workspace/ui'

export function FourColumnLayoutPage() {
  return (
    <Page>
      <PageHeader
        title="4단 컬럼 레이아웃"
        description="네 개의 컬럼으로 분할하여 많은 정보를 효율적으로 표시"
      />

      <PageContent>
        <Grid columns={4} gap={2}>
          <StatCard icon="📊" value="1,234" label="지표 1" />
          <StatCard icon="📈" value="5,678" label="지표 2" />
          <StatCard icon="📉" value="91.2%" label="지표 3" />
          <StatCard icon="💰" value="₩12.3M" label="지표 4" />
        </Grid>
      </PageContent>
    </Page>
  )
}
