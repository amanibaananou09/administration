import { Flex, Stack, Text } from "@chakra-ui/react";
import { ReactComponent as AdminLogo } from "assets/svg/administration-logo.svg";
import { useTranslation } from "react-i18next";

const SidebarLogo = () => {
  const { t } = useTranslation();

  return (
    <Flex direction="row" gap="1" align="center">
      <AdminLogo style={{ height: "50px", width: "30%" }} />
      <Flex direction="column" width="60%">
        <Text
          fontSize={{ sm: "lg", lg: "small" }}
          fontWeight="normal"
          color="Blue"
          ms={{ sm: "8px", md: "0px" }}
        >
          STATIONNEX
        </Text>
        <Text
          fontSize={{ sm: "lg", lg: "xl" }}
          fontWeight="bold"
          ms={{ sm: "8px", md: "0px" }}
        >
          {t("common.admin")}
        </Text>
        <Text>{t("common.interface")}</Text>
      </Flex>
    </Flex>
  );
};

export default SidebarLogo;
