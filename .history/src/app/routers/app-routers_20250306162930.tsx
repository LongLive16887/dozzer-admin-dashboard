import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const SubcategoriesPage = lazy(() => import("@/pages/SubcategoriesPage"));
const BasePage = lazy(() => import("@/pages/BasePage"));
const ItemsPage = lazy(() => import("@/pages/ItemsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
    },
    {
      path: "/categories",
      element: <CategoriesPage />,
    },
    {
      path: "/categories/:categoryId/sub-categories/",
      element: <SubcategoriesPage />,
    },
    {
      path: "/base",
      element: <BasePage />,
    },
    {
      path: "/categories/:categoryId/sub-categories/:sub",
      element: <ItemsPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={routerConfig} />;
};