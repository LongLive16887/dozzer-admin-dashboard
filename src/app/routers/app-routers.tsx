import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./protected-route";
import { SuperProtectedRoute } from "./superProtectedRoute";

const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const SubcategoriesPage = lazy(() => import('@/pages/SubcategoriesPage'))
const BasePage = lazy(() => import('@/pages/BasePage'))
const ItemsPage = lazy(() => import('@/pages/ItemsPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SuperAdminLoginPage = lazy(() => import('@/pages/SuperAdminLoginPage'))
const SuperAdminPanelPage = lazy(() => import('@/pages/SuperAdminPanelPage'))

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
          <LoginPage />
    },
    {
      path: '/super-login',
      element: 
          <SuperAdminLoginPage />
    },
    {
      path: '/super-admin',
      element: (
        <SuperProtectedRoute>
          <SuperAdminPanelPage />
        </SuperProtectedRoute>
      ),
    },
  ])

  return <RouterProvider router={routerConfig} />
}