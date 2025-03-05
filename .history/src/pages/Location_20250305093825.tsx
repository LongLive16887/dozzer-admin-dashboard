import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/shared/ui/dialog";

export const Location = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => setPermissionStatus(result.state);
      });
    }
  }, []);

  const requestLocation = () => {
    setShowModal(false); // Закрываем модал перед запросом

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

  const handleLocationRequest = () => {
    if (permissionStatus === "granted") {
      requestLocation(); // Если доступ уже есть — сразу получаем координаты
    } else {
      setShowModal(true); // Иначе показываем модалку
    }
  };

  return (
    <div>
      <Button onClick={handleLocationRequest} disabled={permissionStatus === "denied"}>
        {permissionStatus === "granted" ? "Обновить геопозицию" : "Получить геопозицию"}
      </Button>

      {location && (
        <p>
          📍 Широта: {location.latitude}, Долгота: {location.longitude}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {permissionStatus === "denied" && (
        <p style={{ color: "red" }}>
          ❌ Доступ к геолокации заблокирован. Разрешите его в настройках браузера.
        </p>
      )}

      {/* Кастомная модалка перед запросом */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>⚠️ Доступ к геопозиции</DialogHeader>
          <p>Мы используем вашу геолокацию для улучшения сервиса. Разрешить доступ?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Отмена
            </Button>
            <Button onClick={requestLocation}>Разрешить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
