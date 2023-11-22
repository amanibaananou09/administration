import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
  
      <Select
        onChange={(e) => changeLanguage(e.target.value)}
        defaultValue={i18n.language}  marginLeft="20px" backgroundColor= "white" width= "130px" border="1px solid #ccc" borderRadius= "5px" padding="8px" 
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </Select>
    
  );
};

export default LanguageSelector;
