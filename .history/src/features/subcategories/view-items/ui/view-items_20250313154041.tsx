import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { IViewItems } from "../model";
import { Link } from "react-router-dom";

export const ViewItems = ({ subcategoryId,subcategoryName,categoryName }: IViewItems) => {

  

  return (
    <Link to="/categories/sub-categories/items" state = {{}}>
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