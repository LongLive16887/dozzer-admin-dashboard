import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewItems } from "../model";
import 

export const ViewItems = ({ subcategoryId,subcategoryName,categoryId,categoryName }: IViewItems) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/categories/${categoryId}/sub-categories/${subcategoryId}/items`);
  };

  return (
    <Button
      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700"
      variant="default"
      onClick={handleViewSubCategory}
    >
      View items
    </Button>
  );
};