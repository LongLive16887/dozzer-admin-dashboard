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
      path: "/feed-categories",
      element: <CategoriesPage />,
    },
    {
      path: "/feeds",
      element: <SubcategoriesPage />,
    },
    {
      path: "/feeds/:feedId",
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