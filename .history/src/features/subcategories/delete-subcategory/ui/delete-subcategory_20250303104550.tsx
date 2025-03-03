import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteCategoryMutation } from "@/shared/api/categories";
import { IDeleteSubCategory } from "../model";

export const DeleteCategory = ({ deleteSubCategoryId }: IDeleteSubCategory) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!", {
        description: `Category (ID: ${id}) has been removed.`,
      });
    } catch (error: unknown) {
      toast.error("Failed to delete category.", {
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
