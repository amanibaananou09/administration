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

import { CustomerAccount, CustomerAccountFormValues } from "common/AdminModel";
import {
  createCustomerAccount,
  getCustomerAccountDetails,
  updateAccount,
} from "common/api/customerAccount-api";
import { Mode } from "common/enums";
import { CustomerAccountModalProps } from "common/react-props";
import { SkeletonForm } from "components/Skeleton/Skeletons";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import { useFormik } from "formik";
import useCreators from "hooks/use-creators";
import useFormValidation from "hooks/use-form-validation";
import useHttp from "hooks/use-http";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import {
  customerAccountInitFormValues,
  customerAccountToFormValues,
  formValuesToCustomerAccount,
} from "utils/form-utils";
import UIInputFormControl from "../UI/Form/UIInputFormControl";
import UIModal from "../UI/Modal/UIModal";

type Params = {
  id: string;
};

const CustomerAccountModal = ({
  onSubmit,
  mode,
}: CustomerAccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<Params>();
  const { t } = useTranslation();
  const history = useHistory();
  const { creators } = useCreators();
  const {
    customerAccountValidationSchema,
    editCustomerAccountValidationSchema,
  } = useFormValidation();
  const { user } = useAuth();

  const { makeRequest: submit } = useHttp(createCustomerAccount, false);
  const { makeRequest: fetchDetails, isLoading } = useHttp<CustomerAccount>(
    getCustomerAccountDetails,
    false,
  );

  const form = useFormik<CustomerAccountFormValues>({
    initialValues: {
      ...customerAccountInitFormValues,
      parentId: user!!.customerAccountId,
      creatorAccountId: user!!.customerAccountId,
    },
    enableReinitialize: true,
    validationSchema:
      mode === Mode.EDIT
        ? editCustomerAccountValidationSchema
        : customerAccountValidationSchema,

    onSubmit: async (values: CustomerAccountFormValues) => {
      const customerAccount = formValuesToCustomerAccount(values);

      try {
        switch (mode) {
          case Mode.CREATE:
            await submit(customerAccount);
            break;
          case Mode.EDIT:
            await updateAccount(customerAccount);
            break;
        }
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while submitting the form");
      }
    },
  });

  useEffect(() => {
    onOpen();

    const fetchAccountDetails = async () => {
      try {
        if (mode === Mode.EDIT && id) {
          const accountDetails = await fetchDetails(+id);
          // Ensure that account.masterUser is defined before accessing its properties
          const values = customerAccountToFormValues(accountDetails);
          form.setValues(values);
        }
      } catch (error) {
        console.error("Error while fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [mode, id]);

  const addPaymentMethodHandler = () => {
    const newPaymentMethod = {
      code: "",
    };
    form.setValues({
      ...form.values,
      paymentMethods: [...(form.values.paymentMethods ?? []), newPaymentMethod],
    });
  };

  const removePaymentMethodHandler = (index: number) => {
    const updatedPaymentMethods = (form.values.paymentMethods ?? []).filter(
      (_, i) => i !== index,
    );
    form.setFieldValue("paymentMethods", updatedPaymentMethods);
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

  useEffect(() => {
    if (mode === Mode.CREATE && form.values.name) {
      form.setFieldValue("username", form.values.name.replace(/\s+/g, ""));
    }
  }, [mode, form.values.name]);

  return (
    <UIModal
      title={
        mode === Mode.EDIT
          ? t("customerAccountModal.update")
          : t("customerAccountModal.header")
      }
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
      isEditMode={mode === Mode.EDIT}
    >
      {!isLoading && (
        <form>
          <Flex direction="column" p="2">
            <Flex alignItems="center">
              <Text w="50%">{t("common.name")}</Text>
              <UIInputFormControl
                formik={form}
                fieldName="name"
                isDisabled={mode === Mode.EDIT}
              />
            </Flex>
            <Flex alignItems="center">
              <Text w="50%">{t("common.compteParent")}</Text>
              <UISelectFormControl
                formik={form}
                placeholder={t("common.compteParent")}
                fieldName="parentId"
                isDisabled={mode === Mode.EDIT}
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
                isDisabled={mode === Mode.EDIT}
              >
                {accountSelectOptions}
              </UISelectFormControl>
            </Flex>
            <Flex alignItems="center">
              <Text w="50%">{t("common.droits")}</Text>
              <Checkbox
                id="resaleRight"
                name="resaleRight"
                isChecked={form.values.resaleRight}
                onChange={(e) =>
                  form.setFieldValue("resaleRight", e.target.checked)
                }
              />
            </Flex>
            <Divider my={4} />
            <Flex alignItems="center">
              <Text w="50%">{t("userInformation.userNameLabel")}</Text>
              <UIInputFormControl formik={form} fieldName="username" />
            </Flex>

            <Flex alignItems="center">
              <Text w="50%">{t("userInformation.emailLabel")}</Text>

              <UIInputFormControl formik={form} fieldName="email" />
            </Flex>

            <Flex alignItems="center">
              <Text w="50%">{t("userInformation.firstNameLabel")}</Text>

              <UIInputFormControl formik={form} fieldName="firstName" />
            </Flex>

            <Flex alignItems="center">
              <Text w="50%">{t("userInformation.lastNameLabel")}</Text>

              <UIInputFormControl formik={form} fieldName="lastName" />
            </Flex>

            {mode == Mode.CREATE && (
              <Flex alignItems="center">
                <Text w="50%">{t("common.password")}</Text>

                <UIInputFormControl
                  formik={form}
                  fieldName="password"
                  type="password"
                />
              </Flex>
            )}

            {mode == Mode.CREATE && (
              <Flex alignItems="center">
                <Text w="50%">{t("common.confirmPassword")}</Text>

                <UIInputFormControl
                  formik={form}
                  fieldName="confirmPassword"
                  type="password"
                  showPasswordBtn={false}
                />
              </Flex>
            )}

            <Flex alignItems="center">
              <Text w="50%">{t("userInformation.phoneLabel")}</Text>

              <UIPhoneInputFormControl formik={form} fieldName="phone" />
            </Flex>
          </Flex>
          <Divider my={4} />
          <Flex alignItems="center">
            <Text w="34%">{t("customerAccountModal.paymentMethods")}</Text>
            <Box as="div" gridColumn="span 2">
              {form.values.paymentMethods?.map((_, index) => (
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
                    fieldName={`paymentMethods[${index}].code`}
                    placeholder={t("customerAccountModal.payment")}
                    isDisabled={mode === Mode.EDIT}
                  />
                  {mode === Mode.CREATE && (
                    <Box as="div" px={30}>
                      <DeleteIcon
                        onClick={() => removePaymentMethodHandler(index)}
                        cursor="pointer"
                        color="red.500"
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            {mode !== Mode.EDIT && (
              <Button onClick={addPaymentMethodHandler} ml={6}>
                {t("customerAccountModal.add")}
              </Button>
            )}
          </Flex>
        </form>
      )}
      {isLoading && <SkeletonForm mode={mode} />}
    </UIModal>
  );
};

export default CustomerAccountModal;
