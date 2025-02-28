import { useState } from "react";
import { useUpdateCategoryMutation } from "@/shared/api/categories";
import { Button } from "@/shared/ui/button";
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
import { IUpdateCategory } from "../model";

interface UpdateCategoryProps {
  updateCategoryData: IUpdateCategory;
}

export const UpdateCategory = ({ updateCategoryData }: UpdateCategoryProps) => {
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [name, setName] = useState(updateCategoryData.name);
  const [imageUrl, setImageUrl] = useState(updateCategoryData.image_url || "");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedCategory = {
      id: updateCategoryData.id,
      name,
      image_url: imageUrl,
      created_by: updateCategoryData.created_by,
      updated_by: updateCategoryData.updated_by,
    };

    try {
      await updateCategory({ id: updateCategoryData.id, category: updatedCategory }).unwrap();
      toast.success("Category updated successfully!", {
        description: `Category (ID: ${updateCategoryData.id}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update category", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[85px]" variant="default">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>
            Complete the form to update the category
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-center">
                ID
              </Label>
              <Input id="id" value={updateCategoryData.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
