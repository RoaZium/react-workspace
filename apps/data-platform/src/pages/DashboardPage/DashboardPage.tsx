import { PageLayout, PageHeader, PageContent, GridLayout, StatCard, Card } from '@workspace/ui'
import { Typography, Stack, Box } from '@mui/material'

export function DashboardPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Dashboard"
        description="데이터 플랫폼 전체 현황을 확인하세요"
      />

      <PageContent>
        <GridLayout columns={4} gap="medium">
          <StatCard
            icon="🗄️"
            value="24"
            label="Active Data Hubs"
            trend={{ value: '+3', isPositive: true }}
          />
          <StatCard
            icon="🔄"
            value="12"
            label="Running Pipelines"
            trend={{ value: '+2', isPositive: true }}
          />
          <StatCard
            icon="📚"
            value="156"
            label="Catalog Items"
            trend={{ value: '+12', isPositive: true }}
          />
          <StatCard
            icon="✅"
            value="98.5%"
            label="Data Quality Score"
            trend={{ value: '+0.3%', isPositive: true }}
          />
        </GridLayout>

        <Card>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Recent Activity
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                5분 전
              </Typography>
              <Typography variant="body2">
                Pipeline "Sales ETL" 실행 완료
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                15분 전
              </Typography>
              <Typography variant="body2">
                Data Hub "MySQL Production" 연결 성공
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                1시간 전
              </Typography>
              <Typography variant="body2">
                Data Quality 검사 완료
              </Typography>
            </Box>
          </Stack>
        </Card>
      </PageContent>
    </PageLayout>
  )
}
