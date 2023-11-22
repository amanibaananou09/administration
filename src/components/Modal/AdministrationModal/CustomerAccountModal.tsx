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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('administration');

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
      error = t("common.error");
    }
    return error;
  };
  const isNotNullAndMinLength = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = t("common.error");
    } else if (value.length < 4) {
      error = t("common.errorLength");
    }
    return error;
  };

  const isValidPhoneNumber = (value: string) => {
    let error: string | undefined;

    // Check if the value is a number with exactly 8 digits
    const isValid = /^\d{8}$/.test(value);

    if (!isValid) {
      error = t("common.errorPhone");
    }

    return error;
  };

  const isValidEmail = (value: string) => {
    let error: string | undefined;
    // Check if the value contains the "@" symbol
    if (!/@/.test(value)) {
      error = t("common.erroremail");
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
      error = t("common.errorPassword");
    } else {
      // Check if the password contains at least one special character
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      // Check if the password contains at least one numeric digit
      const hasNumericDigit = /\d/.test(value);

      if (!hasSpecialCharacter || !hasNumericDigit) {
        error =
        t("common.errorNumeric");
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
        <ModalHeader>{t("customerAccountModal.header")}</ModalHeader>
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
                            <FormLabel htmlFor="name">{t("common.name")}</FormLabel>
                            <Input {...field} id="name" placeholder={t("common.name")} />
                            <FormErrorMessage>
                            {t("common.name")} {form.errors.name}
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
                            {t("common.description")}
                            </FormLabel>
                            <Input
                              {...field}
                              id="description"
                              placeholder={t("common.description")}
                            />
                            <FormErrorMessage>
                            {t("common.description")} {form.errors.description}
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
                            <FormLabel htmlFor="status">{t("common.status")}</FormLabel>
                            <Select
                              {...field}
                              id="status"
                              placeholder={t("customerAccountModal.selectStatus")}
                            >
                              <option value="ENABLED">{t("common.enabled")}</option>
                              <option value="DISABLED">{t("common.disabled")}</option>
                            </Select>
                            <FormErrorMessage>
                            {t("common.status")} {form.errors.status}
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
                        {t("customerAccounts.masterUser")}
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
                              {t("userInformation.userNameLabel")}
                              </FormLabel>
                              <Input
                                {...field}
                                id="username"
                                placeholder= {t("userInformation.userNameLabel")}
                              />
                              <FormErrorMessage>
                              {t("userInformation.userNameLabel")} {form.errors.masterUser?.username}
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
                              <FormLabel htmlFor="email"> {t("userInformation.emailLabel")}</FormLabel>
                              <Input
                                {...field}
                                id="email"
                                placeholder={t("userInformation.emailLabel")}
                              />
                              <FormErrorMessage>
                              {t("userInformation.emailLabel")} {form.errors.masterUser?.email}
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
                              {t("userInformation.firstNameLabel")}
                              </FormLabel>
                              <Input
                                {...field}
                                id="firstName"
                                placeholder={t("userInformation.firstNameLabel")}
                              />
                              <FormErrorMessage>
                              {t("userInformation.firstNameLabel")} {form.errors.masterUser?.firstName}
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
                              {t("userInformation.lastNameLabel")}
                              </FormLabel>
                              <Input
                                {...field}
                                id="lastName"
                                placeholder= {t("userInformation.lastNameLabel")}
                              />
                              <FormErrorMessage>
                              {t("userInformation.lastNameLabel")} {form.errors.masterUser?.lastName}
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
                              <FormLabel htmlFor="password"> {t("common.password")}</FormLabel>
                              <Input
                                {...field}
                                type="password"
                                id="password"
                                placeholder= {t("common.password")}
                              />
                              <FormErrorMessage>
                              {t("common.password")} {form.errors.masterUser?.password}
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
                              <FormLabel htmlFor="Phone"> {t("userInformation.phoneLabel")}</FormLabel>
                              <Input
                                {...field}
                                id="phone"
                                placeholder={t("userInformation.phoneLabel")}
                                type="number"
                              />
                              <FormErrorMessage>
                              {t("userInformation.phoneLabel")} {form.errors.masterUser?.phone}
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
                      {t("common.submit")}
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
