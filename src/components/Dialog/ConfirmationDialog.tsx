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
import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

export interface ConfirmationDialogRefType {
  open: (title: string, message: string) => void;
}

interface ConfirmationDialogProps {
  cancelBtn?: string;
  submitBtn?: string;
  onConfirm: () => void;
  ref?: React.Ref<any>;
}

const ConfirmationDialog = (
  { cancelBtn, submitBtn, onConfirm }: ConfirmationDialogProps,
  ref: Ref<ConfirmationDialogRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const cancelRef = useRef<any>(null);
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    open(title, message) {
      setTitle(title);
      setMessage(message);
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
      closeOnOverlayClick={false}
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
