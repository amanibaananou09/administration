import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { CustomerAccount, CustomerAccountFormValues } from "common/AdminModel";
import {
  createCustomerAccount,
  getCustomerAccountDetails,
  updateAccount,
} from "common/api/customerAccount-api";
import { Mode } from "common/enums";
import { CustomerAccountModalProps } from "common/react-props";
import { CustomerAccountSkeletonForm } from "components/Skeleton/Skeletons";
import UIArrayFormControl from "components/UI/Form/UIArrayFormControl";
import UICheckBoxFormControl from "components/UI/Form/UICheckBoxFormControl";
import UIInputFormControl from "components/UI/Form/UIInputFormControl";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import useCreators from "hooks/use-creators";
import useHttp from "hooks/use-http";
import useValidators from "hooks/use-validators";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import {
  customerAccountInitFormValues,
  customerAccountToFormValues,
  formValuesToCustomerAccount,
} from "utils/form-utils";
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
  const { user } = useAuth();

  const { makeRequest: submit } = useHttp(createCustomerAccount, false);
  const { makeRequest: fetchDetails, isLoading } = useHttp<CustomerAccount>(
    getCustomerAccountDetails,
    false,
  );
  const { makeRequest: update } = useHttp(updateAccount, false);

  const isCreateMode = mode === Mode.CREATE;
  const isViewMode = mode === Mode.VIEW;
  const isEditMode = mode === Mode.EDIT;

  const validator = useValidators();

  const form = useForm<CustomerAccountFormValues>({
    mode: "all",
    defaultValues: {
      ...customerAccountInitFormValues,
      parentId: user!!.customerAccountId,
      creatorAccountId: user!!.customerAccountId,
    },
  });

  const submitHandler: SubmitHandler<CustomerAccountFormValues> = async (
    values,
  ) => {
    if (isCreateMode || isEditMode) {
      try {
        const customerAccount = formValuesToCustomerAccount(values);
        switch (mode) {
          case Mode.CREATE:
            await submit(customerAccount);
            break;
          case Mode.EDIT:
            await update(customerAccount);
            break;
        }
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while submitting the form");
      }
    } else if (isViewMode) {
      history.push(`/administration/customer-accounts/edit/${id}`);
    }
  };

  useEffect(() => {
    onOpen();

    const fetchAccountDetails = async () => {
      try {
        if (isEditMode || (isViewMode && id)) {
          const accountDetails = await fetchDetails(+id);
          // Ensure that account.masterUser is defined before accessing its properties
          const values = customerAccountToFormValues(accountDetails);
          form.reset(values);
        }
      } catch (error) {
        console.error("Error while fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [mode, id]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/customer-accounts");
  };

  const name = form.watch("name");
  useEffect(() => {
    if (isCreateMode) {
      form.setValue("username", name.replace(/\s+/g, ""), {
        shouldValidate: true,
      });
    }
  }, [name]);

  let modalTitle = t("customerAccountModal.header");
  if (isEditMode) modalTitle = t("customerAccountModal.update");
  if (isViewMode) modalTitle = t("customerAccountModal.view");

  const accountSelectOptions =
    creators &&
    creators.map((accountData) => (
      <option key={accountData.id} value={accountData.id}>
        {accountData.name}
      </option>
    ));

  return (
    <UIModal
      title={modalTitle}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={form.handleSubmit(submitHandler)}
      isSubmitting={form.formState.isSubmitting}
      mode={mode}
    >
      {!isLoading && (
        <form>
          <Flex direction="column" p="2">
            <UIInputFormControl
              label={t("common.name")}
              name="name"
              control={form.control}
              disabled={isEditMode || isViewMode}
              rules={{ validate: validator.nameValidator }}
            />

            <UISelectFormControl
              label={t("common.compteParent")}
              name="parentId"
              control={form.control}
              disabled={isEditMode || isViewMode}
              rules={{ validate: validator.parentValidator }}
            >
              {accountSelectOptions}
            </UISelectFormControl>

            <UISelectFormControl
              label={t("common.creator")}
              name="creatorAccountId"
              control={form.control}
              disabled={isEditMode || isViewMode}
              rules={{ validate: validator.creatorValidator }}
            >
              {accountSelectOptions}
            </UISelectFormControl>

            <UICheckBoxFormControl
              label={t("common.droits")}
              name="resaleRight"
              control={form.control}
              disabled={isViewMode}
            />

            <Divider my={4} />

            <UIInputFormControl
              label={t("userInformation.userNameLabel")}
              name="username"
              control={form.control}
              disabled={isViewMode}
              rules={{
                validate: async (value) => {
                  if (
                    isCreateMode ||
                    form.getValues("savedUsername") !== value
                  ) {
                    return await validator.usernameValidator(value);
                  }
                },
              }}
            />

            <UIInputFormControl
              label={t("userInformation.emailLabel")}
              name="email"
              control={form.control}
              disabled={isViewMode}
              rules={{
                validate: async (value) => {
                  if (isCreateMode || form.getValues("savedEmail") !== value) {
                    return await validator.emailValidator(value);
                  }
                },
              }}
            />

            <UIInputFormControl
              label={t("userInformation.firstNameLabel")}
              name="firstName"
              control={form.control}
              disabled={isViewMode}
              rules={{ validate: validator.firstNameValidator }}
            />

            <UIInputFormControl
              label={t("userInformation.lastNameLabel")}
              name="lastName"
              control={form.control}
              disabled={isViewMode}
              rules={{ validate: validator.lastNameValidator }}
            />

            {isCreateMode && (
              <UIInputFormControl
                label={t("common.password")}
                name="password"
                type="password"
                control={form.control}
                rules={{
                  validate: validator.passwordValidator,
                  deps: ["confirmPassword"],
                }}
              />
            )}

            {isCreateMode && (
              <UIInputFormControl
                label={t("common.confirmPassword")}
                name="confirmPassword"
                type="password"
                showPasswordBtn={false}
                control={form.control}
                rules={{
                  required: t("validation.confirmPassword.required"),
                  validate: (value) => {
                    if (form.watch("password") != value)
                      return t("validation.confirmPassword.match");
                  },
                }}
              />
            )}

            <UIPhoneInputFormControl
              label={t("userInformation.phoneLabel")}
              control={form.control}
              name="phone"
              disabled={isViewMode}
              rules={{ validate: validator.phoneValidator }}
            />
          </Flex>

          <Divider my={4} />

          <Flex alignItems="center">
            <Text w="34%" fontSize="sm" fontWeight="bold">
              {t("customerAccountModal.paymentMethods")}
            </Text>
            <UIArrayFormControl name="paymentMethods" control={form.control}>
              {(fields, append, remove) => (
                <>
                  <Box as="div" gridColumn="span 2">
                    {fields.map((field, index) => (
                      <Box
                        as="div"
                        key={field.id}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        py={2}
                      >
                        <UIInputFormControl
                          name={`paymentMethods.${index}.code`}
                          control={form.control}
                          placeholder={t("customerAccountModal.payment")}
                          disabled={isViewMode}
                          rules={{ validate: validator.paymentMethodValidator }}
                        />
                        {!isViewMode && (
                          <Box as="div" px={30}>
                            <DeleteIcon
                              onClick={() => remove(index)}
                              cursor="pointer"
                              color="red.500"
                            />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                  {!isViewMode && (
                    <Button
                      onClick={() =>
                        append({
                          code: "",
                        })
                      }
                      ml={6}
                    >
                      {t("customerAccountModal.add")}
                    </Button>
                  )}
                </>
              )}
            </UIArrayFormControl>
          </Flex>
        </form>
      )}
      {isLoading && <CustomerAccountSkeletonForm />}
    </UIModal>
  );
};

export default CustomerAccountModal;
