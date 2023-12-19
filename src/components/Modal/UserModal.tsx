import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { UserModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import { useFormik } from "formik";
import useCustomerAccounts from "hooks/use-customer-accounts";
import useFormValidation from "hooks/use-form-validation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAuth } from "store/AuthContext";
import UIInputFormControl from "./UIInputFormControl";
import UIModal from "./UIModal";

interface FormValues extends GeneralUser {
  confirmPassword: string;
}

const UserModal = (props: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { userFormValidationSchema } = useFormValidation();
  const { customerAccounts } = useCustomerAccounts();
  const { t } = useTranslation("administration");
  const history = useHistory();

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      changePassword: false,
      sendSms: false,
      creatorAccountId: user?.customerAccountId,
      customerAccountId: user?.customerAccountId,
      subnetMask: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      await addUser({ ...values } as FormValues);
      form.setSubmitting(false);
      onClose();
      props.onSubmit();
    },
  });

  const closeModalHandler = () => {
    form.resetForm();
    onClose();
    history.replace("/administration/users");
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <UIModal
      title={t("addUserModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <SimpleGrid columns={2} spacing={5}>
          <UIInputFormControl
            isInvalid={!!form.errors.username && !!form.touched.username}
            label={t("userInformation.userNameLabel")}
            fieldName="username"
            value={form.values.username}
            onChange={form.handleChange}
            errorMessage={form.errors.username}
          />

          <UIInputFormControl
            isInvalid={!!form.errors.email && !!form.touched.email}
            label={t("userInformation.emailLabel")}
            fieldName="email"
            value={form.values.email}
            onChange={form.handleChange}
            errorMessage={form.errors.email}
          />

          <UIInputFormControl
            isInvalid={!!form.errors.password && !!form.touched.password}
            label={t("common.password")}
            fieldName="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange}
            errorMessage={form.errors.password}
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
              !!form.errors.creatorAccountId && !!form.touched.creatorAccountId
            }
            mb="20px"
          >
            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              {t("common.creatorAccount")}
            </FormLabel>
            <Select
              id="creatorAccountId"
              name="creatorAccountId"
              value={form.values.creatorAccountId}
              onChange={form.handleChange}
              placeholder={t("common.creatorAccount")}
            >
              {customerAccounts.map((accountData) => (
                <option key={accountData.id} value={accountData.id}>
                  {accountData.name}
                </option>
              ))}
            </Select>

            <FormErrorMessage>{form.errors.creatorAccountId}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              !!form.errors.customerAccountId &&
              !!form.touched.customerAccountId
            }
            mb="20px"
          >
            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              {t("common.compteParent")}
            </FormLabel>
            <Select
              id="customerAccountId"
              name="customerAccountId"
              value={form.values.customerAccountId}
              onChange={form.handleChange}
              placeholder={t("common.compteParent")}
            >
              {customerAccounts.map((accountData) => (
                <option key={accountData.id} value={accountData.id}>
                  {accountData.name}
                </option>
              ))}
            </Select>

            <FormErrorMessage>{form.errors.customerAccountId}</FormErrorMessage>
          </FormControl>

          <UIInputFormControl
            isInvalid={!!form.errors.subnetMask && !!form.touched.subnetMask}
            label={t("userInformation.mask")}
            fieldName="subnetMask"
            value={form.values.subnetMask}
            onChange={form.handleChange}
            errorMessage={form.errors.subnetMask}
          />

          <FormControl
            isInvalid={!!form.errors.phone && !!form.touched.phone}
            mb="20px"
          >
            <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
              {t("userInformation.phoneLabel")}
            </FormLabel>
            <PhoneInput
              id="phone"
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              placeholder={t("userInformation.phoneLabel")}
            />
            <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing={5}>
          <Flex width="100%" flexDirection="column" gap="10%">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {t("common.canChangePassword")}
              </Text>

              <Checkbox
                id="changePassword"
                name="changePassword"
                onChange={(e) =>
                  form.setFieldValue("changePassword", e.target.checked)
                }
              />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {t("common.canSendSMS")}
              </Text>
              <Checkbox
                id="sendSms"
                name="sendSms"
                onChange={(e) =>
                  form.setFieldValue("sendSms", e.target.checked)
                }
              />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                {t("common.isActive")}
              </Text>
              <Checkbox
                id="actif"
                name="actif"
                onChange={(e) => form.setFieldValue("actif", e.target.checked)}
              />
            </Flex>
          </Flex>
        </SimpleGrid>
      </form>
    </UIModal>
  );
};

export default UserModal;
