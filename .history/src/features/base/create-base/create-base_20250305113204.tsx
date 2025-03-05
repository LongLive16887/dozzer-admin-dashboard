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
import "leaflet-control-geocoder";

const INITIAL_POSITION = { lat: 41.3111, lng: 69.2797 };

export const CreateBase = () => {
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<number>(INITIAL_POSITION.lat);
  const [long, setLong] = useState<number>(INITIAL_POSITION.lng);
  const [address, setAddress] = useState<string>("");
  const [createBase, { isLoading }] = useCreateBaseMutation();

  useEffect(() => {
    const map = L.map("map").setView([lat, long], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    }).on("markgeocode", function (e) {
      const { center, name } = e.geocode;
      setLat(center.lat);
      setLong(center.lng);
      setAddress(name);
    });

    map.addControl(geocoder);
    return () => map.remove();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const base = { name, lat, long };
    console.log(base);

    try {
      const response = await createBase(base).unwrap();
      console.log("Created base:", response);
    } catch (err) {
      console.error("Error creating base:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
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
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <Label htmlFor="address">Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />

            <Label htmlFor="lat">Latitude</Label>
            <Input id="lat" type="number" value={lat} readOnly />

            <Label htmlFor="long">Longitude</Label>
            <Input id="long" type="number" value={long} readOnly />
          </div>

          <div id="map" className="h-64 rounded-md overflow-hidden" />

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add Base"}</Button>
            <Button variant="destructive" type="reset">Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
