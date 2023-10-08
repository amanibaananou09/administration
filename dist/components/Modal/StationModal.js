import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage, } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
const { forwardRef, useImperativeHandle, useState } = require("react");
const initStation = {
    name: "",
    address: "",
    controllerPtsId: "",
};
const StationModal = forwardRef(({ onSubmit }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [station, setStation] = useState(initStation);
    useImperativeHandle(ref, () => ({
        open(station) {
            if (station) {
                setStation(station);
            }
            else {
                setStation(initStation);
            }
            onOpen();
        },
        close() {
            onClose();
        },
    }));
    const isNotNull = (value) => {
        let error;
        if (!value) {
            error = "is required";
        }
        return error;
    };
    const submitHandler = (values, actions) => {
        onSubmit(values);
    };
    return (React.createElement(Modal, { motionPreset: "slideInBottom", blockScrollOnMount: true, isOpen: isOpen, onClose: onClose },
        React.createElement(ModalOverlay, null),
        React.createElement(ModalContent, null,
            React.createElement(ModalHeader, null, "Create New Station"),
            React.createElement(ModalCloseButton, null),
            React.createElement(ModalBody, { mb: "24px" },
                React.createElement(Formik, { initialValues: station, onSubmit: submitHandler }, (props) => (React.createElement(Form, null,
                    React.createElement(Field, { name: "name", validate: isNotNull }, ({ field, form }) => (React.createElement(FormControl, { isInvalid: form.errors.name && form.touched.name, mb: "24px" },
                        React.createElement(FormLabel, { htmlFor: "name" }, "Name"),
                        React.createElement(Input, Object.assign({}, field, { id: "name", placeholder: "Name" })),
                        React.createElement(FormErrorMessage, null,
                            "Name ",
                            form.errors.name)))),
                    React.createElement(Field, { name: "address", validate: isNotNull }, ({ field, form }) => (React.createElement(FormControl, { isInvalid: form.errors.address && form.touched.address, mb: "24px" },
                        React.createElement(FormLabel, { htmlFor: "address" }, "Address"),
                        React.createElement(Input, Object.assign({}, field, { id: "address", placeholder: "Address" })),
                        React.createElement(FormErrorMessage, null,
                            "Address ",
                            form.errors.address)))),
                    React.createElement(Field, { name: "controllerPtsId", validate: isNotNull }, ({ field, form }) => (React.createElement(FormControl, { isInvalid: form.errors.controllerPtsId &&
                            form.touched.controllerPtsId, mb: "40px" },
                        React.createElement(FormLabel, { htmlFor: "controllerPtsId" }, "Pts ID"),
                        React.createElement(Input, Object.assign({}, field, { type: "text", id: "controllerPtsId", placeholder: "PTS Controller ID" })),
                        React.createElement(FormErrorMessage, null,
                            "PTS ID ",
                            form.errors.controllerPtsId)))),
                    React.createElement(Button, { fontSize: "10px", colorScheme: "teal", fontWeight: "bold", w: "100%", h: "45", isLoading: props.isSubmitting, type: "submit" }, "SUBMIT"))))))));
});
export default StationModal;
