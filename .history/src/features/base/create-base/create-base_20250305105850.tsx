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

// Координаты для Ташкента (проспект Амира Темура)
const INITIAL_POSITION = { lat: 41.3111, lng: 69.2797 };

export const CreateBase = () => {
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<number>(INITIAL_POSITION.lat);
  const [long, setLong] = useState<number>(INITIAL_POSITION.lng);
  const [latError, setLatError] = useState<string>("");
  const [longError, setLongError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();

  // Функция валидации широты
  const validateLat = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -90 || num > 90) {
      setLatError("Latitude must be between -90 and 90");
    } else {
      setLatError("");
      setLat(num);
    }
  };

  // Функция валидации долготы
  const validateLong = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < -180 || num > 180) {
      setLongError("Longitude must be between -180 and 180");
    } else {
      setLongError("");
      setLong(num);
    }
  };

  // Обработчик формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (latError || longError) return;

    const base = {
      name,
      lat: parseFloat(lat.toFixed(8)),
      long: parseFloat(long.toFixed(8)),
    };

    console.log(base);

    try {
      const response = await createBase(base).unwrap();
      console.log("Created base:", response);
      setShowModal(false);
      setName("");
      setLat(INITIAL_POSITION.lat);
      setLong(INITIAL_POSITION.lng);
    } catch (err) {
      console.error("Error creating base:", err);
    }
  };

  // Компонент для отслеживания кликов на карте
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLong(e.latlng.lng);
      },
    });
    return null;
  };

  // Использование текущей геолокации
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  // Фикс иконки маркера (Leaflet не подхватывает автоматически)
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
      <DialogContent className="sm:max-w-[525px] sm:max-h-[600px] overflow-scroll">
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

          {/* Карта */}
          <div className="h-64 rounded-md overflow-hidden">
            <MapContainer center={[lat, long]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, long]} icon={customIcon} />
              <MapClickHandler />
            </MapContainer>
          </div>

          <Button onClick={useMyLocation} type="button" className="mt-2 w-full">
            Использовать мою геолокацию
          </Button>

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading || !name}>
              {isLoading ? "Adding..." : "Add Base"}
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
