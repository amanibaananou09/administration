import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Flex,
} from "@chakra-ui/react";
import { CustAccount, AccountModalProps } from "common/AdminModel";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const StationModal = forwardRef(({ onSubmit }: AccountModalProps, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [account, setAccount] = useState<CustAccount>({
    name: "",
    description: "",
    status: "",
    masterUser: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "",
    },
  });

  useImperativeHandle(ref, () => ({
    open(account: CustAccount) {
      if (account) {
        setAccount(account);
      } else {
        setAccount({
          name: "",
          description: "",
          status: "",
          masterUser: {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            role: "",
          },
        });
      }
      onOpen();
    },
    close() {
      onClose(); // Call the onClose callback to close the modal
    },
  }));

  const isNotNull = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = "is required";
    }
    return error;
  };

  const submitHandler = (
    values: CustAccount,
    { setSubmitting }: FormikHelpers<CustAccount>,
  ) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Customer Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <Formik initialValues={account} onSubmit={submitHandler}>
            {(props) => (
              <Form>
                <Flex>
                  <Box flex="2" mr="4">
                    <Field name="name" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { name: string };
                          touched: { name: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={!!form.errors.name && !!form.touched.name}
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
                    <Field name="description" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { description: string };
                          touched: { description: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.description &&
                            !!form.touched.description
                          }
                          mb="24px"
                        >
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <Input
                            {...field}
                            id="description"
                            placeholder="Description"
                          />
                          <FormErrorMessage>
                            Description {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="status" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { status: boolean };
                          touched: { status: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.status && !!form.touched.status
                          }
                          mb="40px"
                        >
                          <FormLabel htmlFor="status">Status</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            id="status"
                            placeholder="Status"
                          />
                          <FormErrorMessage>
                            Status {form.errors.status}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box flex="2" ml="4">
                    <FormLabel
                      htmlFor="masterUser"
                      fontWeight="semibold"
                      textDecoration="underline"
                      textDecorationColor="teal"
                    >
                      Master User
                    </FormLabel>

                    <Field name="username" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { username: string };
                          touched: { username: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.username && !!form.touched.username
                          }
                          mb="24px"
                        >
                          {" "}
                          <FormLabel htmlFor="name">User Name</FormLabel>
                          <Input
                            {...field}
                            id="username"
                            placeholder="User Name"
                          />
                          <FormErrorMessage>
                            User Name {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="firstName" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { firstName: string };
                          touched: { firstName: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.firstName && !!form.touched.firstName
                          }
                          mb="24px"
                        >
                          <FormLabel htmlFor="name">E-mail</FormLabel>
                          <Input
                            {...field}
                            id="firstName"
                            placeholder="First Name"
                          />
                          <FormErrorMessage>
                            First Name {form.errors.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="firstName" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { firstName: string };
                          touched: { firstName: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.firstName && !!form.touched.firstName
                          }
                          mb="24px"
                        >
                          <FormLabel htmlFor="name">First Name</FormLabel>
                          <Input
                            {...field}
                            id="firstName"
                            placeholder="First Name"
                          />
                          <FormErrorMessage>
                            First Name {form.errors.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastName" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { lastName: string };
                          touched: { lastName: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.lastName && !!form.touched.lastName
                          }
                          mb="24px"
                        >
                          <FormLabel htmlFor="name">Last Name</FormLabel>
                          <Input
                            {...field}
                            id="lastName"
                            placeholder="Last Name"
                          />
                          <FormErrorMessage>
                            Last Name {form.errors.lastName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password" validate={isNotNull}>
                      {({
                        field,
                        form,
                      }: {
                        field: {
                          name: string;
                          value: string;
                          onChange: (e: React.ChangeEvent<any>) => void;
                          onBlur: () => void;
                        };
                        form: {
                          errors: { password: string };
                          touched: { password: boolean };
                        };
                      }) => (
                        <FormControl
                          isInvalid={
                            !!form.errors.password && !!form.touched.password
                          }
                          mb="24px"
                        >
                          <FormLabel htmlFor="name">Password</FormLabel>
                          <Input
                            {...field}
                            id="password"
                            placeholder="Password"
                          />
                          <FormErrorMessage>
                            Password {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Flex>
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
