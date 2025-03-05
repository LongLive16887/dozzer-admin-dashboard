import { useState, useEffect } from "react";
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
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const initialPosition = { lat: 41.311081, lng: 69.240562 }; // Amir Temur Avenue, Tashkent

export const CreateBase = () => {
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<string>(initialPosition.lat.toString());
  const [lng, setLng] = useState<string>(initialPosition.lng.toString());
  const [latError, setLatError] = useState<string>("");
  const [lngError, setLngError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();
  const [position, setPosition] = useState(initialPosition);

  const validateLat = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -90 || num > 90) {
      setLatError("Latitude must be between -90 and 90");
    } else {
      setLatError("");
      setPosition((prev) => ({ ...prev, lat: num }));
    }
    setLat(value);
  };

  const validateLng = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -180 || num > 180) {
      setLngError("Longitude must be between -180 and 180");
    } else {
      setLngError("");
      setPosition((prev) => ({ ...prev, lng: num }));
    }
    setLng(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (latError || lngError) return;

    const base = {
      name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    try {
      const response = await createBase(base).unwrap();
      console.log("Created base:", response);
      setShowModal(false);
      setName("");
      setLat(initialPosition.lat.toString());
      setLng(initialPosition.lng.toString());
    } catch (err) {
      console.error("Error creating base:", err);
    }
  };

  const isFormInvalid = !name || !!latError || !!lngError;

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setLat(e.latlng.lat.toString());
        setLng(e.latlng.lng.toString());
      },
    });

    return <Marker position={position} />;
  };

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toString());
        setLng(pos.coords.longitude.toString());
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => console.error("Geolocation error:", err)
    );
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus /> Add Base
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[500px] overflow-scroll">
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
              <Label htmlFor="lng" className="text-center">
                Longitude
              </Label>
              <div className="col-span-3">
                <Input
                  id="lng"
                  type="number"
                  value={lng}
                  placeholder="Enter longitude"
                  onChange={(e) => validateLng(e.target.value)}
                  required
                />
                {lngError && <p className="text-red-500 text-sm">{lngError}</p>}
              </div>
            </div>
            <div className="w-full h-[200px]">
              <MapContainer center={position} zoom={13} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            <Button
              className="text-sm px-3 py-1 h-auto"
              variant="outline"
              type="button"
              onClick={handleUseMyLocation}
            >
              Use My Location
            </Button>
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
