import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewItems } from "../model";

export const ViewSubCategory = ({ subcategoryId }: IViewItems) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/categories/${categoryId}/sub-categories/`);
  };

  return (
    <Button
      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700"
      variant="default"
      onClick={handleViewSubCategory}
    >
      Sub Category
    </Button>
  );
};