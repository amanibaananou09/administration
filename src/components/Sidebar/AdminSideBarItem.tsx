import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { AdminSideBarItemProps } from "common/react-props";
import IconBox from "components/Icons/IconBox";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const AdminSideBarItem = ({ route, isOpen }: AdminSideBarItemProps) => {
  const { t } = useTranslation("administration");
  const history = useHistory();
  const searchType = useRef<HTMLSelectElement>(null);
  const searchText = useRef<HTMLInputElement>(null);

  const handleSearch = async (): Promise<void> => {
    let search = "";

    if (searchType.current?.value && searchText.current?.value) {
      const { value: type } = searchType.current;
      const { value: text } = searchText.current;

      search = `${type}=${text}`;
    }

    history.replace({
      pathname: route.layout + route.path,
      search,
    });
  };

  useEffect(() => {
    if (isOpen) {
      handleSearch();
    }
  }, [isOpen]);

  return (
    <AccordionItem
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <h2>
        <AccordionButton>
          <Flex flex="1">
            <IconBox
              bg="gray.700"
              color="white"
              h="30px"
              w="30px"
              me="12px"
              transition="0.2s linear"
            >
              {route.icon}
            </IconBox>
            <Text color="gray.700" my="auto" fontSize="sm" fontWeight="bold">
              {route.name}
            </Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel py={5} boxShadow="inset 0px 0px 3px 1px #0000005d">
        <Box
          position="relative"
          border="2px"
          borderColor="gray.100"
          borderRadius="10px"
          px="10px"
          py="15px"
          mb="20px"
        >
          <Text
            position="absolute"
            top="-10px"
            backgroundColor="white"
            fontWeight="bold"
            fontSize="sm"
          >
            Actions
          </Text>
          <Flex justifyContent="center">
            <Button
              size="md"
              color="white"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              onClick={() => history.push(`${route.layout + route.path}/new`)}
            >
              {t("sideBarItem.addnew")}
            </Button>
          </Flex>
        </Box>
        <Box
          position="relative"
          border="2px"
          borderColor="gray.100"
          borderRadius="10px"
          p="10px"
        >
          <Text
            position="absolute"
            top="-10px"
            backgroundColor="white"
            fontWeight="bold"
            fontSize="sm"
          >
            {t("sideBarItem.search")}
          </Text>
          <Flex flexDirection="column" justifyContent="center" m="10px" gap="3">
            <Flex gap="3">
              <Flex flexDirection="column" width="50%">
                <Text>{t("sideBarItem.filterType.label")}:</Text>
                <Select placeholder="Type" ref={searchType}>
                  <option value="name">
                    {t("sideBarItem.filterType.name")}
                  </option>
                  <option value="creator">
                    {t("sideBarItem.filterType.creator")}
                  </option>
                  <option value="parent">
                    {t("sideBarItem.filterType.parent")}
                  </option>
                </Select>
              </Flex>
              <Flex flexDirection="column" width="50%">
                <Text>{t("sideBarItem.filterTextLabel")}:</Text>
                <Input type="text" ref={searchText} />
              </Flex>
            </Flex>
            <Button
              size="md"
              color="white"
              bg="gray.700"
              _hover={{ bg: "gray.600" }}
              onClick={handleSearch}
            >
              {t("sideBarItem.search")}
            </Button>
          </Flex>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AdminSideBarItem;
