import { , useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateItemMutation } from "@/shared/api/items";
import { useGetBasesQuery } from "@/shared/api/bases";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { DateTime } from 'luxon';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export const CreateItem = () => {
  const { categoryId, subcategoryId } = useParams();
  
  const getDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16).replace("T", " ");
  };

  const [formData, setFormData] = useState({
    name_uz: "",
    name_ru: "",
    short_info_uz: "",
    short_info_ru: "",
    image: "",
    vizov_price: "",
    smenu_price: "",
    smenu_duration: "",
    hourly_price: "",
    description_uz: "",
    description_ru: "",
    base_id: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [createItem, { isLoading }] = useCreateItemMutation();
  const { data: basesData } = useGetBasesQuery();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["vizov_price", "smenu_price", "smenu_duration", "hourly_price"].includes(name)
        ? value === "" ? "" : Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      ...formData,
      category_id: categoryId!,
      sub_category_id: subcategoryId!,
      photos: [],
      vizov_price: formData.vizov_price === "" ? 0 : Number(formData.vizov_price),
      smenu_price: formData.smenu_price === "" ? 0 : Number(formData.smenu_price),
      smenu_duration: formData.smenu_duration === "" ? 0 : Number(formData.smenu_duration),
      hourly_price: formData.hourly_price === "" ? 0 : Number(formData.hourly_price),
      begin_date: getDateTime()
    };

    try {
      await createItem(itemData).unwrap();
      setShowModal(false);
      setFormData({
        ...formData,
        name_uz: "",
        name_ru: "",
        short_info_uz: "",
        short_info_ru: "",
        image: "",
        vizov_price: "",
        smenu_price: "",
        smenu_duration: "",
        hourly_price: "",
        description_uz: "",
        description_ru: "",
        base_id: "",
      });
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus /> Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] sm:max-h-[600px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Fill out the form to add a new item.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input name="name_uz" value={formData.name_uz} onChange={handleChange} placeholder="Name UZ" required />
            <Input name="name_ru" value={formData.name_ru} onChange={handleChange} placeholder="Name RU" required />
            <Input name="short_info_uz" value={formData.short_info_uz} onChange={handleChange} placeholder="Short Info UZ" required />
            <Input name="short_info_ru" value={formData.short_info_ru} onChange={handleChange} placeholder="Short Info RU" required />
            <Input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
            <Input name="vizov_price" value={formData.vizov_price} onChange={handleChange} placeholder="Vizov Price" type="number" required />
            <Input name="smenu_price" value={formData.smenu_price} onChange={handleChange} placeholder="Smenu Price" type="number" required />
            <Input name="smenu_duration" value={formData.smenu_duration} onChange={handleChange} placeholder="Smenu Duration" type="number" required />
            <Input name="hourly_price" value={formData.hourly_price} onChange={handleChange} placeholder="Hourly Price" type="number" required />
            
            <Input name="description_uz" value={formData.description_uz} onChange={handleChange} placeholder="Description UZ" required />
            <Input name="description_ru" value={formData.description_ru} onChange={handleChange} placeholder="Description RU" required />
            
            <Label>Category ID</Label>
            <Input value={categoryId} disabled />
            <Label>Subcategory ID</Label>
            <Input value={subcategoryId} disabled />
            
            <Label>Base</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, base_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a base" />
              </SelectTrigger>
              <SelectContent>
                {basesData?.data?.map((base) => (
                  <SelectItem key={base.id} value={base.id}>
                    {base.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Item"}
            </Button>
            <Button variant="destructive" type="reset" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
