import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { Dashboard } from '@/pages/dashboard'
import { DataHub } from '@/pages/data-hub'
import { Companies } from '@/pages/companies'
import { DataSources } from '@/pages/data-sources'
import { Categories } from '@/pages/categories'
import { Resources } from '@/pages/resources'
import { Pipeline } from '@/pages/pipeline'
import { Catalog } from '@/pages/catalog'
import { Quality } from '@/pages/quality'
import { LayoutGallery } from '@/pages/layout-gallery'
import { BasicLayout } from '@/pages/layout-gallery/demos/basic'
import { TwoColumnLayout } from '@/pages/layout-gallery/demos/two-column'
import { ThreeColumnLayout } from '@/pages/layout-gallery/demos/three-column'
import { FourColumnLayout } from '@/pages/layout-gallery/demos/four-column'
import { ThreeRowsLayout } from '@/pages/layout-gallery/demos/three-rows'
import { SearchLayout } from '@/pages/layout-gallery/demos/search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/datahub" replace />,
      },
      {
        path: 'datahub',
        element: <Dashboard />,
      },
      {
        path: 'datahub/explorer',
        element: <DataHub />,
      },
      {
        path: 'datahub/companies',
        element: <Companies />,
      },
      {
        path: 'datahub/datasources',
        element: <DataSources />,
      },
      {
        path: 'datahub/categories',
        element: <Categories />,
      },
      {
        path: 'datahub/resources',
        element: <Resources />,
      },
      {
        path: 'pipeline',
        element: <Pipeline />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
      },
      {
        path: 'quality',
        element: <Quality />,
      },
      {
        path: 'layouts',
        element: <LayoutGallery />,
      },
      {
        path: 'layouts/basic',
        element: <BasicLayout />,
      },
      {
        path: 'layouts/2column',
        element: <TwoColumnLayout />,
      },
      {
        path: 'layouts/3column',
        element: <ThreeColumnLayout />,
      },
      {
        path: 'layouts/4column',
        element: <FourColumnLayout />,
      },
      {
        path: 'layouts/3rows',
        element: <ThreeRowsLayout />,
      },
      {
        path: 'layouts/search',
        element: <SearchLayout />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
