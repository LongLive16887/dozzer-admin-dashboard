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
      path: "feed-items",
      element: <ItemsPage />,
    },
    {
      path: "feed-items",
      element: <ItemsPage />,
    },
  ]);
  return <RouterProvider router={routerConfig} />;
};