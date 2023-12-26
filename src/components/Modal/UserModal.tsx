import {
  Checkbox,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { UserModalProps } from "common/react-props";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import { useFormik } from "formik";
import useCustomerAccounts from "hooks/use-customer-accounts";
import useFormValidation from "hooks/use-form-validation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAuth } from "store/AuthContext";
import UIInputFormControl from "../UI/Form/UIInputFormControl";
import UIModal from "../UI/Modal/UIModal";

interface FormValues extends GeneralUser {
  confirmPassword: string;
}

const UserModal = (props: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { userFormValidationSchema } = useFormValidation();
  const { customerAccounts } = useCustomerAccounts();
  const { t } = useTranslation();
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
        <SimpleGrid columns={2} spacingX={5}>
          <UIInputFormControl
            formik={form}
            label={t("userInformation.userNameLabel")}
            fieldName="username"
          />

          <UIInputFormControl
            formik={form}
            label={t("userInformation.emailLabel")}
            fieldName="email"
          />

          <UIInputFormControl
            formik={form}
            label={t("common.password")}
            fieldName="password"
            type="password"
          />

          <UIInputFormControl
            formik={form}
            label={t("common.confirmPassword")}
            fieldName="confirmPassword"
            type="password"
            showPasswordBtn={false}
          />

          <UISelectFormControl
            formik={form}
            label={t("common.creatorAccount")}
            fieldName="creatorAccountId"
          >
            {customerAccounts.map((accountData) => (
              <option key={accountData.id} value={accountData.id}>
                {accountData.name}
              </option>
            ))}
          </UISelectFormControl>

          <UISelectFormControl
            formik={form}
            label={t("common.compteParent")}
            fieldName="customerAccountId"
          >
            {customerAccounts.map((accountData) => (
              <option key={accountData.id} value={accountData.id}>
                {accountData.name}
              </option>
            ))}
          </UISelectFormControl>

          <UIInputFormControl
            formik={form}
            label={t("userInformation.mask")}
            fieldName="subnetMask"
          />

          <UIPhoneInputFormControl
            formik={form}
            label={t("userInformation.phoneLabel")}
            fieldName="phone"
          />
        </SimpleGrid>
        <Flex width="50%" flexDirection="column" gap="10%">
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
              onChange={(e) => form.setFieldValue("sendSms", e.target.checked)}
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
      </form>
    </UIModal>
  );
};

export default UserModal;
