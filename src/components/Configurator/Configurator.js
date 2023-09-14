// Chakra Imports
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
import { HSeparator } from "components/Separator/Separator";
import React, { useState } from "react";
import { useEss } from "store/ESSContext";

export default function Configurator(props) {
  const {
    sidebarVariant,
    setSidebarVariant,
    secondary,
    isOpen,
    onClose,
    fixed,
  } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { station } = useEss();

  const { colorMode, toggleColorMode } = useColorMode();
  const bgDrawer = useColorModeValue("white", "navy.800");

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white",
  );
  let colorButton = useColorModeValue("white", "gray.700");

  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");

  const settingsRef = React.useRef();
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
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

              <Text fontSize="md" fontWeight="bold" my="16px">
                Select A Sation:
              </Text>
              <Button
                w="100%"
                mb="16px"
                bg={bgButton}
                color={colorButton}
                fontSize="xs"
                variant="no-effects"
                px="30px"
              >
                {station && station.stationName}
              </Button>

              <Button
                w="100%"
                bg={secondaryButtonBg}
                border="1px solid"
                borderColor={secondaryButtonBorder}
                color={secondaryButtonColor}
                fontSize="xs"
                variant="no-effects"
                px="20px"
                mb="16px"
              >
                <Text textDecorationColor="none">Station 2</Text>
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
