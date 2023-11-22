import i18n from 'i18n';
import React from 'react';


interface TranslationContextProps {
  t: typeof i18n.t;
  changeLanguage: (lng: string) => void;
}

export const TranslationContext = React.createContext<TranslationContextProps | undefined>(undefined);

interface TranslationProviderProps {
  children: React.ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const translationFunctions: TranslationContextProps = {
    t: i18n.t,
    changeLanguage,
  };

  return (
    <TranslationContext.Provider value={translationFunctions}>
      {children}
    </TranslationContext.Provider>
  );
}
