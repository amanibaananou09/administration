import React, { FC, useState, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HSeparator } from "src/components/Separator/Separator";
import StationConfigurator from "./StationConfigurator";

interface ConfiguratorProps {
  secondary: any;
  isOpen: boolean;
  onClose: () => void;
  isChecked: boolean;
  onSwitch: (isChecked: boolean) => void;
}

const Configurator: FC<ConfiguratorProps> = (props) => {
  const [switched, setSwitched] = useState<boolean>(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgDrawer = useColorModeValue("white", "navy.800");

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
        <DrawerContent bg={bgDrawer}>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Configurator
            </Text>
            <Text fontSize="md" mb="16px">
              See your dashboard options.
            </Text>
            <HSeparator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Flex justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Navbar Fixed
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
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button
                  onClick={toggleColorMode}
                  color={colorMode === "light" ? "Dark" : "Light"}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              </Flex>

              <HSeparator />

              <StationConfigurator />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Configurator;
