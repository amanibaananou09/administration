import {
  Checkbox,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomerAccount } from "common/AdminModel";
import { createCustomerAccount } from "common/api/customerAccount-api";
import { CustomerAccountModalProps } from "common/react-props";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import { useFormik } from "formik";
import useCustomerAccounts from "hooks/use-customer-accounts";
import useFormValidation from "hooks/use-form-validation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import UIInputFormControl from "../UI/Form/UIInputFormControl";
import UIModal from "../UI/Modal/UIModal";

interface FormValues extends CustomerAccount {
  confirmPassword: string;
}

const CustomerAccountModal = ({ onSubmit }: CustomerAccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();
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
            formik={form}
            label={t("common.name")}
            fieldName="name"
          />
          <SimpleGrid columns={2} spacingX={5}>
            <UISelectFormControl
              formik={form}
              label={t("common.compteParent")}
              fieldName="parentId"
            >
              {customerAccounts.map((accountData) => (
                <option key={accountData.id} value={accountData.id}>
                  {accountData.name}
                </option>
              ))}
            </UISelectFormControl>
            <UISelectFormControl
              formik={form}
              label={t("common.creator")}
              fieldName="creatorAccountId"
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
              formik={form}
              label={t("userInformation.userNameLabel")}
              fieldName="masterUser.username"
            />

            <UIInputFormControl
              formik={form}
              label={t("userInformation.emailLabel")}
              fieldName="masterUser.email"
            />

            <UIInputFormControl
              formik={form}
              label={t("userInformation.firstNameLabel")}
              fieldName="masterUser.firstName"
            />

            <UIInputFormControl
              formik={form}
              label={t("userInformation.lastNameLabel")}
              fieldName="masterUser.lastName"
            />

            <UIInputFormControl
              formik={form}
              label={t("common.password")}
              fieldName="masterUser.password"
              type="password"
            />

            <UIInputFormControl
              formik={form}
              label={t("common.confirmPassword")}
              fieldName="confirmPassword"
              type="password"
              showPasswordBtn={false}
            />

            <UIPhoneInputFormControl
              formik={form}
              label={t("userInformation.phoneLabel")}
              fieldName="masterUser.phone"
            />
          </SimpleGrid>
        </Flex>
      </form>
    </UIModal>
  );
};

export default CustomerAccountModal;
