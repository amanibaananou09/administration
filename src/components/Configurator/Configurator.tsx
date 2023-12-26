import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Switch,
  Text,
} from "@chakra-ui/react";
import { ConfiguratorProps } from "common/react-props";
import { HSeparator } from "components/Separator/Separator";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Configurator = (props: ConfiguratorProps) => {
  const [switched, setSwitched] = useState<boolean>(props.isChecked);
  const { t } = useTranslation();

  const settingsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={"right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent bg="white">
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              {t("configurator.Configurator")}
            </Text>
            <Text fontSize="md" mb="16px">
              {t("configurator.text")}.
            </Text>
            <HSeparator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Flex justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  {t("configurator.navbarFixed")}
                </Text>
                <Switch
                  colorScheme="blue"
                  isChecked={switched}
                  onChange={() => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Flex>
              <HSeparator />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Configurator;
