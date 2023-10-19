import { Button, useColorModeValue } from "@chakra-ui/react";
import { FixedPluginProps } from "common/model";
import { SettingsIcon } from "components/Icons/Icons";
import React from "react";

const FixedPlugin = (props: FixedPluginProps) => {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const bgButton = useColorModeValue("white", "gray.600");

  const settingsRef = React.useRef<SVGSVGElement | null>(null);

  return (
    <Button
      h="52px"
      w="52px"
      onClick={props.onOpen}
      bg={bgButton}
      position="fixed"
      variant="no-hover"
      left=""
      right="35px"
      bottom="30px"
      borderRadius="50px"
      boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
    >
      <SettingsIcon
        cursor="pointer"
        ref={settingsRef as React.RefObject<SVGSVGElement>}
        color={navbarIcon}
        w="20px"
        h="20px"
      />
    </Button>
  );
};

export default FixedPlugin;
