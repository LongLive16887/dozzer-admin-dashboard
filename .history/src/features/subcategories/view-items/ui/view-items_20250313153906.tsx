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
    <Link></>
  );
};