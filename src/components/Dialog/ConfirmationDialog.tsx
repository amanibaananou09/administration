import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export interface ConfirmationDialogRefType {
  open: () => void;
}

interface ConfirmationDialogProps {
  title: string;
  message: string;
  cancelBtn?: string;
  submitBtn?: string;
  onConfirm: () => void;
  ref?: React.Ref<any>;
}

const ConfirmationDialog = (
  { onConfirm, title, message, cancelBtn, submitBtn }: ConfirmationDialogProps,
  ref: Ref<ConfirmationDialogRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);
  const { t } = useTranslation("administration");

  useImperativeHandle(ref, () => ({
    open() {
      onOpen();
    },
  }));

  const confirmHandler = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelBtn ? cancelBtn : t("common.confirmationDialog.cancel")}
            </Button>
            <Button colorScheme="red" onClick={confirmHandler} ml={3}>
              {submitBtn ? submitBtn : t("common.confirmationDialog.confirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default forwardRef(ConfirmationDialog);
