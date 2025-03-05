import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";

export const Location = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => setPermissionStatus(result.state);
      });
    }
  }, []);

  const getLocation = () => {
    if (permissionStatus === "denied") {
      setError("Вы заблокировали доступ. Разрешите его в настройках браузера.");
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
          setPermissionStatus("denied");
        }
      }
    );
  };

  return (
    <div>
      <Button onClick={getLocation} disabled={permissionStatus === "denied"}>
        {permissionStatus === "granted" ? "Обновить геопозицию" : "Получить геопозицию"}
      </Button>

      {location && (
        <p>
          Широта: {location.latitude}, Долгота: {location.longitude}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {permissionStatus === "denied" && (
        <p style={{ color: "red" }}>
          Доступ к геолокации заблокирован. Включите его в настройках браузера.
        </p>
      )}
    </div>
  );
};
