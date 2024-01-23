import { Divider, Flex, useDisclosure } from "@chakra-ui/react";
import { GeneralUser, UserFormValues } from "common/AdminModel";
import {
  addUser,
  updateUser,
  userInformation,
} from "common/api/general-user-api";
import { UserModalProps } from "common/react-props";
import { UserSkeletonForm } from "components/Skeleton/Skeletons";
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
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import { Mode } from "../../common/enums";
import {
  formValuesToUser,
  userInitFormValues,
  userToFormValues,
} from "../../utils/form-utils";
import UIModal from "../UI/Modal/UIModal";

type Params = {
  id: string;
};

const UserModal = ({ onSubmit, mode }: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const validator = useValidators();
  const { creators } = useCreators();
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const history = useHistory();

  const { makeRequest: submit } = useHttp(addUser, false);
  const { makeRequest: update } = useHttp(updateUser, false);
  const { makeRequest: fetchDetails, isLoading } = useHttp<GeneralUser>(
    userInformation,
    false,
  );
  const isCreateMode = mode === Mode.CREATE;
  const isViewMode = mode === Mode.VIEW;
  const isEditMode = mode === Mode.EDIT;

  const form = useForm<UserFormValues>({
    mode: "all",
    defaultValues: {
      ...userInitFormValues,
      customerAccountId: user!!.customerAccountId,
      creatorAccountId: user!!.customerAccountId,
    },
  });

  const submitHandler: SubmitHandler<UserFormValues> = async (values) => {
    if (isCreateMode || isEditMode) {
      try {
        const toUser = formValuesToUser(values);
        switch (mode) {
          case Mode.CREATE:
            await submit(toUser);
            break;
          case Mode.EDIT:
            await update(toUser);
            break;
        }
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while submitting the form");
      }
    } else if (isViewMode) {
      history.push(`/administration/users/edit/${id}`);
    }
  };

  useEffect(() => {
    onOpen();

    const fetchUserDetails = async () => {
      try {
        if (isEditMode || (isViewMode && id)) {
          const userDetails = await fetchDetails(+id);
          // Ensure that account.masterUser is defined before accessing its properties
          const values = userToFormValues(userDetails);
          form.reset(values);
        }
      } catch (error) {
        console.error("Error while fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [mode, id]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/users");
  };

  let modalTitle = t("addUserModal.header");
  if (isEditMode) modalTitle = t("addUserModal.update");
  if (isViewMode) modalTitle = t("addUserModal.view");

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

            {isCreateMode && (
              <UIInputFormControl
                label={t("common.password")}
                name="password"
                type="password"
                control={form.control}
                rules={{ validate: validator.passwordValidator }}
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

            <UISelectFormControl
              label={t("common.creatorAccount")}
              name="creatorAccountId"
              control={form.control}
              disabled={isEditMode || isViewMode}
              rules={{ validate: validator.creatorValidator }}
            >
              {accountSelectOptions}
            </UISelectFormControl>

            <UISelectFormControl
              label={t("common.compteParent")}
              name="customerAccountId"
              control={form.control}
              disabled={isEditMode || isViewMode}
              rules={{ validate: validator.parentValidator }}
            >
              {accountSelectOptions}
            </UISelectFormControl>

            <UIInputFormControl
              label={t("userInformation.mask")}
              name="subnetMask"
              control={form.control}
              disabled={isViewMode}
            />

            <UIPhoneInputFormControl
              label={t("userInformation.phoneLabel")}
              control={form.control}
              name="phone"
              disabled={isViewMode}
              rules={{ validate: validator.phoneValidator }}
            />
          </Flex>

          <Divider my={4} />

          <UICheckBoxFormControl
            label={t("common.canChangePassword")}
            control={form.control}
            name="changePassword"
            disabled={isViewMode}
          />

          <UICheckBoxFormControl
            label={t("common.canSendSMS")}
            control={form.control}
            name="sendSms"
            disabled={isViewMode}
          />

          <UICheckBoxFormControl
            label={t("common.isActive")}
            control={form.control}
            name="actif"
            disabled={isViewMode}
          />
        </form>
      )}
      {isLoading && <UserSkeletonForm />}
    </UIModal>
  );
};

export default UserModal;
