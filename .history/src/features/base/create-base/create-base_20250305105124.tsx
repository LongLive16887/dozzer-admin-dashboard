import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 
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

// Иконка маркера (по умолчанию Leaflet её не подгружает)
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Начальные координаты (проспект Амира Темура, Ташкент)
const INITIAL_POSITION = { lat: 41.3111, lng: 69.2797 };

export const CreateBase = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createBase, { isLoading }] = useCreateBaseMutation();

  // Компонент для изменения позиции маркера
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return <Marker position={position} icon={customIcon} />;
  }

  // Функция для использования геолокации пользователя
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Не удалось получить вашу геопозицию");
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const base = {
      name,
      lat: parseFloat(position.lat.toFixed(8)),
      long: parseFloat(position.lng.toFixed(8)),
    };

    try {
      await createBase(base).unwrap();
      setShowModal(false);
      setName("");
      setPosition(INITIAL_POSITION);
    } catch (err) {
      console.error("Ошибка при создании склада:", err);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <Plus /> Base
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] sm:max-h-[500px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Добавить склад</DialogTitle>
          <DialogDescription>Заполните форму, чтобы добавить новый склад.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Название
              </Label>
              <Input
                id="name"
                value={name}
                placeholder="Название склада"
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lat" className="text-center">
                Широта
              </Label>
              <Input
                id="lat"
                type="number"
                value={position.lat}
                readOnly
                className="col-span-3 bg-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="long" className="text-center">
                Долгота
              </Label>
              <Input
                id="long"
                type="number"
                value={position.lng}
                readOnly
                className="col-span-3 bg-gray-100"
              />
            </div>
          </div>

          {/* Карта */}
          <div className="w-full h-[250px] rounded-md overflow-hidden">
            <MapContainer center={INITIAL_POSITION} zoom={13} style={{ width: "100%", height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>

          {/* Кнопка геолокации */}
          <Button className="mt-2 w-full" onClick={useMyLocation} type="button">
            Использовать мою геолокацию
          </Button>

          <DialogFooter className="mt-4">
            <Button className="cursor-pointer" variant="default" type="submit" disabled={isLoading || !name}>
              {isLoading ? "Добавление..." : "Добавить склад"}
            </Button>
            <Button className="cursor-pointer" variant="destructive" type="reset" onClick={() => setShowModal(false)}>
              Отмена
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
