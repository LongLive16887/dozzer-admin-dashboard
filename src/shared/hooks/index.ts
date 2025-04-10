import { useIsMobile } from "./use-mobile";
import languageReducer, {
  languageSlice,
  setAvailableLanguages,
  setLanguage,
} from "./language-slice";
import authReducer from "./authSlice"
import superAdminReducer from "./superAdminSlice"

export {
  superAdminReducer,
  authReducer,
  useIsMobile,
  languageReducer,
  languageSlice,
  setAvailableLanguages,
  setLanguage,
};