import { ISubCategory } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const SubCategory = ({
        subCategory,
        deleteFeature,
        updateFeature,
        viewItems
    }: ISubCategory ) => {
    
    return(
        <TableRow key={subCategory.id}>
            <TableCell>{subCategory.id ?? "No Data"}</TableCell>
            <TableCell>
                <img src={subCategory.image_url} alt="Icon" width={40} height={40} />
            </TableCell>
            <TableCell>{subCategory.name ?? "No Data"}</TableCell>
            <TableCell className="flex flex-row-reverse gap-5" align="right">
                {deleteFeature} {updateFeature} {viewItems}
            </TableCell>
        </TableRow>
    )
}