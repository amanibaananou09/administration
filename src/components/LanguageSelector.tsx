import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import flagFr from "../components/fr.png";
import flagEn from "../components/en.png";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languageOptions = [
    { value: "fr", label: "Français", flag: flagFr },
    { value: "en", label: "English", flag: flagEn },
    // Add more languages as needed
  ];

  return (
    <Menu>
      <MenuButton>
        <Flex alignItems="center">
          <Image
            src={
              languageOptions.find((option) => option.value === i18n.language)
                ?.flag
            }
            boxSize="30px"
            marginRight="5px"
          />
        </Flex>
      </MenuButton>
      <MenuList>
        {languageOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => changeLanguage(option.value)}
          >
            <Flex alignItems="center" justify="space-between" w="100%">
              <Flex alignItems="center">
                <Image
                  src={option.flag}
                  boxSize="30px"
                  borderRadius="5px"
                  marginRight="5px"
                />
                <Text>{option.label}</Text>
              </Flex>
              {option.value === i18n.language && (
                <Text color="blue.500" fontWeight="bold">
                  ✓
                </Text>
              )}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
