import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";

export const View = ({ categoryId }: IViewSubCategory) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/feeds/${categoryId}`);
  };

  return (
    <Button
      className="cursor-pointer"
      variant="secondary"
      onClick={handleViewSubCategory}
    >
      Sub Category
    </Button>
  );
};