import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./protected-route";
import { PublicRoute } from "./public-route";

// Ленивая загрузка страниц
const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const SubcategoriesPage = lazy(() => import('@/pages/SubcategoriesPage'))
const BasePage = lazy(() => import('@/pages/BasePage'))
const ItemsPage = lazy(() => import('@/pages/ItemsPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SuperAdminPanelPage = lazy(() => import('@/pages/SuperAdminPanelPage'))
const NotFoundPage = lazy(() => import('@/pages/404Page'))

export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories',
      element: (
        <ProtectedRoute>
          <CategoriesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories/sub-categories',
      element: (
        <ProtectedRoute>
          <SubcategoriesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/base',
      element: (
        <ProtectedRoute>
          <BasePage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/categories/sub-categories/items',
      element: (
        <ProtectedRoute>
          <ItemsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element:
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
    },
    {
      path: '/super-admin',
      element: (
        <SuperAdminPanelPage />
      ),
    },
    {
      path: '*',  
      element: <NotFoundPage />,
    },
  ])

  return <RouterProvider router={routerConfig} />
}
