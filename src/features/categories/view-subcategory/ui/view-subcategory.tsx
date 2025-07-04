import { Button } from "@/shared/ui/button";
import { IViewSubCategory } from "../model";
import { Link } from "react-router-dom";

export const ViewSubCategory = ({ categoryId,categoryName }: IViewSubCategory) => {

  return (
    <Link to="/categories/sub-categories" state={{ categoryId: categoryId, categoryName: categoryName }}>
      <Button
      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700"
      variant="default">
      Sub Category
      </Button>
    </Link>
  );
};