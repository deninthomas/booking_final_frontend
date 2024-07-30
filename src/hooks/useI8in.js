import { useState } from 'react';
import enLocale from '../locales/en.json';
import frLocale from '../locales/fr.json';

const useI18n = () => {
  const [locale, setLocale] = useState('en');

  const locales = {
    en: enLocale,
    fr: frLocale,
    // Add more locales as needed
  };

  const t = (key) => {
    return locales[locale][key] || key; // Return the translated string if available, otherwise return the key itself
  };

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return { t, changeLocale };
};

export default useI18n;
