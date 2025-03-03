import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";

export const ViewContents = ({ categoryId }: IViewSubCategory) => {
  const navigateTo = useNavigate();
  const handleViewContents = () => {
    navigateTo(`/feeds/${categoryId}`);
  };

  return (
    <Button
      className="cursor-pointer"
      variant="secondary"
      onClick={handleViewContents}
    >
      View Contents
    </Button>
  );
};