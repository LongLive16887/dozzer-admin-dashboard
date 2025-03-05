import { useMap } from "react-leaflet";

const UseMyLocationButton = ({ setLat, setLong }: { setLat: (lat: number) => void, setLong: (long: number) => void }) => {
  const map = useMap();

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
    <Button onClick={useMyLocation} type="button" size="sm" className="mt-2 mx-auto block cursor-pointer">
      Use My Location
    </Button>
  );
};
