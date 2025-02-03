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
import React from "react";
import { useTranslation } from "react-i18next";

type UITableModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  logData?: any;
  ExporterComponent?: React.ComponentType<{ logs: any }>;
};

const UITableModal = ({
  title,
  isOpen,
  onClose,
  children,
  logData,
  ExporterComponent,
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
          <Flex w="100%" justifyContent="space-between">
            {ExporterComponent &&
              React.createElement(ExporterComponent, { logs: logData ?? [] })}
            <Button
              fontSize="md"
              colorScheme="red"
              fontWeight="bold"
              size="lg"
              mr={3}
              onClick={onClose}
            >
              {t("logModal.close")}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UITableModal;
