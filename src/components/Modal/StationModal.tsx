import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React, { forwardRef, useImperativeHandle, useState } from "react";

interface Station {
  name: string;
  address: string;
  controllerPtsId: string;
}

interface StationModalProps {
  onSubmit: (values: Station) => void;
}

const StationModal = forwardRef(({ onSubmit }: StationModalProps, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [station, setStation] = useState<Station>({
    name: "",
    address: "",
    controllerPtsId: "",
  });

  const isNotNull = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = "is required";
    }
    return error;
  };

  const submitHandler = (values: Station) => {
    onSubmit(values);
  };

  useImperativeHandle(ref, () => ({
    open(station: Station | null) {
      if (station) {
        setStation(station);
      } else {
        setStation({ ...initStation });
      }
      onOpen();
    },
    close() {
      onClose();
    },
  }));

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Station</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <Formik initialValues={station} onSubmit={submitHandler}>
            {(props) => (
              <Form>
                <Field name="name" validate={isNotNull}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      mb="24px"
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} id="name" placeholder="Name" />
                      <FormErrorMessage>
                        Name {form.errors.name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="address" validate={isNotNull}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.address && form.touched.address}
                      mb="24px"
                    >
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <Input {...field} id="address" placeholder="Address" />
                      <FormErrorMessage>
                        Address {form.errors.address}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="controllerPtsId" validate={isNotNull}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.controllerPtsId &&
                        form.touched.controllerPtsId
                      }
                      mb="40px"
                    >
                      <FormLabel htmlFor="controllerPtsId">Pts ID</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        id="controllerPtsId"
                        placeholder="PTS Controller ID"
                      />
                      <FormErrorMessage>
                        PTS ID {form.errors.controllerPtsId}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  fontSize="10px"
                  colorScheme="teal"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  SUBMIT
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default StationModal;
