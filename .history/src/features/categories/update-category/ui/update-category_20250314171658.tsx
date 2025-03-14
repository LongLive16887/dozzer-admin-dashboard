import { useState, useActionState } from "react";
import { useUpdateCategoryMutation } from "@/shared/api/categories";
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
import { IUpdateCategory } from "../model";

interface UpdateCategoryProps {
  updateCategoryData: IUpdateCategory;
}

export const UpdateCategory = ({ updateCategoryData }: UpdateCategoryProps) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const [showModal, setShowModal] = useState(false);

  const [state, formAction] = useActionState(async (prevState, formData) => {
    const name = formData.get("name") as string;
    const imageUrl = formData.get("imageUrl") as string;
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
      return { success: true };
    } catch (error: unknown) {
      toast.error("Failed to update category", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      return { success: false, error };
    }
  }, {});

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[40px]" variant="default">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>
            Complete the form to update the category
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-center">
                Category ID
              </Label>
              <Input id="id" value={updateCategoryData.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={updateCategoryData.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-center">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={updateCategoryData.image_url || ""}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="default" type="submit" disabled={state?.success === false}>
              {state?.success === false ? "Updating..." : "Update"}
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
