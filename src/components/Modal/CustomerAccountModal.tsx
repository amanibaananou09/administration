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
import {
  createCustomerAccount,
  customerAccountDetails,
  updateAccount,
} from "common/api/customerAccount-api";
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
import { userInformation } from "../../common/api/general-user-api";
import { useParams } from "react-router-dom";

interface FormValues extends CustomerAccount {
  confirmPassword: string;
}

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

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      id: "",
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
      paymentMeans: [
        {
          code: "",
        },
      ],
    },
    validationSchema:
      mode === "edit"
        ? editCustomerAccountValidationSchema
        : customerAccountValidationSchema,

    onSubmit: async (values: Partial<FormValues>) => {
      try {
        if (mode === "create") {
          await submit(values as CustomerAccount);
        } else if (mode === "edit" && id) {
          await updateAccount({
            ...(values as CustomerAccount),
            id: id!,
          });
        }

        form.setSubmitting(false);

        form.setValues({
          ...form.values,
          masterUser: {
            id: "",
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            phone: "",
          },
          confirmPassword: "",
        });

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
        if (mode === "edit" && id) {
          const accountDetails = await customerAccountDetails(id);

          // Ensure that account.masterUser is defined before accessing its properties
          if (mode === "edit" && accountDetails.masterUser) {
            const userDetails = await userInformation(
              accountDetails.masterUser.id,
            );

            const updatedValues = {
              ...form.values,
              ...accountDetails,
              masterUser: {
                ...form.values.masterUser,
                ...(userDetails || {}),
              },
            };

            form.setValues(updatedValues);
          }
        }
      } catch (error) {
        console.error("Error while fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [mode, id]);

  const addPaymentMeanHandler = () => {
    const newPaymentMean = {
      code: "",
    };
    form.setValues({
      ...form.values,
      paymentMeans: [...(form.values.paymentMeans ?? []), newPaymentMean],
    });
  };

  const removePaymentMeanHandler = (index: number) => {
    const updatedPaymentMean = (form.values.paymentMeans ?? []).filter(
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

  useEffect(() => {
    if (mode === "create" && form.values.name) {
      form.setFieldValue(
        "masterUser.username",
        form.values.name.replace(/\s+/g, ""),
      );
    }
  }, [mode, form.values.name]);

  return (
    <UIModal
      title={
        mode === "edit"
          ? t("customerAccountModal.update")
          : t("customerAccountModal.header")
      }
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
      isEditMode={mode === "edit"}
    >
      <form>
        <Flex direction="column" p="2">
          <Flex alignItems="center">
            <Text w="50%">{t("common.name")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="name"
              isReadOnly={mode === "edit"}
            />
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("common.compteParent")}</Text>
            <UISelectFormControl
              formik={form}
              placeholder={t("common.compteParent")}
              fieldName="parentId"
              isDisabled={mode === "edit"}
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
              isDisabled={mode === "edit"}
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
            {form.values.paymentMeans?.map((_, index) => (
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
                  fieldName={`paymentMeans[${index}].code`}
                  placeholder={t("customerAccountModal.payment")}
                  isReadOnly={mode === "edit"}
                />
                {mode !== "edit" && (
                  <Box as="div" px={30}>
                    <DeleteIcon
                      onClick={() => removePaymentMeanHandler(index)}
                      cursor="pointer"
                      color="red.500"
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          {mode !== "edit" && (
            <Button onClick={addPaymentMeanHandler} ml={6}>
              {t("customerAccountModal.add")}
            </Button>
          )}
        </Flex>
      </form>
    </UIModal>
  );
};

export default CustomerAccountModal;
