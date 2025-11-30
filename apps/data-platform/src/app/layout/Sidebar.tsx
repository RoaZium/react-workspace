import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/datasource"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          🗄️ Datasource
        </NavLink>
        <NavLink
          to="/pipeline"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          🔄 Pipeline
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          📚 Catalog
        </NavLink>
        <NavLink
          to="/quality"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          ✅ Quality
        </NavLink>
        <NavLink
          to="/layout/basic"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          📄 Basic
        </NavLink>
        <NavLink
          to="/layout/2column"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          ⚌ 2 Column
        </NavLink>
        <NavLink
          to="/layout/3column"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          ⚏ 3 Column
        </NavLink>
        <NavLink
          to="/layout/4column"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          ⚏ 4 Column
        </NavLink>
        <NavLink
          to="/layout/3rows"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          ☰ 3 Rows
        </NavLink>
        <NavLink
          to="/layout/search"
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          🔍 Search
        </NavLink>
      </nav>
    </aside>
  )
}
