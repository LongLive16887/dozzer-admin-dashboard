import { IItem } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const Item = ({
        item,
        viewPhotoFeature
    }: IItem ) => {
    
    return(
        <TableRow key={item.id}>
                <TableCell>{item.id ?? "No Data"}</TableCell>
                <TableCell>{item.name_uz ?? "No Data"}</TableCell>
                <TableCell>{item.name_ru ?? "No Data"}</TableCell>
                <TableCell>
                    <img src={item.image} alt="Icon" width={40} height={40} />
                </TableCell>
                <TableCell>{item.smenu_price ?? "No Data"}</TableCell>
                <TableCell className="flex flex-row-reverse gap-5" align="right">
                    {viewPhotoFeature img}
                </TableCell>
        </TableRow>
    )
}