import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localEn from '~/locales/en.json'

const resources = {
  en: {
    translation: localEn
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
