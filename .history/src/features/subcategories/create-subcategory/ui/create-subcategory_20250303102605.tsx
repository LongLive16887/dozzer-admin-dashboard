import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateSubCategoryMutation } from "@/shared/api/subcategories";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
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

export const CreateSubCategory = () => {
  const { category_id } = useParams<{ catego: string }>(); // Получаем category_id из URL
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subCategory = {
      name,
      image_url: imageUrl,
      category_id, // Используем category_id из URL
    };

    try {
      const response = await createSubCategory(subCategory).unwrap();
      console.log("Created subcategory:", response);
      setShowModal(false);
      setName("");
      setImageUrl("");
    } catch (err) {
      console.error("Error creating subcategory:", err);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus /> SubCategory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[400px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New SubCategory</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new subcategory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                placeholder="SubCategory Name"
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-center">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                placeholder="https://example.com/image.png"
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            {/* Скрытое поле с category_id */}
            <input type="hidden" value={category_id} />
          </div>
          <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="default" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add SubCategory"}
            </Button>
            <Button className="cursor-pointer" variant="destructive" type="reset" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
