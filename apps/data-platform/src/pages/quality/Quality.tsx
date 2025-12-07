import {
  PageLayout,
  PageHeader,
  PageContent,
  StatCard,
  TabLayout,
  Table,
  Card,
  Button,
} from '@workspace/ui'
import { Box, LinearProgress, Typography, Chip } from '@mui/material'

/**
 * Data Quality 페이지
 *
 * 계층 구조:
 * 1. 페이지 템플릿: PageLayout → PageHeader + PageContent
 * 2. 섹션 템플릿: TabLayout (규칙, 히스토리, 모니터링 탭)
 *                → GridLayout (통계 카드)
 * 3. 컴포넌트: StatCard, Table, Card 등
 */
export function Quality() {
  // Mock data for demonstration
  const qualityRules = [
    { id: 1, name: 'Null Check - Email', table: 'users', status: 'Pass', lastRun: '2024-12-03 10:30' },
    { id: 2, name: 'Unique Check - User ID', table: 'users', status: 'Pass', lastRun: '2024-12-03 10:30' },
    { id: 3, name: 'Range Check - Age', table: 'users', status: 'Fail', lastRun: '2024-12-03 10:30' },
    { id: 4, name: 'Format Check - Phone', table: 'users', status: 'Warning', lastRun: '2024-12-03 10:30' },
  ]

  const qualityHistory = [
    { date: '2024-12-03', score: 94, passed: 47, failed: 3, warnings: 2 },
    { date: '2024-12-02', score: 92, passed: 46, failed: 4, warnings: 2 },
    { date: '2024-12-01', score: 95, passed: 48, failed: 2, warnings: 2 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'success'
      case 'Fail':
        return 'error'
      case 'Warning':
        return 'warning'
      default:
        return 'default'
    }
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 3 }}>
            <StatCard icon="📊" value="94%" label="품질 점수" trend={{ value: 2, direction: 'up' }} />
            <StatCard icon="✅" value="47" label="통과 규칙" />
            <StatCard icon="❌" value="3" label="실패 규칙" trend={{ value: 1, direction: 'down' }} />
            <StatCard icon="⚠️" value="2" label="경고" />
          </Box>

          <Card title="품질 규칙">
            <Table>
              <thead>
                <tr>
                  <th>규칙명</th>
                  <th>대상 테이블</th>
                  <th>상태</th>
                  <th>마지막 실행</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {qualityRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.name}</td>
                    <td>{rule.table}</td>
                    <td>
                      <Chip
                        label={rule.status}
                        size="small"
                        color={getStatusColor(rule.status) as any}
                      />
                    </td>
                    <td>{rule.lastRun}</td>
                    <td>
                      <Button variant="text" size="small">
                        실행
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Box>
      ),
    },
    {
      id: 'rules',
      label: 'Rules',
      content: (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">품질 규칙 관리</Typography>
            <Button variant="contained">새 규칙 추가</Button>
          </Box>

          <Card>
            <Table>
              <thead>
                <tr>
                  <th>규칙명</th>
                  <th>타입</th>
                  <th>대상</th>
                  <th>조건</th>
                  <th>상태</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {qualityRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.name}</td>
                    <td>Validation</td>
                    <td>{rule.table}</td>
                    <td>NOT NULL</td>
                    <td>
                      <Chip label="Active" size="small" color="success" />
                    </td>
                    <td>
                      <Button variant="text" size="small" sx={{ mr: 1 }}>
                        편집
                      </Button>
                      <Button variant="text" size="small" color="error">
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Box>
      ),
    },
    {
      id: 'history',
      label: 'History',
      content: (
        <Box>
          <Card title="품질 점수 추이">
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                최근 7일간 품질 점수 추이
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">[차트 영역]</Typography>
              </Box>
            </Box>

            <Table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>품질 점수</th>
                  <th>통과</th>
                  <th>실패</th>
                  <th>경고</th>
                </tr>
              </thead>
              <tbody>
                {qualityHistory.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date}</td>
                    <td>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.score}
                          sx={{ flex: 1, height: 8, borderRadius: 1 }}
                        />
                        <Typography variant="body2">{item.score}%</Typography>
                      </Box>
                    </td>
                    <td>{item.passed}</td>
                    <td>{item.failed}</td>
                    <td>{item.warnings}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Box>
      ),
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      content: (
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
            <Card title="실시간 모니터링">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    데이터 신선도
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={95}
                    color="success"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    95% - 양호
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    데이터 정확도
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={88}
                    color="warning"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    88% - 주의 필요
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    데이터 완전성
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={92}
                    color="success"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    92% - 양호
                  </Typography>
                </Box>
              </Box>
            </Card>

            <Card title="알림">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, bgcolor: 'error.50', borderRadius: 1, borderLeft: 3, borderColor: 'error.main' }}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    데이터 품질 저하 감지
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    users 테이블의 age 컬럼에서 범위 초과 값 발견
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    10분 전
                  </Typography>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 1, borderLeft: 3, borderColor: 'warning.main' }}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    품질 규칙 경고
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    phone 포맷 검증에서 경고 발생
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    1시간 전
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      ),
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Data Quality"
        description="데이터 품질을 모니터링하고 관리하세요"
        actions={
          <>
            <Button variant="outlined" sx={{ mr: 1 }}>
              리포트 생성
            </Button>
            <Button variant="contained">규칙 실행</Button>
          </>
        }
      />

      <PageContent>
        <TabLayout tabs={tabs} defaultTab="overview" />
      </PageContent>
    </PageLayout>
  )
}
