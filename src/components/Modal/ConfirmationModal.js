import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const ConfirmationModal = forwardRef(({ message, onConfirm }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [station, setSation] = useState({});

  useImperativeHandle(ref, () => ({
    open(station) {
      setSation(station);
      onOpen();
    },
    close() {
      onClose();
    },
  }));

  return (
    <Modal
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{station.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{message}</ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={() => onConfirm(station)}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ConfirmationModal;
