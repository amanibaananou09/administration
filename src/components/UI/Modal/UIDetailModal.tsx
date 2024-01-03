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

type UIDetailModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const UIDetailModal = ({
  title,
  isOpen,
  onClose,
  children,
}: UIDetailModalProps) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
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
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UIDetailModal;
