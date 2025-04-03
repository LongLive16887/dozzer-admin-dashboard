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


export const CreateSubСategory = () => {
  const [name_uz, setUzName] = useState("");
  const [name_ru, setRuName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();
  const { categoryId } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subcategory = {
      name_ru,
      name_uz,
      image_url: imageUrl,
      category_id: categoryId!
    };

    try {
      const response = await createSubCategory(subcategory).unwrap();
      console.log("Created subcategory:", response);
      setShowModal(false);
      setRuName("");
      setUzName("");
      setImageUrl("");
    } catch (err) {
      console.error("Error creating subcategory:", err);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus/>Subcategory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[400px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New Subcategory</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new subcategory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name_uz" className="text-center">
                Name UZ
              </Label>
              <Input
                id="name_uz"
                value={name_uz}
                placeholder="Subcategory Name"
                onChange={(e) => setUzName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name_ru" className="text-center">
                Name RU
              </Label>
              <Input
                id="name_ru"
                value={name_ru}
                placeholder="Subcategory Name"
                onChange={(e) => setRuName(e.target.value)}
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
          </div>
          <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="default" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Subcategory"}
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
