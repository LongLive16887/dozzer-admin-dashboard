import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";

export const ViewSubCategory = ({ categoryId }: IViewSubCategory) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/${categoryId}/sub-categories`);
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