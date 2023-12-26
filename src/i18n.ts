import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...require("./locales/en/pages-en.json"),
          common: require("./locales/en/common-en.json"),
          routes: require("./locales/en/routes-en.json"),
          validation: require("./locales/en/validation-en.json"),
        },
      },
      fr: {
        translation: {
          ...require("./locales/fr/pages-fr.json"),
          common: require("./locales/fr/common-fr.json"),
          routes: require("./locales/fr/routes-fr.json"),
          validation: require("./locales/fr/validation-fr.json"),
        },
      },
    },
    lng: localStorage.getItem("i18nextLng") || "fr",
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
