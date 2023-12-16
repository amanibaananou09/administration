import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import {
  createCustomerAccount,
  getCustomerAccounts,
} from "common/api/customerAccount-api";
import { CustomerAccountModalProps } from "common/react-props";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";

const CustomerAccountModal = ({ onSubmit }: CustomerAccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accounts, setAccounts] = useState<CustomerAccount[]>([]);

  const { t } = useTranslation("administration");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [account, setAccount] = useState<CustomerAccount>({
    name: "",
    resaleRight: "",
    parentId: "",
    status: "ENABLED",
    masterUser: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    const getListOfAccounts = async () => {
      const result = await getCustomerAccounts();
      setAccounts(result);
    };

    if (isOpen) {
      getListOfAccounts();
    }
  }, [isOpen]);

  const submitHandler = async (
    values: CustomerAccount,
    { setSubmitting }: FormikHelpers<CustomerAccount>,
  ) => {
    await createCustomerAccount(values);
    closeModalHandler();
    onSubmit();
    setSubmitting(false);
  };

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/customer-accounts");
  };

  const isNotNull = (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = t("common.error");
    } else if (value.length < 4) {
      error = t("common.errorLength");
    }
    return error;
  };

  const isValidConfirmPassword = (value: string, values: CustomerAccount) => {
    let error: string | undefined;

    if (value !== values.masterUser.password) {
      error = t("common.errorConfirmPassword");
    }

    return error;
  };

  const isValidPhoneNumber = (value: string) => {
    // Check if the phone number is present
    if (!value) {
      return t("common.error");
    }

    return undefined;
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
        error = t("common.errorNumeric");
      }
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

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={closeModalHandler}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader fontWeight="bold" fontSize="25px" color="teal.500">
          {t("customerAccountModal.header")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <Formik initialValues={account} onSubmit={submitHandler}>
            {(props) => (
              <Form>
                <Flex direction="column">
                  <Box flex="1" mr="4">
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
                          setFieldValue: (field: string, value: any) => void;
                        };
                      }) => (
                        <FormControl
                          isInvalid={!!form.errors.name && !!form.touched.name}
                          mb="24px"
                        >
                          <FormLabel htmlFor="name">
                            {t("common.name")}
                          </FormLabel>
                          <Input
                            {...field}
                            id="name"
                            placeholder={t("common.name")}
                            width="200px"
                            onChange={(e) => {
                              field.onChange(e);
                              form.setFieldValue(
                                "masterUser.username",
                                e.target.value,
                              );
                            }}
                          />
                          <FormErrorMessage>
                            {t("common.name")} {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Flex flex="1" mr="4">
                    <Box flex="1" mr="4">
                      <Field name="compteParent" validate={isNotNull}>
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
                            errors: { compteParent: string };
                            touched: { compteParent: boolean };
                          };
                        }) => (
                          <FormControl
                            isInvalid={
                              !!form.errors.compteParent &&
                              !!form.touched.compteParent
                            }
                            mb="10px"
                          >
                            <FormLabel htmlFor="Compte Parent">
                              {t("common.compteParent")}
                            </FormLabel>
                            <Select
                              id="parentId"
                              name="parentId"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder={t("common.selectAccount")}
                            >
                              {accounts.map((accountData) => (
                                <option
                                  key={accountData.id}
                                  value={accountData.id}
                                >
                                  {accountData.name}
                                </option>
                              ))}
                            </Select>

                            <FormErrorMessage>
                              {form.errors.compteParent}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box flex="1" mr="4">
                      <Field name="droits" validate={isNotNull}>
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
                            setFieldValue: (field: string, value: any) => void;
                            errors: { droits: string };
                            touched: { droits: boolean };
                          };
                        }) => (
                          <FormControl
                            isInvalid={
                              !!form.errors.droits && !!form.touched.droits
                            }
                            mb="24px"
                          >
                            <br />

                            <Flex alignItems="center">
                              <FormLabel htmlFor="droits">
                                {t("common.droits")}
                              </FormLabel>
                              <Checkbox
                                id="resaleRight"
                                name="resaleRight"
                                isChecked={field.value === "true"} // Initialize as false, set to true if value is "true"
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? "true"
                                    : "false"; // Convert boolean to string
                                  field.onChange(e);
                                  form.setFieldValue("droits", newValue);
                                }}
                              />
                            </Flex>

                            <FormErrorMessage>
                              {t("common.droits")}
                              {form.errors.droits}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Flex>
                  <Box>
                    <Flex mb="7" justifyContent="left">
                      <FormLabel
                        textAlign="left"
                        htmlFor="masterUser"
                        fontWeight="semibold"
                        textDecoration="underline"
                        textDecorationColor="teal"
                        fontSize="19px"
                        color="teal.500"
                      >
                        {t("customerAccounts.masterUser")}
                      </FormLabel>
                    </Flex>
                    <Flex mb="24px">
                      <Box flex="1" mr="4">
                        <Field name="masterUser.username" validate={isNotNull}>
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
                                placeholder={t("userInformation.userNameLabel")}
                              />
                              <FormErrorMessage>
                                {t("userInformation.userNameLabel")}{" "}
                                {form.errors.masterUser?.username}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" mr="4">
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
                              <FormLabel htmlFor="email">
                                {" "}
                                {t("userInformation.emailLabel")}
                              </FormLabel>
                              <Input
                                {...field}
                                id="email"
                                placeholder={t("userInformation.emailLabel")}
                              />
                              <FormErrorMessage>
                                {t("userInformation.emailLabel")}{" "}
                                {form.errors.masterUser?.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>
                    <Flex mb="24px">
                      <Box flex="1" mr="4">
                        <Field name="masterUser.firstName" validate={isNotNull}>
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
                                placeholder={t(
                                  "userInformation.firstNameLabel",
                                )}
                              />
                              <FormErrorMessage>
                                {t("userInformation.firstNameLabel")}{" "}
                                {form.errors.masterUser?.firstName}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
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
                                placeholder={t("userInformation.lastNameLabel")}
                              />
                              <FormErrorMessage>
                                {t("userInformation.lastNameLabel")}
                                {form.errors.masterUser?.lastName}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" mr="4">
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
                              <FormLabel htmlFor="Phone">
                                {t("userInformation.phoneLabel")}
                              </FormLabel>
                              <PhoneInput
                                {...field}
                                id="phone"
                                name="phone"
                                placeholder={t("userInformation.phoneLabel")}
                                value={field.value}
                                onChange={(value) => {
                                  const fakeEvent = {
                                    target: {
                                      value,
                                      name: field.name,
                                    },
                                  };
                                  field.onChange(
                                    fakeEvent as React.ChangeEvent<any>,
                                  );
                                }}
                              />
                              <FormErrorMessage>
                                {t("userInformation.phoneLabel")}{" "}
                                {form.errors.masterUser?.phone}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>
                    <Flex mb="24px">
                      <Box flex="1" mr="4">
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
                              <FormLabel htmlFor="password">
                                {t("common.password")}
                              </FormLabel>
                              <InputGroup>
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  id="password"
                                  placeholder={t("common.password")}
                                />
                                <InputRightElement width="3.2rem">
                                  <Button
                                    h="100%"
                                    variant="ghost"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    color="gray.500"
                                  >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {t("common.password")}
                                {form.errors.masterUser?.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box flex="1" mr="4">
                        <Field
                          name="masterUser.confirmPassword"
                          validate={(value: string) =>
                            isValidConfirmPassword(value, props.values)
                          }
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
                              errors: {
                                masterUser: { confirmPassword: string };
                              };
                              touched: {
                                masterUser: { confirmPassword: boolean };
                              };
                            };
                          }) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.masterUser?.confirmPassword &&
                                !!form.touched.masterUser?.confirmPassword
                              }
                              mb="24px"
                            >
                              <FormLabel htmlFor="confirmPassword">
                                {t("common.confirmPassword")}
                              </FormLabel>
                              <Input
                                {...field}
                                type="password"
                                id="confirmPassword"
                                placeholder={t("common.confirmPassword")}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setConfirmPassword(e.target.value);
                                }}
                              />
                              <FormErrorMessage>
                                {form.errors.masterUser?.confirmPassword}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>
                  </Box>
                  <Flex justifyContent="flex-end">
                    <Button
                      fontSize="md"
                      colorScheme="teal"
                      fontWeight="bold"
                      size="lg"
                      mr={3}
                      isLoading={props.isSubmitting}
                      type="submit"
                      onClick={() => submitHandler(props.values, props)}
                    >
                      {t("common.submit")}
                    </Button>

                    <Button
                      fontSize="md"
                      fontWeight="bold"
                      colorScheme="red"
                      size="lg"
                      onClick={closeModalHandler}
                    >
                      {t("common.cancel")}
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

export default CustomerAccountModal;
