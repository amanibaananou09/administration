import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface DialogConfig {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
}

export const useConfirm = (props?: DialogConfig) => {
  const { title, message, onConfirm, onDismiss } = props || {};

  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);
  const [config, setConfig] = useState<DialogConfig>({
    title,
    message,
    onConfirm,
    onDismiss,
  });

  const toggle = () => setOpen(!isOpen);
  const close = () => setOpen(false);

  const handleApprove = () => {
    if (config.onConfirm) {
      config.onConfirm();
    }
    toggle();
  };

  const handleDismiss = () => {
    if (config.onDismiss) {
      config.onDismiss();
    }
    toggle();
  };

  const openDialog = (conf?: DialogConfig) => {
    if (conf) {
      setConfig((prev) => ({
        title: conf?.title ?? prev.title,
        message: conf?.message ?? prev.message,
        onConfirm: conf?.onConfirm ?? prev.onConfirm,
        onDismiss: conf?.onDismiss ?? prev.onDismiss,
      }));
    }
    toggle();
  };

  const ConfirmationDialog = ({ children }: { children?: React.ReactNode }) => {
    return (
      <Modal isOpen={isOpen} onClose={toggle} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{config.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children ? children : config.message}</ModalBody>

          {!children && (
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDismiss}>
                {t("common.confirmationDialog.cancel")}
              </Button>
              <Button colorScheme="teal" onClick={handleApprove}>
                {t("common.confirmationDialog.confirm")}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return { ConfirmationDialog, confirm: openDialog, close };
};
