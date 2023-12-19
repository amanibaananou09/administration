import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { createCustomerAccount } from "common/api/customerAccount-api";
import { CustomerAccountModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import { getIn, useFormik } from "formik";
import useCustomerAccounts from "hooks/use-customer-accounts";
import useFormValidation from "hooks/use-form-validation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";
import UIInputFormControl from "./UIInputFormControl";
import UIModal from "./UIModal";

interface FormValues extends CustomerAccount {
  confirmPassword: string;
}

const CustomerAccountModal = ({ onSubmit }: CustomerAccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation("administration");
  const history = useHistory();
  const { customerAccounts } = useCustomerAccounts();
  const { customerAccountValidationSchema } = useFormValidation();

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      name: "",
      resaleRight: false,
      parentId: "",
      status: "ENABLED",
      confirmPassword: "",
      creatorAccountId: undefined,
      masterUser: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
      },
    },
    validationSchema: customerAccountValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      await createCustomerAccount(values as CustomerAccount);
      form.setSubmitting(false);
      closeModalHandler();
      onSubmit();
    },
  });

  useEffect(() => {
    onOpen();
  }, []);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/customer-accounts");
  };

  return (
    <UIModal
      title={t("addUserModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <Flex direction="column">
          <Box flex="1" mr="4">
            <UIInputFormControl
              isInvalid={!!form.errors.name && !!form.touched.name}
              label={t("common.name")}
              fieldName="name"
              value={form.values.name}
              onChange={form.handleChange}
              errorMessage={form.errors.name}
            />
          </Box>
          <Flex flex="1" mr="4">
            <Box flex="1" mr="4">
              <FormControl
                isInvalid={!!form.errors.parentId && !!form.touched.parentId}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.compteParent")}
                </FormLabel>
                <Select
                  id="parentId"
                  name="parentId"
                  value={form.values.parentId}
                  onChange={form.handleChange}
                  placeholder={t("common.compteParent")}
                >
                  {customerAccounts.map((accountData) => (
                    <option key={accountData.id} value={accountData.id}>
                      {accountData.name}
                    </option>
                  ))}
                </Select>

                <FormErrorMessage>{form.errors.parentId}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box flex="1" mr="4">
              <FormControl
                isInvalid={
                  !!form.errors.creatorAccountId &&
                  !!form.touched.creatorAccountId
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.creator")}
                </FormLabel>
                <Select
                  id="creatorAccountId"
                  name="creatorAccountId"
                  value={form.values.creatorAccountId}
                  onChange={form.handleChange}
                  placeholder={t("common.creator")}
                >
                  {customerAccounts.map((accountData) => (
                    <option key={accountData.id} value={accountData.id}>
                      {accountData.name}
                    </option>
                  ))}
                </Select>

                <FormErrorMessage>
                  {form.errors.creatorAccountId}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box flex="1" mr="4">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" fontWeight="bold">
                  {t("common.droits")}
                </Text>
                <Checkbox
                  id="resaleRight"
                  name="resaleRight"
                  onChange={(e) =>
                    form.setFieldValue("resaleRight", e.target.checked)
                  }
                />
              </Flex>
            </Box>
          </Flex>
          <Box>
            <Flex mb="7" justifyContent="left">
              {t("customerAccounts.masterUser")}
            </Flex>
            <Flex mb="24px">
              <Box flex="1" mr="4">
                <UIInputFormControl
                  isInvalid={
                    !!getIn(form.errors, "masterUser.username") &&
                    !!getIn(form.touched, "masterUser.username")
                  }
                  label={t("userInformation.userNameLabel")}
                  fieldName="masterUser.username"
                  value={form.values.masterUser?.username}
                  onChange={form.handleChange}
                  errorMessage={getIn(form.errors, "masterUser.username")}
                />
              </Box>
              <Box flex="1" mr="4">
                <UIInputFormControl
                  isInvalid={
                    !!getIn(form.errors, "masterUser.email") &&
                    !!getIn(form.touched, "masterUser.email")
                  }
                  label={t("userInformation.emailLabel")}
                  fieldName="masterUser.email"
                  value={form.values.masterUser?.email}
                  onChange={form.handleChange}
                  errorMessage={getIn(form.errors, "masterUser.email")}
                />
              </Box>
            </Flex>
            <Flex mb="24px">
              <Box flex="1" mr="4">
                <UIInputFormControl
                  isInvalid={
                    !!getIn(form.errors, "masterUser.firstName") &&
                    !!getIn(form.touched, "masterUser.firstName")
                  }
                  label={t("userInformation.firstNameLabel")}
                  fieldName="masterUser.firstName"
                  value={form.values.masterUser?.firstName}
                  onChange={form.handleChange}
                  errorMessage={getIn(form.errors, "masterUser.firstName")}
                />
              </Box>
              <Box flex="1" mr="4">
                <UIInputFormControl
                  isInvalid={
                    !!getIn(form.errors, "masterUser.lastName") &&
                    !!getIn(form.touched, "masterUser.lastName")
                  }
                  label={t("userInformation.lastNameLabel")}
                  fieldName="masterUser.lastName"
                  value={form.values.masterUser?.lastName}
                  onChange={form.handleChange}
                  errorMessage={getIn(form.errors, "masterUser.lastName")}
                />
              </Box>
              <Box flex="1" mr="4">
                <FormControl
                  isInvalid={
                    !!getIn(form.errors, "masterUser.phone") &&
                    !!getIn(form.touched, "masterUser.phone")
                  }
                  mb="20px"
                >
                  <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                    {t("userInformation.phoneLabel")}
                  </FormLabel>
                  <PhoneInput
                    id="phone"
                    name="masterUser.phone"
                    value={form.values.masterUser?.phone}
                    onChange={form.handleChange}
                    placeholder={t("userInformation.phoneLabel")}
                  />
                  <FormErrorMessage>
                    {getIn(form.errors, "masterUser.phone")}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </Flex>
            <Flex mb="24px">
              <Box flex="1" mr="4">
                <UIInputFormControl
                  isInvalid={
                    !!getIn(form.errors, "masterUser.password") &&
                    !!getIn(form.touched, "masterUser.password")
                  }
                  label={t("common.password")}
                  fieldName="masterUser.password"
                  type="password"
                  value={form.values.masterUser?.password}
                  onChange={form.handleChange}
                  errorMessage={getIn(form.errors, "masterUser.password")}
                />
              </Box>
              <Box flex="1" mr="4">
                <UIInputFormControl
                  isInvalid={
                    !!form.errors.confirmPassword &&
                    !!form.touched.confirmPassword
                  }
                  label={t("common.confirmPassword")}
                  fieldName="confirmPassword"
                  type="password"
                  value={form.values.confirmPassword}
                  onChange={form.handleChange}
                  errorMessage={form.errors.confirmPassword}
                  showPasswordBtn={false}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </form>
    </UIModal>
  );
};

export default CustomerAccountModal;
