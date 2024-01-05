import { Checkbox, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { UserModalProps } from "common/react-props";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import { useFormik } from "formik";
import useCreators from "hooks/use-creators";
import useFormValidation from "hooks/use-form-validation";
import useHttp from "hooks/use-http";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAuth } from "store/AuthContext";
import UIInputFormControl from "../UI/Form/UIInputFormControl";
import UIModal from "../UI/Modal/UIModal";

interface FormValues extends GeneralUser {
  confirmPassword: string;
}

const UserModal = ({ onSubmit }: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { userFormValidationSchema } = useFormValidation();
  const { creators } = useCreators();
  const { t } = useTranslation();
  const history = useHistory();
  const { makeRequest: submit } = useHttp(addUser, false);

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
      try {
        await submit({ ...values } as FormValues);
        form.setSubmitting(false);
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while creating a new user");
      }
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

  const accountSelectOptions =
    creators &&
    creators.map((accountData) => (
      <option key={accountData.id} value={accountData.id}>
        {accountData.name}
      </option>
    ));

  return (
    <UIModal
      title={t("addUserModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <Flex direction="column" p="2">
          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.userNameLabel")}</Text>
            <UIInputFormControl formik={form} fieldName="username" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.emailLabel")}</Text>
            <UIInputFormControl formik={form} fieldName="email" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.password")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="password"
              type="password"
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.confirmPassword")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="confirmPassword"
              type="password"
              showPasswordBtn={false}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.creatorAccount")}</Text>
            <UISelectFormControl
              formik={form}
              label=""
              fieldName="creatorAccountId"
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.compteParent")}</Text>
            <UISelectFormControl
              formik={form}
              label=""
              fieldName="customerAccountId"
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.mask")}</Text>
            <UIInputFormControl formik={form} fieldName="subnetMask" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.phoneLabel")}</Text>
            <UIPhoneInputFormControl formik={form} label="" fieldName="phone" />
          </Flex>
        </Flex>
        <Divider my={4} />
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
