import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/shared/ui/dialog";

export const Location = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // Флаг блокировки запроса

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
    setShowModal(false); // Закрываем модал перед запросом

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
      <Button onClick={() => setShowModal(true)}>Получить геопозицию</Button>

      {location && <p>Широта: {location.latitude}, Долгота: {location.longitude}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isBlocked && (
        <p style={{ color: "red" }}>
          Доступ к геолокации заблокирован. Разрешите его в настройках браузера.
        </p>
      )}

      {/* Кастомный диалог перед запросом */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>⚠️ Доступ к геопозиции</DialogHeader>
          {isBlocked ? (
            <p>Вы заблокировали доступ. Разрешите его в настройках браузера.</p>
          ) : (
            <p>Мы используем вашу геолокацию, чтобы улучшить сервис. Разрешите доступ?</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Отмена</Button>
            {!isBlocked && <Button onClick={getLocation}>Разрешить</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
