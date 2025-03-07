import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";
import { Link } from "react-router-dom";

export const ViewSubCategory = ({ categoryId }: IViewSubCategory) => {

  const navigateTo = useNavigate();
  /* const handleViewSubCategory = () => {
    navigateTo(`/categories/${categoryId}/sub-categories`);
  }; */

  return (
    <Link to="/categories/sub-categories/" state={{ id: categoryId }}>
      <Button
      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700"
      variant="default"
    >
      Sub Category
    </Button>
    </Link>
  );
};