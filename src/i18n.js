
import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import  TranslationEn from "./locale/en.json"  
import TranslationAr from "./locale/ar.json";  
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: TranslationEn,
      },
      ar: {
        translation: TranslationAr,
      },
    },
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "querystring",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: "./locale/{{lng}}.json",
    },
  });

export default i18n;