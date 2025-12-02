import { ThreeColumnHierarchyLayout } from '@workspace/ui/layouts'

export function HierarchyLayoutPage() {
  return (
    <ThreeColumnHierarchyLayout>
      <ThreeColumnHierarchyLayout.Column width="28%">
        <h3>데이터소스 (대)</h3>
        <p>첫 번째 계층 영역</p>
      </ThreeColumnHierarchyLayout.Column>

      <ThreeColumnHierarchyLayout.Column width="28%">
        <h3>카테고리 (중)</h3>
        <p>두 번째 계층 영역</p>
      </ThreeColumnHierarchyLayout.Column>

      <ThreeColumnHierarchyLayout.Detail>
        <ThreeColumnHierarchyLayout.List>
          <h3>리소스 리스트 (소)</h3>
          <p>세 번째 계층 - 리스트 영역</p>
        </ThreeColumnHierarchyLayout.List>

        <ThreeColumnHierarchyLayout.Content>
          <h3>리소스 상세</h3>
          <p>세 번째 계층 - 상세 영역</p>
        </ThreeColumnHierarchyLayout.Content>
      </ThreeColumnHierarchyLayout.Detail>
    </ThreeColumnHierarchyLayout>
  )
}
