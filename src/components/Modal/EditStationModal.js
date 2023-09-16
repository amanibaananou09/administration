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
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from "react";

const EditStationModal = forwardRef(({ station }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));

  if (!station) {
    return null;
  }

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit A Station</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Name
            </FormLabel>
            <Input
              id="name"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Your full name"
              mb="24px"
              size="lg"
              defaultValue={station.name}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Address
            </FormLabel>
            <Input
              id="address"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Your email address"
              mb="24px"
              size="lg"
              defaultValue={station.address}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Pts ID
            </FormLabel>
            <Input
              id="controllerId"
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Your password"
              mb="24px"
              size="lg"
              defaultValue={station.controllerPtsId}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize="10px"
            variant="dark"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
            onClick={onClose}
          >
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default EditStationModal;
