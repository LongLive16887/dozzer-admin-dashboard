import { ICategory } from "../model";

export const Categories = ({
        category,
        deleteFeature,
        updateFeature
    }: ICategory ) => {

    const dataFromServer = category;
    
    return(
        <TableRow key={category.id}>
      <TableCell>{category.id ?? "No Data"}</TableCell>
      <TableCell>{prioritizedTranslation?.lang ?? "No Data"}</TableCell>
      <TableCell>
        <img src={category.icon_url} alt="Icon" width={40} height={40} />
      </TableCell>
      <TableCell>{prioritizedTranslation?.name ?? "No Data"}</TableCell>
      <TableCell className="flex flex-row-reverse gap-5" align="right">
        {deleteFeature} {updateFeature}
      </TableCell>
    </TableRow>
    )
}