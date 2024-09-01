import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Mode } from "common/enums";
import React from "react";
import { useTranslation } from "react-i18next";

type UITableModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const UITableModal = ({
  title,
  isOpen,
  onClose,
  children,
}: UITableModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      isCentered
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader backgroundColor="teal" fontSize="2xl" color="white">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">{children}</ModalBody>
        <ModalFooter>
          <Flex justifyContent="space-between">
            <Button
              fontSize="md"
              colorScheme="red"
              fontWeight="bold"
              size="lg"
              mr={3}
              onClick={onClose}
            >
              {t("common.cancel")}
            </Button>
            <Button
              fontSize="md"
              colorScheme="teal"
              fontWeight="bold"
              size="lg"
            >
              {t("common.export")}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UITableModal;
