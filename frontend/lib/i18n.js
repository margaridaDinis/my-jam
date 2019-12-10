import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { default as pt } from '../translations/pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: { ...pt }
      }
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });
