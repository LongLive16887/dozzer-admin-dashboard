import { useState } from "react";
import { useUpdateSubCategoryMutation } from "@/shared/api/subcategories";
import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { toast } from "sonner";
import { IUpdateSubCategory } from "../model";


interface UpdateSubcategoryProps {
  updateSubCategoryData: IUpdateSubCategory;
}

export const UpdateSubcategory = ({ updateSubCategoryData }: UpdateSubcategoryProps) => {
  const [updateSubCategory, { isLoading: isUpdating }] = useUpdateSubCategoryMutation();
  const [name_ru, setRuName] = useState(updateSubCategoryData.name_ru);
  const [name_uz, setUzName] = useState(updateSubCategoryData.name_uz);
  const [imageUrl, setImageUrl] = useState(updateSubCategoryData.image_url || "");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedSubcategory = {
      id: updateSubCategoryData.id,
      name_ru,
      name_uz,
      image_url: imageUrl,
      category_id: updateSubCategoryData.category_id,
    };

    try {
      await updateSubCategory({ id: updateSubCategoryData.id, subCategory: updatedSubcategory }).unwrap();
      toast.success("Subcategory updated successfully!", {
        description: `Subcategory (ID: ${updateSubCategoryData.id}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update subcategory", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[40px]" variant="default">
          <Pencil/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Update Subcategory</DialogTitle>
          <DialogDescription>
            Complete the form to update the subcategory
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-center">
                Subcategory ID
              </Label>
              <Input id="id" value={updateSubCategoryData.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name_uz" className="text-center">
                Name UZ
              </Label>
              <Input
                id="name_uz"
                value={name_uz}
                onChange={(e) => setUzName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name_ru" className="text-center">
                Name RU
              </Label>
              <Input
                id="name_ru"
                value={name_ru}
                onChange={(e) => setRuName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-center">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="default" type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
            <Button
              className="cursor-pointer"
              variant="destructive"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
