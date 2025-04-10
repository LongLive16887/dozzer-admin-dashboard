// components/SuperProtectedRoute.tsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";

interface SuperProtectedRouteProps {
  children: React.ReactNode;
}

export const SuperProtectedRoute: React.FC<SuperProtectedRouteProps> = ({ children }) => {
  const superKey = useSelector((state: RootState) => state.superAdmin.superKey);
  const navigate = useNavigate();

  useEffect(() => {
    if (!superKey) {
      navigate("/super-login", { replace: true });
    }
  }, [superKey, navigate]);

  if (!superKey) return null;

  return <>{children}</>;
};
