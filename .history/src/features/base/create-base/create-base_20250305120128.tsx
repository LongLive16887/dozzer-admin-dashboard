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

const INITIAL_POSITION = { lat: 41.3111, lng: 69.2797 };

export const CreateBase = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState(INITIAL_POSITION.lat);
  const [long, setLong] = useState(INITIAL_POSITION.lng);
  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();

  const validateLat = (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -90 || num > 90) {
      setLatError("Latitude must be between -90 and 90");
    } else {
      setLatError("");
      setLat(num);
    }
  };

  const validateLong = (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -180 || num > 180) {
      setLongError("Longitude must be between -180 and 180");
    } else {
      setLongError("");
      setLong(num);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (latError || longError) return;

    const base = {
      name,
      lat: parseFloat(lat.toFixed(8)),
      long: parseFloat(long.toFixed(8)),
    };

    toast.loading("Adding base...");

    try {
      await createBase(base).unwrap();
      toast.success("Base added successfully!");
      setShowModal(false);
      setName("");
      setLat(INITIAL_POSITION.lat);
      setLong(INITIAL_POSITION.lng);
    } catch (err) {
      toast.error("Error creating base");
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
        toast.success("Location updated!");
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
        <Button onClick={() => setShowModal(true)}>
          <Plus /> Base
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Base</DialogTitle>
          <DialogDescription>Fill out the form to add a new base.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
          <Label>Latitude</Label>
          <Input value={lat} onChange={(e) => validateLat(e.target.value)} required />
          {latError && <p className="text-red-500">{latError}</p>}
          <Label>Longitude</Label>
          <Input value={long} onChange={(e) => validateLong(e.target.value)} required />
          {longError && <p className="text-red-500">{longError}</p>}
          <div className="h-64">
            <MapContainer center={[lat, long]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, long]} icon={customIcon} />
              <MapClickHandler />
            </MapContainer>
          </div>
          <Button onClick={useMyLocation} type="button">Use My Location</Button>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !name}>{isLoading ? "Adding..." : "Add Base"}</Button>
            <Button variant="destructive" type="reset" onClick={() => setShowModal(false)}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
