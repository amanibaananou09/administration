import {
  Button,
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
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { userFormValidationSchema } from "common/form-validation";
import { UserModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";

interface FormValues extends GeneralUser {
  phone: string;
  confirmPassword: string;
}

const UserModal = (props: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("administration");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    onOpen();
  }, []);

  const closeModalHandler = () => {
    form.resetForm();
    onClose();
    history.replace("/administration/users");
  };

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      await addUser({ ...values } as FormValues);
      form.setSubmitting(false);
      closeModalHandler();
      props.onSubmit();
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
                isInvalid={!!form.errors.firstName && !!form.touched.firstName}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.firstNameLabel")}
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={form.values.firstName}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("userInformation.firstNameLabel")}
                />
                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.lastName && !!form.touched.lastName}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.lastNameLabel")}
                </FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  value={form.values.lastName}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("userInformation.lastNameLabel")}
                />
                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.username && !!form.touched.username}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.userNameLabel")}
                </FormLabel>
                <Input
                  id="username"
                  name="username"
                  value={form.values.username}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("userInformation.userNameLabel")}
                />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.email && !!form.touched.email}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.emailLabel")}
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("userInformation.emailLabel")}
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.password && !!form.touched.password}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.password")}
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    type={showPassword ? "text" : "password"}
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="flex-end">
            <Button
              fontSize="md"
              colorScheme="teal"
              fontWeight="bold"
              size="lg"
              mr={3}
              isLoading={form.isSubmitting}
              onClick={() => form.handleSubmit()}
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
