import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setLanguage } from "@/shared/hooks";
import { Button } from "@/shared/ui/button";
import uzFlagLight from "@/assets/flags/uz_light.gif";
import uzFlagDark from "@/assets/flags/uz_dark.gif";
import ruFlagLight from "@/assets/flags/ru_light.gif";
import ruFlagDark from "@/assets/flags/ru_dark.gif";
import { useTheme } from "@/app/providers/theme-provider";

export const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const { theme } = useTheme();

  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === "uz" ? "ru" : "uz";
    dispatch(setLanguage(newLanguage));
  };

  const flagSrc = selectedLanguage === "uz" 
    ? theme === "dark" ? uzFlagDark : uzFlagLight 
    : theme === "dark" ? ruFlagDark : ruFlagLight;

  return (
    <Button
      className="min-w-[42px] min-h-[36px] cursor-pointer"
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
    >
      <img src={flagSrc} alt={selectedLanguage} className="w-6 h-6" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
};
