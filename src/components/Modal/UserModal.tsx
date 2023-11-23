import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { userFormValidationSchema } from "common/form-validation";
import { UserModalProps, UserModalRefType } from "common/react-props";
import { useFormik } from "formik";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormValues extends GeneralUser {
  phone: string;
}

const UserModal = (props: UserModalProps, ref: Ref<UserModalRefType>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("administration");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      await addUser(values as GeneralUser);
      form.setSubmitting(false);
      onClose();
      props.onSubmit();
    },
  });

  useImperativeHandle(ref, () => ({
    open() {
      onOpen();
    },
  }));

  const closeModal = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={closeModal}
      size="2xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="teal.500">{t("addUserModal.header")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <form>
            <SimpleGrid columns={2} spacing={5}>
              <FormControl
                isInvalid={
                  form.errors.firstName && form.touched.firstName
                    ? true
                    : undefined
                }
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
                isInvalid={
                  form.errors.lastName && form.touched.lastName
                    ? true
                    : undefined
                }
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
                isInvalid={
                  form.errors.username && form.touched.username
                    ? true
                    : undefined
                }
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
                isInvalid={
                  form.errors.email && form.touched.email ? true : undefined
                }
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
                isInvalid={
                  form.errors.password && form.touched.password
                    ? true
                    : undefined
                }
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
                  form.errors.phone && form.touched.phone ? true : undefined
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.phoneLabel")}
                </FormLabel>
                <Input
                  id="phone"
                  name="phone"
                  value={form.values.phone}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 8);
                    form.setFieldValue("phone", onlyNumbers);
                  }}
                  type="phone"
                  placeholder={t("userInformation.phoneLabel")}
                />
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize="md"
            colorScheme="red"
            fontWeight="bold"
            w="100%"
            onClick={closeModal}
            mr={3}
          >
            {t("common.cancel")}
          </Button>
          <Button
            fontSize="md"
            colorScheme="teal"
            fontWeight="bold"
            w="100%"
            isLoading={form.isSubmitting}
            onClick={() => form.handleSubmit()}
          >
            {t("common.submit")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(UserModal);
