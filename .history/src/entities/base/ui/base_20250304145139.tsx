import { IBase } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const Base = ({
        base,
        updateFeature,
    }: IBase ) => {
    
    return(
        <TableRow key={base.id}>
            <TableCell>{base.id ?? "No Data"}</TableCell>
            <TableCell>{base.lat ?? "No Data"}</TableCell>
            <TableCell>{base.long ?? "No Data"}</TableCell>
            <TableCell>{base.name ?? "No Data"}</TableCell>
            <TableCell className="flex flex-row-reverse gap-5" align="right">
                {deleteFeature} {updateFeature}
            </TableCell>
        </TableRow>
    )
}