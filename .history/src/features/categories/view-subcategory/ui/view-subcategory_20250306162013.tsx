import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";
import {Link}

export const ViewSubCategory = ({ categoryId }: IViewSubCategory) => {

  const navigateTo = useNavigate();
  const handleViewSubCategory = () => {
    navigateTo(`/categories/${categoryId}/sub-categories`);
  };

  return (
    <Link>
    
    </Link>
  );
};