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
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DialogProps {
  onConfirm: (args: any) => void;
  onDismiss?: () => void;
  message?: string;
  title: string;
}

export const useConfirm = ({
  onConfirm,
  onDismiss,
  message,
  title,
}: DialogProps) => {
  const { t } = useTranslation();
  const [msg, setMsg] = useState(message);
  const [confirmArgs, setConfirmArgs] = useState();
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  const handleApprove = () => {
    if (onConfirm) {
      onConfirm(confirmArgs);
    }
    toggle();
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
    toggle();
  };

  const openDialog = (args: any, message?: string) => {
    setConfirmArgs(args);
    if (message) {
      setMsg(message);
    }
    toggle();
  };

  const ConfirmationDialog = () => {
    return (
      <Modal isOpen={isOpen} onClose={toggle} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{msg}</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDismiss}>
              {t("common.confirmationDialog.cancel")}
            </Button>
            <Button colorScheme="teal" onClick={handleApprove}>
              {t("common.confirmationDialog.confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return { ConfirmationDialog, confirm: openDialog };
};
