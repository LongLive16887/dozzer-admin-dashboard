import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setLanguage } from "@/shared/hooks";
import { Button } from "@/shared/ui/button";

export const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === "uz" ? "ru" : "uz";
    dispatch(setLanguage(newLanguage));
  };

  return (
    <Button
      className="min-w-[42px] min-h-[36px] cursor-pointer"
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
    >
      {selectedLanguage.toUpperCase()}
      <span className="sr-only">Toggle language</span>
    </Button>
  );
};
