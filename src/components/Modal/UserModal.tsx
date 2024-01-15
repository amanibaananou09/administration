import { Checkbox, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { GeneralUser, UserFormValues } from "common/AdminModel";
import {
  addUser,
  updateUser,
  userInformation,
} from "common/api/general-user-api";
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
import { Mode } from "../../common/enums";
import {
  formValuesToUser,
  userInitFormValues,
  userToFormValues,
} from "../../utils/form-utils";
import { useParams } from "react-router-dom";

type Params = {
  id: string;
};

const UserModal = ({ onSubmit, mode }: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const {
    userFormValidationSchema,
    editUserFormValidationSchema,
  } = useFormValidation();
  const { creators } = useCreators();
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const history = useHistory();
  const { makeRequest: submit } = useHttp(addUser, false);
  const { makeRequest: fetchDetails, isLoading } = useHttp<GeneralUser>(
    userInformation,
    false,
  );

  const form = useFormik<UserFormValues>({
    initialValues: {
      ...userInitFormValues,
      customerAccountId: user!!.customerAccountId,
      creatorAccountId: user!!.customerAccountId,
    },
    enableReinitialize: true,
    validationSchema:
      mode === Mode.EDIT || mode === Mode.VIEW
        ? editUserFormValidationSchema
        : userFormValidationSchema,

    onSubmit: async (values: UserFormValues) => {
      const toUser = formValuesToUser(values);

      try {
        switch (mode) {
          case Mode.CREATE:
            await submit(toUser);
            break;
          case Mode.EDIT:
            await updateUser(toUser);
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

    const fetchUserDetails = async () => {
      try {
        if (mode === Mode.EDIT || (mode === Mode.VIEW && id)) {
          const userDetails = await fetchDetails(+id);
          // Ensure that account.masterUser is defined before accessing its properties
          const values = userToFormValues(userDetails);
          form.setValues(values);
        }
      } catch (error) {
        console.error("Error while fetching account details:", error);
      }
    };

    fetchUserDetails();
  }, [mode, id]);

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
      title={
        mode === Mode.EDIT
          ? t("addUserModal.update")
          : mode === Mode.VIEW
          ? t("addUserModal.view")
          : t("addUserModal.header")
      }
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
      isEditMode={mode === Mode.EDIT}
      isConsultMode={mode === Mode.VIEW}
    >
      <form>
        <Flex direction="column" p="2">
          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.userNameLabel")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="username"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.firstNameLabel")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="firstName"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.lastNameLabel")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="lastName"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.emailLabel")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="email"
              isDisabled={mode === Mode.VIEW}
            />
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
            <Text w="50%">{t("common.creatorAccount")}</Text>
            <UISelectFormControl
              formik={form}
              label=""
              fieldName="creatorAccountId"
              isDisabled={mode === Mode.EDIT || mode === Mode.VIEW}
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
              isDisabled={mode === Mode.EDIT || mode === Mode.VIEW}
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.mask")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="subnetMask"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.phoneLabel")}</Text>
            <UIPhoneInputFormControl
              formik={form}
              label=""
              fieldName="phone"
              isDisabled={mode === Mode.VIEW}
            />
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
              isChecked={form.values.changePassword}
              onChange={(e) =>
                form.setFieldValue("changePassword", e.target.checked)
              }
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {t("common.canSendSMS")}
            </Text>
            <Checkbox
              id="sendSms"
              name="sendSms"
              isChecked={form.values.sendSms}
              onChange={(e) => form.setFieldValue("sendSms", e.target.checked)}
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {t("common.isActive")}
            </Text>
            <Checkbox
              id="actif"
              name="actif"
              isChecked={form.values.actif}
              onChange={(e) => form.setFieldValue("actif", e.target.checked)}
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>
        </Flex>
      </form>
    </UIModal>
  );
};

export default UserModal;
