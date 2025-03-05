import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";

export const Location = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state);
        setIsBlocked(result.state === "denied");
        result.onchange = () => {
          setPermissionStatus(result.state);
          setIsBlocked(result.state === "denied");
        };
      });
    }
  }, []);

  const getLocation = () => {
    if (isBlocked) {
      setError("Доступ к геопозиции заблокирован. Разрешите его в настройках браузера.");
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
        if (err.code === err.PERMISSION_DENIED) {
          setIsBlocked(true);
          setPermissionStatus("denied");
        }
      }
    );
  };

  return (
    <div>
      <Button onClick={getLocation}>Получить геопозицию</Button>

      {location && <p>Широта: {location.latitude}, Долгота: {location.longitude}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isBlocked && (
        <p style={{ color: "red" }}>
          Доступ к геолокации заблокирован. Разрешите его в настройках браузера.
        </p>
      )}
    </div>
  );
};
