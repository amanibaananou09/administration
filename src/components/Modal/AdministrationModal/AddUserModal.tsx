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
} from "@chakra-ui/react";
import { MasterUser, RouteParams } from "common/AdminModel";
import { addUser } from "common/api/customerAccount-api";
import { adduserFormValidationSchema } from "common/form-validation";
import { AddUserModalProps, AddUserModalRefType } from "common/react-props";
import { useFormik } from "formik";
import { forwardRef, Ref, useImperativeHandle } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddUserModal = (
  props: AddUserModalProps,
  ref: Ref<AddUserModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<RouteParams>();
  const { t } = useTranslation('administration');
  const form = useFormik<Partial<MasterUser>>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: adduserFormValidationSchema,
    onSubmit: async (values: Partial<MasterUser>) => {
      await addUser(values as MasterUser, id);
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
        <ModalHeader>{t("addUserModal.header")}</ModalHeader>
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
                isInvalid={!!form.errors.phone && !!form.touched.phone}
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
                  type="text"
                  placeholder={t("userInformation.phoneLabel")}
                />
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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
                <Input
                  id="password"
                  name="password"
                  value={form.values.password}
                  onChange={form.handleChange}
                  type="password"
                  placeholder={t("common.password")}
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize="md"
            colorScheme="teal"
            fontWeight="bold"
            w="100%"
            isLoading={form.isSubmitting}
            onClick={() => form.handleSubmit()}
            mr={3}
          >
            {t("common.submit")}
          </Button>
          <Button
            fontSize="md"
            colorScheme="red"
            fontWeight="bold"
            w="100%"
            onClick={closeModal}
          >
            {t("common.cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(AddUserModal);
