import { useDispatch } from "react-redux";
import { setSuperKey } from "@/shared/hooks/superAdminSlice";
import { useState } from "react";
import { toast } from "sonner";
import { Input} from "@/shared/ui/input"; 
import { Card} from "@/shared/ui/card"; 
import { Button} from "@/shared/ui/button"; 

export const SuperAdminLogin = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      dispatch(setSuperKey(key.trim()));
      toast.success("Super admin key added!");
    } else {
      toast.error("Please enter a valid key.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Super Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Введите X-SuperAdmin-Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            variant="secondary"
            className="w-full py-2 mt-4"
          >
            Войти как Супер Админ
          </Button>
        </form>
      </Card>
    </div>
  );
};
