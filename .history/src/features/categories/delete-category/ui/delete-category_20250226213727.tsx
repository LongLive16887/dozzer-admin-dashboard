import { IDeleteCategory } from "../model";
import { Button } from "@/shared/ui/button"



export const DeleteCategory = ({deleteCategoryId}: IDeleteCategory) => {
    return(
        <Button variant="destructive">Delete</Button>
    )
}