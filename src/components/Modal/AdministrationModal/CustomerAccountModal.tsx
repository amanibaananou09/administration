import {
  Box,
  Button,
  Flex,
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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { createCustomerAccount } from "common/api/customerAccount-api";
import {
  CustomAccountModalRefType,
  CustomerAccountModalProps,
} from "common/react-props";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";

const CustomerAccountModal = (
  { onSubmit }: CustomerAccountModalProps,
  ref: Ref<CustomAccountModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [account, setAccount] = useState<CustomerAccount>({
    name: "",
    description: "",
    status: "",
    masterUser: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
  });

  useImperativeHandle(ref, () => ({
    open(account?: CustomerAccount) {
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
            phone: "",
          },
        });
      }
      onOpen();
    },
  }));
  const isNotNull = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = "is required";
    }
    return error;
  };
  const isNotNullAndMinLength = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = "is required";
    } else if (value.length < 4) {
      error = "must be at least 4 characters";
    }
    return error;
  };

  const isValidPhoneNumber = (value: string) => {
    let error: string | undefined;

    // Check if the value is a number with exactly 8 digits
    const isValid = /^\d{8}$/.test(value);

    if (!isValid) {
      error = "must be a number with exactly 8 digits";
    }

    return error;
  };

  const isValidEmail = (value: string) => {
    let error: string | undefined;
    // Check if the value contains the "@" symbol
    if (!/@/.test(value)) {
      error = "must be a valid email address";
    }

    return error;
  };

  const submitHandler = async (
    values: CustomerAccount,
    { setSubmitting }: FormikHelpers<CustomerAccount>,
  ) => {
    await createCustomerAccount(values);
    onClose();
    onSubmit();
    setSubmitting(false);
  };
  const isValidPassword = (value: string) => {
    let error: string | undefined;

    // Check if the password is defined and has at least 6 characters
    if (!value || value.length < 6) {
      error = "must be at least 6 characters";
    } else {
      // Check if the password contains at least one special character
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      // Check if the password contains at least one numeric digit
      const hasNumericDigit = /\d/.test(value);

      if (!hasSpecialCharacter || !hasNumericDigit) {
        error =
          "must contain at least one special character and one numeric digit";
      }
    }

    return error;
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Create New Customer Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <Formik initialValues={account} onSubmit={submitHandler}>
            {(props) => (
              <Form>
                <Flex direction="column">
                  <Flex mb="24px">
                    <Box flex="1" mr="4">
                      <Field name="name" validate={isNotNullAndMinLength}>
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
                            isInvalid={
                              !!form.errors.name && !!form.touched.name
                            }
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
                    </Box>
                    <Box flex="1" mx="4">
                      <Field
                        name="description"
                        validate={isNotNullAndMinLength}
                      >
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
                    </Box>
                    <Box flex="1" ml="4">
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
                            <Select
                              {...field}
                              id="status"
                              placeholder="Select Status"
                            >
                              <option value="ENABLED">ENABLED</option>
                              <option value="DISABLED">DISABLED</option>
                            </Select>
                            <FormErrorMessage>
                              Status {form.errors.status}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>

                  <Box>
                    <Flex mb="4">
                      <FormLabel
                        htmlFor="masterUser"
                        fontWeight="semibold"
                        textDecoration="underline"
                        textDecorationColor="teal"
                        fontSize="20px"
                      >
                        Master User
                      </FormLabel>
                    </Flex>
                    <Flex mb="24px">
                      <Box flex="1" mr="4">
                        <Field
                          name="masterUser.username"
                          validate={isNotNullAndMinLength}
                        >
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
                              errors: { masterUser: { username: string } };
                              touched: { masterUser: { username: boolean } };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.username &&
                                !!form.touched.masterUser?.username
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="username">
                                User Name
                              </FormLabel>
                              <Input
                                {...field}
                                id="username"
                                placeholder="User Name"
                              />
                              <FormErrorMessage>
                                User Name {form.errors.masterUser?.username}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" mx="4">
                        <Field name="masterUser.email" validate={isValidEmail}>
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
                              errors: { masterUser: { email: string } };
                              touched: { masterUser: { email: boolean } };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.email &&
                                !!form.touched.masterUser?.email
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <Input
                                {...field}
                                id="email"
                                placeholder="Email"
                              />
                              <FormErrorMessage>
                                Email {form.errors.masterUser?.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" ml="4">
                        <Field
                          name="masterUser.firstName"
                          validate={isNotNullAndMinLength}
                        >
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
                              errors: { masterUser: { firstName: string } };
                              touched: { masterUser: { firstName: boolean } };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.firstName &&
                                !!form.touched.masterUser?.firstName
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="firstName">
                                First Name
                              </FormLabel>
                              <Input
                                {...field}
                                id="firstName"
                                placeholder="First Name"
                              />
                              <FormErrorMessage>
                                First Name {form.errors.masterUser?.firstName}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>
                    <Flex mb="24px">
                      <Box flex="1" mr="4">
                        <Field name="masterUser.lastName" validate={isNotNull}>
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
                              errors: { masterUser: { lastName: string } };
                              touched: { masterUser: { lastName: boolean } };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.lastName &&
                                !!form.touched.masterUser?.lastName
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="lastName">
                                Last Name
                              </FormLabel>
                              <Input
                                {...field}
                                id="lastName"
                                placeholder="Last Name"
                              />
                              <FormErrorMessage>
                                Last Name {form.errors.masterUser?.lastName}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" mx="4">
                        <Field
                          name="masterUser.password"
                          validate={isValidPassword}
                        >
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
                              errors: { masterUser: { password: string } };
                              touched: { masterUser: { password: boolean } };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.password &&
                                !!form.touched.masterUser?.password
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <Input
                                {...field}
                                type="password"
                                id="password"
                                placeholder="Password"
                              />
                              <FormErrorMessage>
                                Password {form.errors.masterUser?.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" ml="4">
                        <Field
                          name="masterUser.phone"
                          validate={isValidPhoneNumber}
                        >
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
                              errors: { masterUser: { phone: string } };
                              touched: { masterUser: { phone: boolean } };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.phone &&
                                !!form.touched.masterUser?.phone
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="Phone">Phone</FormLabel>
                              <Input
                                {...field}
                                id="phone"
                                placeholder="Phone"
                                type="number"
                              />
                              <FormErrorMessage>
                                Phone {form.errors.masterUser?.phone}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>
                  </Box>
                  <Flex justifyContent="center">
                    <Button
                      fontSize="15px"
                      colorScheme="teal"
                      fontWeight="bold"
                      w="50%"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      SUBMIT
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(CustomerAccountModal);
