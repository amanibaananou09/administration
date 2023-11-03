import {
  Button as ChakraButton,
  Modal as ChakraModal,
  ModalBody as ChakraModalBody,
  ModalCloseButton as ChakraModalCloseButton,
  ModalContent as ChakraModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalOverlay as ChakraModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ConfirmationModalProps ,Station} from "common/model";
import { forwardRef, useImperativeHandle, useState } from "react";

const ConfirmationModal = forwardRef((props: ConfirmationModalProps, ref) => {
  const { message, onConfirm } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [station, setStation] = useState<Station>();

  useImperativeHandle(ref, () => ({
    open(station: Station) {
      setStation(station);
      onOpen();
    },
    close() {
      onClose();
    },
  }));
  return (
    <ChakraModal
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ChakraModalOverlay />
      <ChakraModalContent>
        <ChakraModalHeader>{station?.name}</ChakraModalHeader>
        <ChakraModalCloseButton />
        <ChakraModalBody pb={6}>{message}</ChakraModalBody>
        <ChakraModalFooter>
          <ChakraButton
            colorScheme="teal"
            mr={3}
            onClick={() => station && onConfirm(station)}
          >
            Confirm
          </ChakraButton>
          <ChakraButton onClick={onClose}>Cancel</ChakraButton>
        </ChakraModalFooter>
      </ChakraModalContent>
    </ChakraModal>
  );
});

export default ConfirmationModal;
