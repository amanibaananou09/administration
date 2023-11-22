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
import { GeneralUser } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { userFormValidationSchema } from "common/form-validation";
import { UserModalProps, UserModalRefType } from "common/react-props";
import { useFormik } from "formik";
import { forwardRef, Ref, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";

interface FormValues extends GeneralUser {
  phone: string;
}

const UserModal = (props: UserModalProps, ref: Ref<UserModalRefType>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('administration');

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
        <ModalHeader>Create New User</ModalHeader>
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
                  First Name
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={form.values.firstName}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="First name"
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
                  Last Name
                </FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  value={form.values.lastName}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="Last name"
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
                  User Name
                </FormLabel>
                <Input
                  id="username"
                  name="username"
                  value={form.values.username}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="User Name"
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
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="Email"
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
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  value={form.values.password}
                  onChange={form.handleChange}
                  type="password"
                  placeholder="Password"
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  form.errors.phone && form.touched.phone ? true : undefined
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  Phone
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
                  placeholder="phone"
                />
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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
            Submit
          </Button>
          <Button
            fontSize="md"
            colorScheme="red"
            fontWeight="bold"
            w="100%"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(UserModal);
