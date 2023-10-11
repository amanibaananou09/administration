import React, { FC, useRef } from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { SettingsIcon } from 'src/components/Icons/Icons';

interface FixedPluginProps {
  onOpen: () => void;
}

const FixedPlugin: FC<FixedPluginProps> = (props) => {
  const navbarIcon = useColorModeValue('gray.500', 'gray.200');
  const bgButton = useColorModeValue('white', 'gray.600');

  const settingsRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        h="52px"
        w="52px"
        onClick={props.onOpen}
        bg={bgButton}
        position="fixed"
        variant="no-hover"
        left={'' as string}
        right={'35px' as string}
        bottom="30px"
        borderRadius="50px"
        boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      >
        <SettingsIcon
          cursor="pointer"
         // ref={settingsRef}
          color={navbarIcon}
          w="20px"
          h="20px"
        />
      </Button>
    </>
  );
};

export default FixedPlugin;
