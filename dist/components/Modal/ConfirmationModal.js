import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
const ConfirmationModal = forwardRef(({ message, onConfirm }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [station, setSation] = useState({});
    useImperativeHandle(ref, () => ({
        open(station) {
            setSation(station);
            onOpen();
        },
        close() {
            onClose();
        },
    }));
    return (React.createElement(Modal, { motionPreset: "slideInBottom", closeOnOverlayClick: false, blockScrollOnMount: true, isOpen: isOpen, onClose: onClose },
        React.createElement(ModalOverlay, null),
        React.createElement(ModalContent, null,
            React.createElement(ModalHeader, null, station.name),
            React.createElement(ModalCloseButton, null),
            React.createElement(ModalBody, { pb: 6 }, message),
            React.createElement(ModalFooter, null,
                React.createElement(Button, { colorScheme: "teal", mr: 3, onClick: () => onConfirm(station) }, "Confirm"),
                React.createElement(Button, { onClick: onClose }, "Cancel")))));
});
export default ConfirmationModal;
