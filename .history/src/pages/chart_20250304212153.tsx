import { useState } from "react";

const GeolocationComponent = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      <button onClick={getLocation}>Получить геопозицию</button>
      {location && (
        <p>
          Широта: {location.latitude}, Долгота: {location.longitude}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GeolocationComponent;
