import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";

export const ViewSubCategory = ({ categoryId }: IViewSubCategory) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/categories/${categoryId}/sub-categories`);
  };

  return (
    <Link to="/profile" state={{ id: '123' }}>
      Go to Profile
    </Link>
  );
};