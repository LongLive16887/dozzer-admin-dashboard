import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";

export const Location = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается вашим браузером");
      setLoading(false);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(`Ошибка: ${err.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // Использует GPS для более точных данных
        timeout: 10000, // Ждём максимум 10 секунд
        maximumAge: 0, // Не используем кешированные данные
      }
    );
  };

  return (
    <div>
      <Button onClick={getLocation}>Обновить геопозицию</Button>

      {loading && <p>Определение местоположения...</p>}

      {location && !loading && (
        <p>
          Широта: {location.latitude}, Долгота: {location.longitude}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
