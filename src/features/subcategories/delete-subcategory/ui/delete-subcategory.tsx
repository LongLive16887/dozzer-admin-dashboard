import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { IDeleteSubCategory } from "../model";
import { useDeleteSubCategoryMutation } from "@/shared/api/subcategories";

export const DeleteSubCategory = ({ deleteSubCategoryId }: IDeleteSubCategory) => {
  const [deleteCategory, { isLoading }] = useDeleteSubCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Sub Category deleted successfully!", {
        description: `Sub Category (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      toast.error("Failed to delete Sub category.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Button
      className="cursor-pointer min-w-[40px]"
      onClick={() => handleDelete(deleteSubCategoryId)}
      variant="destructive"
      disabled={isLoading}
    >
      {isLoading ? "Deleting" : <Trash2/>}
    </Button>
  );
};
