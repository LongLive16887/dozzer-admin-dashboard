import { useState } from "react";
import { useCreateBaseMutation } from "@/shared/api/bases";
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

export const CreateBase = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const base = {
      name,
      lat: parseFloat(lat),
      long: parseFloat(long),
    };

    try {
      const response = await createBase(base).unwrap();
      console.log("Created base:", response);
      setShowModal(false);
      setName("");
      setLat("");
      setLong("");
    } catch (err) {
      console.error("Error creating base:", err);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus /> Base
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[400px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New Base</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new base.
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
                placeholder="Base Name"
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lat" className="text-center">
                Latitude
              </Label>
              <Input
  id="lat"
  type="text"
  value={lat}
  placeholder="Enter latitude"
  onChange={(e) => setLat(e.target.value)}
  pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$"
  onInvalid={(e) => e.currentTarget.setCustomValidity("Enter a valid latitude (-90 to 90)")}
  onInput={(e) => e.currentTarget.setCustomValidity("")}
  className="col-span-3"
  required
/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="long" className="text-center">
                Longitude
              </Label>
              <Input
                id="long"
                type="number"
                value={long}
                placeholder="Enter longitude"
                onChange={(e) => setLong(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="default" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Base"}
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
