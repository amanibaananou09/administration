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

type UIModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  children: React.ReactNode;
  isConsultMode: boolean;
};

const UIModal = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  isEditMode = false,
  children,
  isConsultMode,
}: UIModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
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
          <Flex justifyContent="flex-end">
            {!isConsultMode && (
              <>
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
                  isLoading={isSubmitting}
                  onClick={onSubmit}
                >
                  {isEditMode ? t("common.update") : t("common.submit")}
                </Button>
              </>
            )}
            {isConsultMode && (
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
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UIModal;
