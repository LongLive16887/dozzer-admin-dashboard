import { IUpdateCategory } from "../model"
import { Button } from "@/shared/ui/button"

export const UpdateCategory = ({updateCategoryId: IUpdateCategory}) => {
    return(
        <Button variant="outline">{updateCategoryId}</Button>
    )
}