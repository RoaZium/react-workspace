import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { DatasourcePage } from '@/pages/DatasourcePage'
import { PipelinePage } from '@/pages/PipelinePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { QualityPage } from '@/pages/QualityPage'
import { LayoutGalleryPage } from '@/pages/LayoutGalleryPage'
import {
  BasicLayoutPage,
  TwoColumnLayoutPage,
  ThreeColumnLayoutPage,
  FourColumnLayoutPage,
  ThreeRowsLayoutPage,
  SearchLayoutPage,
} from '@/pages/layouts'

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
        path: 'datasource',
        element: <DatasourcePage />,
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
