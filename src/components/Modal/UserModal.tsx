import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomerAccount, GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { UserModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import { userFormValidationSchema } from "common/form-validation";
import { getCustomerAccounts } from "../../common/api/customerAccount-api";
import { getCustomerAccountInformation } from "../../common/api/station-api";
import { useAuth } from "../../store/AuthContext";

interface FormValues extends GeneralUser {
  phone: string;
  confirmPassword: string;
}

interface CheckboxValues {
  changePassword: boolean;
  sendSms: boolean;
  actif: boolean;
}

const UserModal = (props: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("administration");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState(false);
  const [sendSms, setSendSms] = useState(false);
  const [actif, setActif] = useState(false);
  const [accounts, setAccounts] = useState<CustomerAccount[]>([]);
  const [accountName, setAccountName] = useState("");
  const token = useAuth();

  const handleCheckboxChange = (checkboxName: keyof CheckboxValues) => {
    switch (checkboxName) {
      case "changePassword":
        setChangePassword(!changePassword);
        break;
      case "sendSms":
        setSendSms(!sendSms);
        break;
      case "actif":
        setActif(!actif);
        break;
      default:
        break;
    }
    form.setFieldValue(
      checkboxName as keyof FormValues,
      !form.values[checkboxName] as boolean,
    );
  };

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    const getListOfAccounts = async () => {
      const result = await getCustomerAccounts();
      setAccounts(result);

      // Get information for the current user's customer account
      const currentUserAccountId = token.user?.customerAccountId;
      if (currentUserAccountId) {
        try {
          const accountInformation = await getCustomerAccountInformation(
            currentUserAccountId,
          );
          if (accountInformation) {
            // Use the information as needed, for example:
            setAccountName(accountInformation.name);
            form.setFieldValue(
              "customerAccountId",
              accountInformation.id || "",
            );
          } else {
            console.error("Customer account information is null");
          }
        } catch (error) {
          console.error("Error fetching customer account information:", error);
        }
      }
    };

    if (isOpen) {
      getListOfAccounts();
    }
  }, [isOpen, token.user]);

  const closeModalHandler = () => {
    form.resetForm();
    onClose();
    history.replace("/administration/users");
  };

  const handleSubmit = async (values: Partial<FormValues>) => {
    try {
      await addUser(values as FormValues);

      form.setSubmitting(false);
      closeModalHandler();

      props.onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
      changePassword: "",
      sendSms: "",
      actif: false,
      creatorAccountId: "",
      customerAccountId: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      await handleSubmit(values);
    },
  });

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={closeModalHandler}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="teal.500">
          {t("addUserModal.header")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <form>
            <SimpleGrid columns={2} spacing={5}>
              <FormControl
                isInvalid={!!form.errors.username && !!form.touched.username}
                mb="0px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.userNameLabel")}
                </FormLabel>
                <Input
                  id="username"
                  name="username"
                  value={form.values.username}
                  onChange={form.handleChange}
                  type="Text"
                  placeholder={t("userInformation.userNameLabel")}
                />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!form.errors.email && !!form.touched.email}
                mb="0px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.emailLabel")}
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  type="Text"
                  placeholder={t("userInformation.emailLabel")}
                />

                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.password && !!form.touched.password}
                mb="0px"
              >
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="bold"
                  width="150px"
                >
                  {t("common.password")}
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    type={showPassword ? "Text" : "password"}
                    placeholder={t("common.password")}
                    pr="4.5rem"
                  />
                  <InputRightElement width="3.2rem">
                    <Button
                      h="100%"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      color="gray.500"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.confirmPassword &&
                  !!form.touched.confirmPassword
                }
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.confirmPassword")}
                </FormLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.values.confirmPassword}
                  onChange={form.handleChange}
                  type="password"
                  placeholder={t("common.confirmPassword")}
                />

                <FormErrorMessage>
                  {form.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.creatorAccountId &&
                  !!form.touched.creatorAccountId
                }
                mb="0px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.creatorAccount")}
                </FormLabel>
                <Select
                  id="creatorAccountId"
                  name="creatorAccountId"
                  value={form.values.creatorAccountId}
                  onChange={form.handleChange}
                  placeholder={t("common.creatorAccount")}
                >
                  {accounts.map((accountData) => (
                    <option key={accountData.id} value={accountData.id}>
                      {accountData.name}
                    </option>
                  ))}
                </Select>

                <FormErrorMessage>
                  {form.errors.creatorAccountId}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb="0px">
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userManagement.globalUsers.account")}
                </FormLabel>
                <Input
                  id="customerAccountId"
                  name="customerAccountId"
                  color="gray.500"
                  value={accountName}
                  onChange={form.handleChange}
                  type="Text"
                  isReadOnly
                  bg="gray.200"
                  placeholder={t("userManagement.globalUsers.account")}
                />
              </FormControl>

              <FormControl mb="0px">
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.mask")}
                </FormLabel>
                <Input
                  id="mask"
                  name="mask"
                  value={form.values.subnetMask}
                  onChange={form.handleChange}
                  type="Text"
                  placeholder={t("userInformation.mask")}
                />
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.phone && !!form.touched.phone}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.phoneLabel")}
                </FormLabel>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={form.values.phone}
                  onChange={form.handleChange}
                  placeholder={t("userInformation.phoneLabel")}
                />
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            <Box mb={10} />
            <SimpleGrid columns={2} spacing={5}>
              <Flex width="100%" flexDirection="column" gap="10%">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm" fontWeight="bold">
                    {t("common.canChangePassword")}
                  </Text>

                  <Checkbox
                    value="changePassword"
                    onChange={() => handleCheckboxChange("changePassword")}
                  />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm" fontWeight="bold">
                    {t("common.canSendSMS")}
                  </Text>

                  <Checkbox
                    value="sendSms"
                    onChange={() => handleCheckboxChange("sendSms")}
                  />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm" fontWeight="bold">
                    {t("common.isActive")}
                  </Text>

                  <Checkbox
                    value="actif"
                    onChange={() => handleCheckboxChange("actif")}
                  />
                </Flex>
              </Flex>
            </SimpleGrid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="flex-end">
            <Button
              type="button"
              fontSize="md"
              colorScheme="teal"
              fontWeight="bold"
              size="lg"
              mr={3}
              isLoading={form.isSubmitting}
              onClick={() => {
                console.log("Form Values:", form.values);
                handleSubmit(form.values);
              }}
            >
              {t("common.submit")}
            </Button>

            <Button
              fontSize="md"
              colorScheme="red"
              fontWeight="bold"
              size="lg"
              onClick={closeModalHandler}
            >
              {t("common.cancel")}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
