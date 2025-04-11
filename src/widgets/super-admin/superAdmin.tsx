import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/store"; // typed hooks
import { setSuperKey } from "@/shared/hooks/superAdminSlice";
import { useCreateAdminMutation } from "@/shared/api/superAdmin";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { toast } from "sonner";

export const SuperAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const superKey = useAppSelector((state) => state.superAdmin.superKey);

  const [keyInput, setKeyInput] = useState("");
  const [adminData, setAdminData] = useState({
    login: "",
    password: "",
    role: "admin",
  });

  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput) return toast.error("Enter the key");
    dispatch(setSuperKey(keyInput));
    toast.success("Key saved");
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdmin(adminData).unwrap();
      toast.success("Admin created successfully");
      setAdminData({ login: "", password: "", role: "admin" }); // Reset with default role
    } catch (error) {
      toast.error("Error creating admin");
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-xl max-w-xl space-y-6 border">
      <h2 className="text-xl font-bold">Super Admin Panel</h2>

      {!superKey ? (
        <form onSubmit={handleKeySubmit} className="space-y-4">
          <div>
            <Label>Enter Super Admin Key</Label>
            <Input
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Super Admin Key"
            />
          </div>
          <Button type="submit">Save Key</Button>
        </form>
      ) : (
        <form onSubmit={handleAdminSubmit} className="space-y-4">
          <div>
            <Label>Login</Label>
            <Input
              value={adminData.login}
              onChange={(e) =>
                setAdminData((prev) => ({ ...prev, login: e.target.value }))
              }
              placeholder="Login"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={adminData.password}
              onChange={(e) =>
                setAdminData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Password"
            />
          </div>
          <div>
            <Label>Role</Label>
            <Input
              value={adminData.role}
              disabled 
              placeholder="Role"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Admin"}
          </Button>
        </form>
      )}
    </div>
  );
};
