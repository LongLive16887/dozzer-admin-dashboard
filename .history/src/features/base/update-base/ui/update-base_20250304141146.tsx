import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useGetBaseQuery, useUpdateBaseMutation } from "@/shared/api/base-api";

export const UpdateBase = ({ baseId }: { baseId: string }) => {
  const { data: baseData, isLoading: isFetching } = useGetBaseQuery(baseId);
  const [updateBase, { isLoading: isUpdating }] = useUpdateBaseMutation();

  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (baseData?.data) {
      setName(baseData.data.name);
      setLat(baseData.data.lat.toString());
      setLong(baseData.data.long.toString());
    }
  }, [baseData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBase = {
      name,
      lat: parseFloat(lat),
      long: parseFloat(long),
    };

    try {
      await updateBase({ id: baseId, data: updatedBase }).unwrap();
      toast.success("Base updated successfully!", {
        description: `Base (ID: ${baseId}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update Base", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[85px]" variant="default" disabled={isFetching}>
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[550px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Update Base</DialogTitle>
          <DialogDescription>
            Complete the form to update an existing base
          </DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-center">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
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
                  type="number"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
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
                  onChange={(e) => setLong(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button className="cursor-pointer" variant="default" type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Base"}
              </Button>
              <Button className="cursor-pointer" variant="destructive" type="reset" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
