import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { ICategory } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";

export const Category = ({
    category,
    deleteFeature,
    updateFeature,
    viewFeature
}: ICategory) => {

    const selectedLanguage = useSelector(
        (state: RootState) => state.language.selectedLanguage
    );

    return (
        <TableRow key={category.id}>
            <TableCell>{category.id ?? "No Data"}</TableCell>
            <TableCell>{category.created_by ?? "No Data"}</TableCell>
            <TableCell>{category.updated_by ?? "No Data"}</TableCell>
            <TableCell>
                <img src={category.image_url} alt="Icon" width={40} height={40} />
            </TableCell>
            <TableCell>{selectedLanguage === "uz" ? category.name_uz : category.name_ru ?? "No Data"}</TableCell>
            <TableCell className="flex flex-row-reverse gap-5" align="right">
                {deleteFeature} {updateFeature} {viewFeature}
            </TableCell>
        </TableRow>
    )
}