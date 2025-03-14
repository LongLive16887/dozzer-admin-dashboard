import { useEffect, useState } from "react";
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
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useGetBaseByIdQuery, useUpdateBaseMutation } from "@/shared/api/bases";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { UseMyLocationButton } from "../../shared/useMyLocation-button";
import L from "leaflet";

export const UpdateBase = ({ updateBaseId }: { updateBaseId: string }) => {
  const { data: baseData, isLoading: isFetching } = useGetBaseByIdQuery(updateBaseId);
  const [updateBase, { isLoading: isUpdating }] = useUpdateBaseMutation();

  const [name, setName] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (baseData?.data) {
      setName(baseData.data.name);
      setLat(baseData.data.lat);
      setLong(baseData.data.long);
    }
  }, [baseData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lat === null || long === null) return;

    const updatedBase = {
      name,
      lat,
      long,
    };

    try {
      await updateBase({ id: updateBaseId, base: updatedBase }).unwrap();
      toast.success("Base updated successfully!", {
        description: `Base (ID: ${updateBaseId}) has been updated`,
      });
      setShowModal(false);
    } catch (error: unknown) {
      toast.error("Failed to update Base", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const MapClickHandler = () => {
    const map = useMap();
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLong(e.latlng.lng);
        map.setView(e.latlng, map.getZoom()); 
      },
    });
    return null;
  };
  

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer min-w-[40px]" variant="default" disabled={isFetching}>
          <RefreshCcw/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[650px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Update Base</DialogTitle>
          <DialogDescription>
            Complete the form to update an existing base
          </DialogDescription>
        </DialogHeader>
        {isFetching || lat === null || long === null ? (
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
                  value={lat ?? ""}
                  disabled
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="long" className="text-center">
                  Longitude
                </Label>
                <Input
                  id="long"
                  type="number"
                  value={long ?? ""}
                  disabled
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="h-64 rounded-md overflow-hidden">
              <MapContainer id="map" center={[lat, long]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, long]} icon={customIcon} />
                <MapClickHandler />
                <UseMyLocationButton setLat={setLat} setLong={setLong} />
              </MapContainer>
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
