import { useState } from "react";
import { IItem } from "../model";
import { TableCell, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Item = ({ item }: { item: IItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TableRow key={item.id}>
                <TableCell>{item.id ?? "No Data"}</TableCell>
                <TableCell>{item.name_uz ?? "No Data"}</TableCell>
                <TableCell>{item.name_ru ?? "No Data"}</TableCell>
                <TableCell>
                    <img src={item.image} alt="Icon" width={40} height={40} />
                </TableCell>
                <TableCell>{item.smenu_price ?? "No Data"}</TableCell>
                <TableCell className="flex flex-row-reverse gap-5" align="right">
                    <Button onClick={() => setIsOpen(true)}>Фото</Button>
                </TableCell>
            </TableRow>

            {/* Галерея в модалке */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Фотографии товара</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        {item.photos.length > 0 ? (
                            item.photos.map((photo) => (
                                <img
                                    key={photo.file_id}
                                    src={photo.file_path}
                                    alt={photo.name}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            ))
                        ) : (
                            <p className="text-center col-span-2">Нет фотографий</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
