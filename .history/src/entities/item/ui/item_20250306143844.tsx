import { IItem } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const Item = ({
        category,
        deleteFeature,
        updateFeature,
        viewFeature
    }: IItem ) => {
    
    return(
        <TableRow key={category.id}>
            <TableCell>{category.id ?? "No Data"}</TableCell>
            <TableCell>{category.created_by ?? "No Data"}</TableCell>
            <TableCell>{category.updated_by ?? "No Data"}</TableCell>
            <TableCell>
                <img src={category.image_url} alt="Icon" width={40} height={40} />
            </TableCell>
            <TableCell>{category.name ?? "No Data"}</TableCell>
            <TableCell className="flex flex-row-reverse gap-5" align="right">
                {deleteFeature} {updateFeature} {viewFeature}
            </TableCell>
        </TableRow>
    )
}