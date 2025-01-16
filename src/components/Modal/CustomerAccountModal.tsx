import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { CustomerAccountFormValues } from "common/AdminModel";
import { Mode } from "common/enums";
import { CustomerAccountModalProps } from "common/react-props";
import { CustomerAccountSkeletonForm } from "components/Skeleton/Skeletons";
import UIArrayFormControl from "components/UI/Form/UIArrayFormControl";
import UICheckBoxFormControl from "components/UI/Form/UICheckBoxFormControl";
import UIInputFormControl from "components/UI/Form/UIInputFormControl";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import useCreators from "hooks/use-creators";
import {
  useCustomerAccountById,
  useCustomerAccountQueries,
} from "hooks/use-customer-account";
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
import moment from "moment";

type Params = {
  id: string;
};

const CustomerAccountModal = ({
  onSubmit,
  mode,
}: CustomerAccountModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<Params>();

  const { user } = useAuth();
  const { creators } = useCreators();
  const { customerAccount, isLoading } = useCustomerAccountById(+id);
  const { create, update } = useCustomerAccountQueries();

  const validator = useValidators();

  const isCreateMode = mode === Mode.CREATE;
  const isViewMode = mode === Mode.VIEW;
  const isEditMode = mode === Mode.EDIT;

  const form = useForm<CustomerAccountFormValues>({
    mode: "all",
    values: customerAccount
      ? customerAccountToFormValues(customerAccount)
      : {
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
        const customerAccountPayload = formValuesToCustomerAccount(values);
        switch (mode) {
          case Mode.CREATE:
            customerAccountPayload.scheduledDate = moment().format(
              "YYYY-MM-DDTHH:mm:ss",
            );
            await create(customerAccountPayload);
            break;
          case Mode.EDIT:
            customerAccountPayload.scheduledDate = moment().format(
              "YYYY-MM-DDTHH:mm:ss",
            );

            await update(customerAccountPayload);
            break;
        }
        closeModalHandler();
        onSubmit();
      } catch (error) {}
    } else if (isViewMode) {
      history.push(`/administration/customer-accounts/edit/${id}`);
    }
  };

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/customer-accounts");
  };

  useEffect(() => {
    onOpen();
  }, []);

  const name = form.watch("name");
  const cardManager = form.watch("cardManager");
  const resaleRight = form.watch("resaleRight");

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
    creators
      .filter((creator) => creator.resaleRight)
      .map((accountData) => (
        <option key={accountData.id} value={accountData.id}>
          {accountData.name}
        </option>
      ));
  const initialCardManager = customerAccount
    ? customerAccount.cardManager
    : false;
  const plannedExportDate = customerAccount?.plannedExportDate;
  // Function to check if the plannedExportDate is in the past
  const isPlannedExportDateDisabled = () => {
    if (plannedExportDate!! < moment().format("YYYY-MM-DDTHH:mm")) {
      return true;
    } else {
      return false;
    }
  };

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
              label={t("common.customerIdentifier")}
              name="identifier"
              control={form.control}
              disabled={isViewMode || isEditMode}
              maxLength={40}
              rules={{ validate: validator.identifierValidator }}
            />
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
              label={t("common.creatorAccount")}
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
            <UIInputFormControl
              label={t("common.city")}
              name="city"
              control={form.control}
              disabled={isViewMode}
              rules={{ validate: validator.cityValidator }}
            />
            <Divider my={4} />
            <UIInputFormControl
              label={t("common.MasterUserIdentifier")}
              name="userIdentifier"
              control={form.control}
              disabled={isViewMode || isEditMode}
              maxLength={40}
              rules={{ validate: validator.identifierValidator }}
            />
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
                    return await validator.loginValidator(value);
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
          {resaleRight && (
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
                            rules={{
                              validate: validator.paymentMethodValidator,
                            }}
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
          )}

          <Flex direction="column">
            <Text fontWeight="bold" fontSize="lg" mb={3} color="teal.500">
              {t("common.moduleAccess")}
            </Text>
            <UICheckBoxFormControl
              label={t("common.cardManager")}
              name="cardManager"
              control={form.control}
              disabled={
                isViewMode || (!isCreateMode && isPlannedExportDateDisabled())
              }
            />
            {!isCreateMode && isPlannedExportDateDisabled() && (
              <Text color="red.500" mt={2}>
                {t("customerAccountModal.activationDatePassedMessage")}
              </Text>
            )}
          </Flex>
          {cardManager && (
            <UIInputFormControl
              control={form.control}
              type="datetime-local"
              label={t("customerAccountModal.date")}
              name="plannedExportDate"
              disabled={
                isViewMode || (!isCreateMode && isPlannedExportDateDisabled())
              }
              rules={{ validate: validator.plannedExportDateValidator }}
            />
          )}
        </form>
      )}
      {isLoading && <CustomerAccountSkeletonForm />}
    </UIModal>
  );
};

export default CustomerAccountModal;
