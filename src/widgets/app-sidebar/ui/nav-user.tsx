"use client";
import { LogOutIcon, MoreVerticalIcon, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/shared/hooks/authSlice";
import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "@/shared/api/user";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { Avatar } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { toast } from "sonner";

export function NavUser() {
  const dispatch = useDispatch();
  const { data: user } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const displayName = user?.data.name || "User";
  const displayPhone = user?.data.phone_number || "+998999999999";

  const [name, setName] = useState(displayName);
  const [phone, setPhone] = useState(displayPhone);

  useEffect(() => {
    if (user) {
      setName(user.data.name || "User");
      setPhone(user.data.phone_number || "+998999999999");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ name, phone_number: phone }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <User className="ml-auto size-8" />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {displayPhone}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                Update profile
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form onSubmit={handleSubmit} className="grid gap-4 px-2">
              <Input
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="flex justify-end gap-2 pb-2">
                <Button type="submit" disabled={isLoading} className="cursor-pointer">
                  Save
                </Button>
              </div>
            </form>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 cursor-pointer"
              onClick={() => dispatch(logoutUser())}
            >
              <LogOutIcon size={16} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
