import { ISubCategory } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const SubCategory = ({
    subCategory,
    deleteFeature,
    updateFeature,
    viewItems
}: ISubCategory) => {

    const selectedLanguage = useSelector(
        (state: RootState) => state.language.selectedLanguage
    );

    return (
        <TableRow key={subCategory.id}>
            <TableCell>{subCategory.id ?? "No Data"}</TableCell>
            <TableCell>
                <img src={subCategory.image_url} alt="Icon" width={40} height={40} />
            </TableCell>
            <TableCell>{selectedLanguage === "uz" ? subCategory.name_uz : subCategory.name_ru ?? "No Data"}</TableCell>
            <TableCell className="flex flex-row-reverse gap-5" align="right">
                {deleteFeature} {updateFeature} {viewItems}
            </TableCell>
        </TableRow>
    )
}