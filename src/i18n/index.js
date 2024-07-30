import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend"; // <--- import here

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Custom path pattern
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
