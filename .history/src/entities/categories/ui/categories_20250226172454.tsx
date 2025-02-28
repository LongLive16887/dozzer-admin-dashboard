import { ICategory } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const Categories = ({
        category,
        deleteFeature,
        updateFeature
    }: ICategory ) => {

    const dataFromServer = category.data;
    const results = dataFromServer.
    
    return(
    <TableRow key={category.id}>
      <TableCell>{category.id ?? "No Data"}</TableCell>
      <TableCell>
        <img src={category.image_url} alt="Icon" width={40} height={40} />
      </TableCell>
      <TableCell>{category.data.name ?? "No Data"}</TableCell>
      <TableCell className="flex flex-row-reverse gap-5" align="right">
        {deleteFeature} {updateFeature}
      </TableCell>
    </TableRow>
    )
}