import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { DatasourcePage } from '@/pages/DatasourcePage'
import { PipelinePage } from '@/pages/PipelinePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { QualityPage } from '@/pages/QualityPage'
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
        path: 'layout/basic',
        element: <BasicLayoutPage />,
      },
      {
        path: 'layout/2column',
        element: <TwoColumnLayoutPage />,
      },
      {
        path: 'layout/3column',
        element: <ThreeColumnLayoutPage />,
      },
      {
        path: 'layout/4column',
        element: <FourColumnLayoutPage />,
      },
      {
        path: 'layout/3rows',
        element: <ThreeRowsLayoutPage />,
      },
      {
        path: 'layout/search',
        element: <SearchLayoutPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
