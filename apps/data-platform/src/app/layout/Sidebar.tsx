import { NavLink, useLocation } from 'react-router-dom'
import './Sidebar.css'

export function Sidebar() {
  const location = useLocation()

  // 현재 어떤 섹션인지 판단
  const currentSection = location.pathname.split('/')[1] || 'dashboard'

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {/* 홈 링크 - 항상 표시 */}
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          Home
        </NavLink>

        <div className="sidebar-divider" />

        {/* 레이아웃 섹션 서브메뉴 */}
        {currentSection === 'layouts' && (
          <>
            <NavLink
              to="/layouts"
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              레이아웃 홈
            </NavLink>
            <NavLink
              to="/layouts/basic"
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              기본 레이아웃
            </NavLink>
            <NavLink
              to="/layouts/2column"
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              2단 컬럼
            </NavLink>
            <NavLink
              to="/layouts/3column"
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              3단 컬럼
            </NavLink>
            <NavLink
              to="/layouts/4column"
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              4단 컬럼
            </NavLink>
            <NavLink
              to="/layouts/3rows"
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              3단 행
            </NavLink>
            <NavLink
              to="/layouts/search"
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              검색 레이아웃
            </NavLink>
          </>
        )}

        {/* Dashboard 섹션 서브메뉴 */}
        {currentSection === 'dashboard' && (
          <>
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Dashboard Home
            </NavLink>
          </>
        )}

        {/* Datasource 섹션 서브메뉴 */}
        {currentSection === 'datasource' && (
          <>
            <NavLink
              to="/datasource"
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Datasource Home
            </NavLink>
          </>
        )}

        {/* Pipeline 섹션 서브메뉴 */}
        {currentSection === 'pipeline' && (
          <>
            <NavLink
              to="/pipeline"
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Pipeline Home
            </NavLink>
          </>
        )}

        {/* Catalog 섹션 서브메뉴 */}
        {currentSection === 'catalog' && (
          <>
            <NavLink
              to="/catalog"
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Catalog Home
            </NavLink>
          </>
        )}

        {/* Quality 섹션 서브메뉴 */}
        {currentSection === 'quality' && (
          <>
            <NavLink
              to="/quality"
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Quality Home
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  )
}
