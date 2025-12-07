import {
  PageLayout,
  PageHeader,
  PageContent,
  SearchLayout,
  MasterDetailLayout,
  Card,
  Table,
  Button,
} from '@workspace/ui'
import { Box, Typography, Chip, Stack } from '@mui/material'

/**
 * Data Catalog 페이지
 *
 * 계층 구조:
 * 1. 페이지 템플릿: PageLayout → PageHeader + PageContent
 * 2. 섹션 템플릿: SearchLayout (검색 조건 + 결과)
 *                → MasterDetailLayout (목록 + 상세)
 * 3. 컴포넌트: Table, Card 등
 */
export function CatalogPage() {
  // Mock data for demonstration
  const catalogItems = [
    { id: 1, name: 'users_table', type: 'Table', database: 'production', tags: ['PII', 'Customer'] },
    { id: 2, name: 'orders_view', type: 'View', database: 'analytics', tags: ['Sales'] },
    { id: 3, name: 'products_table', type: 'Table', database: 'production', tags: ['Inventory'] },
    { id: 4, name: 'sales_report', type: 'Report', database: 'analytics', tags: ['Sales', 'Monthly'] },
  ]

  const selectedItem = catalogItems[0]

  return (
    <PageLayout>
      <PageHeader
        title="Data Catalog"
        description="데이터 자산을 검색하고 메타데이터를 관리하세요"
        actions={
          <>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Import Metadata
            </Button>
            <Button variant="contained">Register Data Asset</Button>
          </>
        }
      />

      <PageContent>
        <SearchLayout>
          <SearchLayout.Condition>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <input
                type="text"
                placeholder="데이터 자산 검색..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
              <select style={{ padding: '8px 12px', borderRadius: '4px' }}>
                <option>모든 타입</option>
                <option>Table</option>
                <option>View</option>
                <option>Report</option>
              </select>
              <select style={{ padding: '8px 12px', borderRadius: '4px' }}>
                <option>모든 데이터베이스</option>
                <option>production</option>
                <option>analytics</option>
              </select>
              <Button variant="contained">검색</Button>
            </Box>
          </SearchLayout.Condition>

          <SearchLayout.Result>
            <MasterDetailLayout ratio={[4, 6]}>
              <MasterDetailLayout.MasterPanel title="데이터 자산 목록">
                <Table>
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>타입</th>
                      <th>데이터베이스</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.database}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </MasterDetailLayout.MasterPanel>

              <MasterDetailLayout.DetailPanel title="데이터 자산 상세">
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedItem.name}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    {selectedItem.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" color="primary" />
                    ))}
                  </Stack>

                  <Card title="기본 정보" sx={{ mb: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 1 }}>
                      <Typography fontWeight={600}>타입:</Typography>
                      <Typography>{selectedItem.type}</Typography>

                      <Typography fontWeight={600}>데이터베이스:</Typography>
                      <Typography>{selectedItem.database}</Typography>

                      <Typography fontWeight={600}>생성일:</Typography>
                      <Typography>2024-01-15</Typography>

                      <Typography fontWeight={600}>최종 수정:</Typography>
                      <Typography>2024-12-01</Typography>
                    </Box>
                  </Card>

                  <Card title="스키마">
                    <Table>
                      <thead>
                        <tr>
                          <th>컬럼명</th>
                          <th>타입</th>
                          <th>Nullable</th>
                          <th>설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>id</td>
                          <td>bigint</td>
                          <td>NO</td>
                          <td>Primary Key</td>
                        </tr>
                        <tr>
                          <td>name</td>
                          <td>varchar(255)</td>
                          <td>NO</td>
                          <td>User name</td>
                        </tr>
                        <tr>
                          <td>email</td>
                          <td>varchar(255)</td>
                          <td>NO</td>
                          <td>User email</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>

                  <Card title="데이터 계보" sx={{ mt: 2 }}>
                    <Typography color="text.secondary">
                      데이터 계보 다이어그램이 여기에 표시됩니다.
                    </Typography>
                  </Card>
                </Box>
              </MasterDetailLayout.DetailPanel>
            </MasterDetailLayout>
          </SearchLayout.Result>
        </SearchLayout>
      </PageContent>
    </PageLayout>
  )
}
