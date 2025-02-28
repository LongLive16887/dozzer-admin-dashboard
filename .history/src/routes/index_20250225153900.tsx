import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import CategoriesPage from "@/pages/CategoriesPage";
import SubcategoriesPage from "@/pages/SubcategoriesPage";
import BasePage from "@/pages/BasePage";
import ItemsPage from "@/pages/ItemsPage";
import {Login} from "@/pages/LoginPage";
/* import { useAuth } from "@/auth/AuthContext";  */// Проверка авторизации */

/* const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth(); // Получаем пользователя из контекста авторизации
  return user ? children : <Navigate to="/login" replace />;
}; */

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="subcategories" element={<SubcategoriesPage />} />
          <Route path="base" element={<BasePage />} />
          <Route path="items" element={<ItemsPage />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
