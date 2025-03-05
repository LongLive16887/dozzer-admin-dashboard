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
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [long, setLong] = useState<string>("");
  const [latError, setLatError] = useState<string>("");
  const [longError, setLongError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();

  const validateLat = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -90 || num > 90) {
      setLatError("Latitude must be between -90 and 90");
    } else {
      setLatError("");
    }
    setLat(value);
  };

  const validateLong = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -180 || num > 180) {
      setLongError("Longitude must be between -180 and 180");
    } else {
      setLongError("");
    }
    setLong(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (latError || longError) return;

    const base = {
      name,
      lat: parseFloat(parseFloat(lat).toFixed(8)),
      long: parseFloat(parseFloat(long).toFixed(8)),
    };

    console.log(base);

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

  const isFormInvalid = !name || !!latError || !!longError;

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
              <div className="col-span-3">
                <Input
                  id="lat"
                  type="number"
                  value={lat}
                  placeholder="Enter latitude"
                  onChange={(e) => validateLat(e.target.value)}
                  required
                />
                {latError && <p className="text-red-500 text-sm">{latError}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="long" className="text-center">
                Longitude
              </Label>
              <div className="col-span-3">
                <Input
                  id="long"
                  type="number"
                  value={long}
                  placeholder="Enter longitude"
                  onChange={(e) => validateLong(e.target.value)}
                  required
                />
                {longError && <p className="text-red-500 text-sm">{longError}</p>}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="cursor-pointer"
              variant="default"
              type="submit"
              disabled={isLoading || isFormInvalid}
            >
              {isLoading ? "Adding..." : "Add Base"}
            </Button>
            <Button
              className="cursor-pointer"
              variant="destructive"
              type="reset"
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
