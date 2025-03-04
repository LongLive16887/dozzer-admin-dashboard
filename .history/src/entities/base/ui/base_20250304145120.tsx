import { IBase } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const Base = ({
        base,
        updateFeature,
    }: IBase ) => {
    
    return(
        <TableRow key={base.id}>
            <TableCell>{category.id ?? "No Data"}</TableCell>
            <TableCell>{category.lat ?? "No Data"}</TableCell>
            <TableCell>{category.long ?? "No Data"}</TableCell>
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