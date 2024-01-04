import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type UIUpdateModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onHandleUpdate: () => void;
  children: React.ReactNode;
};

const UIUpdateModal = ({
  title,
  isOpen,
  onClose,
  onHandleUpdate,
  children,
}: UIUpdateModalProps) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        style={{
          backgroundColor: "gray.100",
          borderRadius: "10px",
        }}
      >
        <ModalHeader
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onHandleUpdate}>Update</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UIUpdateModal;
