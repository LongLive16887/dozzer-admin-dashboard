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
import { toast } from "sonner";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { data } from "react-router-dom";

const INITIAL_POSITION = { lat: 41.3111, lng: 69.2797 };

export const CreateBase = () => {
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<number>(INITIAL_POSITION.lat);
  const [long, setLong] = useState<number>(INITIAL_POSITION.lng);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const base = {
      name,
      lat: parseFloat(lat.toFixed(8)),
      long: parseFloat(long.toFixed(8)),
    };

    try {
      const response = await createBase(base).unwrap();
      toast.success(`Base successfully created! id: ${response?data.id}`);
      console.log("Created base:", response);
      setShowModal(false);
      setName("");
      setLat(INITIAL_POSITION.lat);
      setLong(INITIAL_POSITION.lng);
    } catch (err) {
      toast.error("Failed to create base. Please try again.");
      console.error("Error creating base:", err);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLong(e.latlng.lng);
      },
    });
    return null;
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        toast.success("Location set to your current position!");
      },
      () => {
        toast.error("Unable to retrieve your location");
      }
    );
  };

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus /> Base
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New Base</DialogTitle>
          <DialogDescription>Fill out the form to add a new base.</DialogDescription>
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
                <Input id="lat" type="text" value={lat} disabled />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="long" className="text-center">
                Longitude
              </Label>
              <div className="col-span-3">
                <Input id="long" type="text" value={long} disabled />
              </div>
            </div>
          </div>

          <div className="h-64 rounded-md overflow-hidden">
            <MapContainer center={[lat, long]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, long]} icon={customIcon} />
              <MapClickHandler />
            </MapContainer>
          </div>

          <Button onClick={useMyLocation} type="button" size="sm" className="mt-2 mx-auto block cursor-pointer">
            Use My Location
          </Button>

          <DialogFooter className="mt-4">
            <Button type="submit" className="cursor-pointer" disabled={isLoading || !name}>
              {isLoading ? "Adding..." : "Add Base"}
            </Button>
            <Button variant="destructive" className="cursor-pointer" type="reset" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};