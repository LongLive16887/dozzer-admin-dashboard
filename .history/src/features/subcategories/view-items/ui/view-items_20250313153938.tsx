import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewItems } from "../model";
import { Link } from "react-router-dom";

export const ViewItems = ({ subcategoryId,subcategoryName,categoryId,categoryName }: IViewItems) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/categories/${categoryId}/sub-categories/${subcategoryId}/items`);
  };

  return (
    <Link to=>
      <Button
      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700"
      variant="default"
      onClick={handleViewSubCategory}
    >
      View items
    </Button>
    </Link>
  );
};