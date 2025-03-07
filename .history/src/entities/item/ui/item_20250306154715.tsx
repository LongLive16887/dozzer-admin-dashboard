import { IItem } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";
import { useSelector } from "react-redux";


export const Item = ({
        item,
        viewFeature
    }: IItem ) => {

    const selectedLanguage = useSelector(
        (state: RootState) => state.language.selectedLanguage
        );

    const translations = {
        short_info: selectedLanguage === "ru" ? "short_info_ru" : "short_info_uz"

    }
    
    return(
        <TableRow key={item.id}>
                <TableCell>{item.id ?? "No Data"}</TableCell>
                <TableCell>{selectedLanguage === "uz" ? item.name_uz ?? "No Data"}</TableCell>
                <TableCell>{item.name_ru ?? "No Data"}</TableCell>
                <TableCell>
                    <img src={item.image} alt="Icon" width={40} height={40} />
                </TableCell>
                <TableCell>{item.smenu_price ?? "No Data"}</TableCell>
                <TableCell className="flex flex-row-reverse gap-5" align="right">
                    {viewFeature}
                </TableCell>
        </TableRow>
    )
}