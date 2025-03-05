import { useMap } from "react-leaflet";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";

export const UseMyLocationButton = ({ setLat, setLong }: { setLat: (lat: number) => void, setLong: (long: number) => void }) => {
    const map = useMap(); // Используем useMap() ТОЛЬКО внутри MapContainer
  
    const useMyLocation = () => {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLong = position.coords.longitude;
          setLat(newLat);
          setLong(newLong);
          map.setView([newLat, newLong], map.getZoom()); // Перемещение карты
          toast.success("Location set to your current position!");
        },
        () => {
          toast.error("Unable to retrieve your location");
        }
      );
    };
  
    return (
      <Button
        onClick={useMyLocation}
        type="button"
        size="sm"
        className="absolute top-2 right-2 z-[1000] bg-white shadow-md text-black hover:bg-gray-200 cursor-pointer"
      >
        Use My Location
      </Button>
    );
  };
  