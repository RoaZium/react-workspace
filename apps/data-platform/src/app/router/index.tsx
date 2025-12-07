import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/dashboard'
import { DataHubPage } from '@/pages/data-hub'
import { CompaniesPage } from '@/pages/companies'
import { DataSourcesPage } from '@/pages/data-sources'
import { CategoriesPage } from '@/pages/categories'
import { ResourcesPage } from '@/pages/resources'
import { PipelinePage } from '@/pages/pipeline'
import { CatalogPage } from '@/pages/catalog'
import { QualityPage } from '@/pages/quality'
import { LayoutGalleryPage } from '@/pages/layout-gallery'
import { BasicLayoutPage } from '@/pages/layout-gallery/demos/basic'
import { TwoColumnLayoutPage } from '@/pages/layout-gallery/demos/two-column'
import { ThreeColumnLayoutPage } from '@/pages/layout-gallery/demos/three-column'
import { FourColumnLayoutPage } from '@/pages/layout-gallery/demos/four-column'
import { ThreeRowsLayoutPage } from '@/pages/layout-gallery/demos/three-rows'
import { SearchLayoutPage } from '@/pages/layout-gallery/demos/search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'datahub',
        element: <DataHubPage />,
      },
      {
        path: 'datahub/companies',
        element: <CompaniesPage />,
      },
      {
        path: 'datahub/datasources',
        element: <DataSourcesPage />,
      },
      {
        path: 'datahub/categories',
        element: <CategoriesPage />,
      },
      {
        path: 'datahub/resources',
        element: <ResourcesPage />,
      },
      {
        path: 'pipeline',
        element: <PipelinePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'quality',
        element: <QualityPage />,
      },
      {
        path: 'layouts',
        element: <LayoutGalleryPage />,
      },
      {
        path: 'layouts/basic',
        element: <BasicLayoutPage />,
      },
      {
        path: 'layouts/2column',
        element: <TwoColumnLayoutPage />,
      },
      {
        path: 'layouts/3column',
        element: <ThreeColumnLayoutPage />,
      },
      {
        path: 'layouts/4column',
        element: <FourColumnLayoutPage />,
      },
      {
        path: 'layouts/3rows',
        element: <ThreeRowsLayoutPage />,
      },
      {
        path: 'layouts/search',
        element: <SearchLayoutPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
