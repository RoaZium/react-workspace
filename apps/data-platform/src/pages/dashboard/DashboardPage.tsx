import { PageLayout, PageHeader, PageContent, GridLayout, StatCard, Card } from '@workspace/ui'
import { Typography, Stack, Box } from '@mui/material'

export function DashboardPage() {
  return (
    <PageLayout>
      <PageHeader
        title="📊 Dashboard"
        description="데이터 허브 전체 현황을 확인하세요"
      />

      <PageContent>
        <GridLayout columns={4} gap="medium">
          <StatCard
            icon="🗂️"
            value="24"
            label="DataSource"
            trend={{ value: '+3', isPositive: true }}
          />
          <StatCard
            icon="📁"
            value="156"
            label="Category"
            trend={{ value: '+12', isPositive: true }}
          />
          <StatCard
            icon="📄"
            value="1,247"
            label="Resource"
            trend={{ value: '+89', isPositive: true }}
          />
          <StatCard
            icon="✅"
            value="96.8%"
            label="활성률"
            trend={{ value: '+1.2%', isPositive: true }}
          />
        </GridLayout>

        <Card>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Recent Activities
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                5분 전
              </Typography>
              <Typography variant="body2">
                DataSource "IoT Sensor Hub" 생성됨
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                15분 전
              </Typography>
              <Typography variant="body2">
                Category "환경 센서" 하위에 Resource 12개 추가됨
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                1시간 전
              </Typography>
              <Typography variant="body2">
                DataSource "ERP System" 활성화됨
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                2시간 전
              </Typography>
              <Typography variant="body2">
                Resource "온도센서-101" 메타데이터 업데이트됨
              </Typography>
            </Box>
          </Stack>
        </Card>

        <GridLayout columns={2} gap="medium">
          <Card>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Resource Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary">
              카테고리별 리소스 분포 차트 영역
            </Typography>
          </Card>

          <Card>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Links
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                → DataSource 관리
              </Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                → Category 관리
              </Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                → Resource 관리
              </Typography>
            </Stack>
          </Card>
        </GridLayout>
      </PageContent>
    </PageLayout>
  )
}
