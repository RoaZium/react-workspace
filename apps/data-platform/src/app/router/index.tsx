import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { DataHubPage } from '@/pages/DataHubPage'
import { PipelinePage } from '@/pages/PipelinePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { QualityPage } from '@/pages/QualityPage'
import { LayoutGalleryPage } from '@/pages/LayoutGalleryPage'
import { BasicLayoutPage } from '@/pages/layouts/BasicLayoutPage'
import { TwoColumnLayoutPage } from '@/pages/layouts/TwoColumnLayoutPage'
import { ThreeColumnLayoutPage } from '@/pages/layouts/ThreeColumnLayoutPage'
import { FourColumnLayoutPage } from '@/pages/layouts/FourColumnLayoutPage'
import { ThreeRowsLayoutPage } from '@/pages/layouts/ThreeRowsLayoutPage'
import { SearchLayoutPage } from '@/pages/layouts/SearchLayoutPage'

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
