import { Page, PageHeader, PageContent, SearchLayout as SearchLayoutComponent, Card, Table, Button } from '@workspace/ui'
import { Box } from '@mui/material'

export function SearchLayout() {
  const mockData = [
    { id: 1, name: '항목 1', category: '카테고리 A', status: '활성' },
    { id: 2, name: '항목 2', category: '카테고리 B', status: '대기' },
    { id: 3, name: '항목 3', category: '카테고리 A', status: '활성' },
  ]

  return (
    <Page>
      <PageHeader
        title="검색 레이아웃"
        description="검색 필터와 결과 목록을 효율적으로 배치"
      />

      <PageContent>
        <SearchLayoutComponent>
          <SearchLayoutComponent.Condition>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <input
                type="text"
                placeholder="검색어 입력..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
              <select style={{ padding: '8px 12px', borderRadius: '4px' }}>
                <option>전체 카테고리</option>
                <option>카테고리 A</option>
                <option>카테고리 B</option>
              </select>
              <Button variant="contained">검색</Button>
            </Box>
          </SearchLayoutComponent.Condition>

          <SearchLayoutComponent.Result>
            <Card title="검색 결과">
              <Table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>카테고리</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </SearchLayoutComponent.Result>
        </SearchLayoutComponent>
      </PageContent>
    </Page>
  )
}
