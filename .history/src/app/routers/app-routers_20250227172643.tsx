import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardPage,
  CategoriesPage,
  SubcategoriesPage,
  BasePage,
  ItemsPage,
  LoginPage
} from "@/pages";

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
      path: "/sub-categories/:",
      element: <SubcategoriesPage />,
    },
    {
      path: "/base",
      element: <BasePage />,
    },
    {
      path: "items",
      element: <ItemsPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={routerConfig} />;
};