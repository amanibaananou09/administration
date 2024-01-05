import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { CustomerAccount } from "common/AdminModel";
import { createCustomerAccount } from "common/api/customerAccount-api";
import { CustomerAccountModalProps } from "common/react-props";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import { useFormik } from "formik";
import useCreators from "hooks/use-creators";
import useFormValidation from "hooks/use-form-validation";
import useHttp from "hooks/use-http";
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
  const { creators } = useCreators();
  const { customerAccountValidationSchema } = useFormValidation();
  const { user } = useAuth();

  const { makeRequest: submit } = useHttp(createCustomerAccount, false);

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
      paymentMean: [
        {
          code: "",
        },
      ],
    },
    validationSchema: customerAccountValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      try {
        await submit(values as CustomerAccount);
        form.setSubmitting(false);
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while creating a customer account");
      }
    },
  });

  useEffect(() => {
    onOpen();
  }, []);

  const addPaymentMeanHandler = () => {
    const newPaymentMean = {
      code: "",
    };
    form.setValues({
      ...form.values,
      paymentMean: [...(form.values.paymentMean ?? []), newPaymentMean],
    });
  };

  const removePaymentMeanHandler = (index: number) => {
    const updatedPaymentMean = (form.values.paymentMean ?? []).filter(
      (_, i) => i !== index,
    );
    form.setFieldValue("paymentMean", updatedPaymentMean);
  };

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/customer-accounts");
  };

  const accountSelectOptions =
    creators &&
    creators.map((accountData) => (
      <option key={accountData.id} value={accountData.id}>
        {accountData.name}
      </option>
    ));

  return (
    <UIModal
      title={t("customerAccountModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <Flex direction="column" p="2">
          <Flex alignItems="center">
            <Text w="50%">{t("common.name")}</Text>
            <UIInputFormControl formik={form} fieldName="name" />
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("common.compteParent")}</Text>
            <UISelectFormControl
              formik={form}
              placeholder={t("common.compteParent")}
              fieldName="parentId"
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("common.creator")}</Text>
            <UISelectFormControl
              formik={form}
              placeholder={t("common.creator")}
              fieldName="creatorAccountId"
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("common.droits")}</Text>
            <Checkbox
              id="resaleRight"
              name="resaleRight"
              onChange={(e) =>
                form.setFieldValue("resaleRight", e.target.checked)
              }
            />
          </Flex>
          <Divider my={4} />
          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.userNameLabel")}</Text>
            <UIInputFormControl formik={form} fieldName="masterUser.username" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.emailLabel")}</Text>

            <UIInputFormControl formik={form} fieldName="masterUser.email" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.firstNameLabel")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="masterUser.firstName"
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.lastNameLabel")}</Text>

            <UIInputFormControl formik={form} fieldName="masterUser.lastName" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.password")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="masterUser.password"
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
            <Text w="50%">{t("userInformation.phoneLabel")}</Text>

            <UIPhoneInputFormControl
              formik={form}
              fieldName="masterUser.phone"
            />
          </Flex>
        </Flex>
        <Divider my={4} />
        <Flex alignItems="center">
          <Text w="34%">{t("customerAccountModal.paymentMethods")}</Text>
          <Box as="div" gridColumn="span 2">
            {form.values.paymentMean?.map((_, index) => (
              <Box
                as="div"
                key={index}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                py={2}
              >
                <UIInputFormControl
                  formik={form}
                  fieldName={`paymentMean[${index}].code`}
                  placeholder={t("customerAccountModal.payment")}
                />
                <Box as="div" px={30}>
                  <DeleteIcon
                    onClick={() => removePaymentMeanHandler(index)}
                    cursor="pointer"
                    color="red.500"
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Button onClick={addPaymentMeanHandler} ml={6}>
            {t("customerAccountModal.add")}
          </Button>
        </Flex>
      </form>
    </UIModal>
  );
};

export default CustomerAccountModal;
