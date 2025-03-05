import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";

export const Component = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get
  },[])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается вашим браузером");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(`Ошибка: ${err.message}`);
      }
    );
  };

  return (
    <div>
      <Button onClick={getLocation} variant={"default"} className="cursor-pointer">Получить геопозицию</Button>
      {location && (
        <p>
          Широта: {location.latitude}, Долгота: {location.longitude}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
