import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";

export const Location = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

  useEffect(() => {
    setError(null);

    // Проверяем статус разрешений при загрузке компонента
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => setPermissionStatus(result.state);
      });
    }
  }, []);

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

        // Если юзер отклонил доступ, меняем статус
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionStatus("denied");
        }
      }
    );
  };

  return (
    <div>
      <Button onClick={getLocation} variant={"default"} className="cursor-pointer">
        Получить геопозицию
      </Button>

      {location && (
        <p>
          Широта: {location.latitude}, Долгота: {location.longitude}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Если юзер отклонил, даем ему возможность повторить */}
      {permissionStatus === "prompt" && (
        <Button onClick={getLocation} variant={"outline"} className="cursor-pointer mt-2">
          Попробовать снова
        </Button>
      )}

      {/* Если юзер заблокировал, сообщаем ему */}
      {permissionStatus === "denied" && (
        <p style={{ color: "red" }}>
          Вы заблокировали доступ к геолокации. Разрешите его в настройках браузера.
        </p>
      )}
    </div>
  );
};
