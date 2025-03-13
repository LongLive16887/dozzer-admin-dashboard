import { Button } from "@/shared/ui/button";
import { IViewItems } from "../model";
import { Link } from "react-router-dom";

export const ViewItems = ({ subcategoryId,subcategoryName,categoryName }: IViewItems) => {

  
  return (
    <Link to="/categories/sub-categories/items" state = {{subcategoryId: subcategoryId,}}>
      <Button
      className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700"
      variant="default"
    >
      View items
    </Button>
    </Link>
  );
};