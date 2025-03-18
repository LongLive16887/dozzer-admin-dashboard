import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useTheme } from "@/app/providers/theme-provider";
import { useEffect } from "react";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    updateMetaThemeColor(newTheme);
  };

  useEffect(() => {
    updateMetaThemeColor(theme);
  }, [theme]);

  const updateMetaThemeColor = (mode: string) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", mode === "dark" ? "#0a0a0a" : "#ffffff");
    }
  };

  return (
    <Button
      className="min-w-[42px] min-h-[36px] cursor-pointer"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
