import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Box } from '@chakra-ui/react';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage)
      .then(() => console.log('Language changed successfully'))
      .catch((error) => console.error('Error in changing language:', error));
  };

  const languageOptions = [
    { value: 'en', label: t('English') },
    { value: 'fr', label: t('French') },
  ];

  return (
    <Box>
      <Select onChange={handleLanguageChange}>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSelector;
