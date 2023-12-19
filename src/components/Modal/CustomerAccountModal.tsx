import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { createCustomerAccount } from "common/api/customerAccount-api";
import { CustomerAccountModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import { getIn, useFormik } from "formik";
import useCustomerAccounts from "hooks/use-customer-accounts";
import useFormValidation from "hooks/use-form-validation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import UIInputFormControl from "../UI/Form/UIInputFormControl";
import UIModal from "../UI/Modal/UIModal";

interface FormValues extends CustomerAccount {
  confirmPassword: string;
}

const CustomerAccountModal = ({ onSubmit }: CustomerAccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation("administration");
  const history = useHistory();
  const { customerAccounts } = useCustomerAccounts();
  const { customerAccountValidationSchema } = useFormValidation();
  const { user } = useAuth();

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      name: "",
      resaleRight: false,
      status: "ENABLED",
      confirmPassword: "",
      parentId: user?.customerAccountId,
      creatorAccountId: user?.customerAccountId,
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
      title={t("customerAccountModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <Flex direction="column">
          <UIInputFormControl
            isInvalid={!!form.errors.name && !!form.touched.name}
            label={t("common.name")}
            fieldName="name"
            value={form.values.name}
            onChange={form.handleChange}
            errorMessage={form.errors.name}
          />
          <SimpleGrid columns={2} spacingX={5}>
            <UISelectFormControl
              isInvalid={!!form.errors.parentId && !!form.touched.parentId}
              label={t("common.compteParent")}
              fieldName="parentId"
              value={form.values.parentId}
              onChange={form.handleChange}
              errorMessage={form.errors.parentId}
            >
              {customerAccounts.map((accountData) => (
                <option key={accountData.id} value={accountData.id}>
                  {accountData.name}
                </option>
              ))}
            </UISelectFormControl>
            <UISelectFormControl
              isInvalid={
                !!form.errors.creatorAccountId &&
                !!form.touched.creatorAccountId
              }
              label={t("common.creator")}
              fieldName="creatorAccountId"
              value={form.values.creatorAccountId}
              onChange={form.handleChange}
              errorMessage={form.errors.creatorAccountId}
            >
              {customerAccounts.map((accountData) => (
                <option key={accountData.id} value={accountData.id}>
                  {accountData.name}
                </option>
              ))}
            </UISelectFormControl>

            <Flex justifyContent="space-between" alignItems="center" mb="15px">
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
          </SimpleGrid>

          <Text textColor="teal.500" fontWeight="bold" fontSize="xl" mb="20px">
            {t("customerAccounts.masterUser")}
          </Text>
          <SimpleGrid columns={2} spacingX={5}>
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

            <UIInputFormControl
              isInvalid={
                !!form.errors.confirmPassword && !!form.touched.confirmPassword
              }
              label={t("common.confirmPassword")}
              fieldName="confirmPassword"
              type="password"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              errorMessage={form.errors.confirmPassword}
              showPasswordBtn={false}
            />

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
          </SimpleGrid>
        </Flex>
      </form>
    </UIModal>
  );
};

export default CustomerAccountModal;
