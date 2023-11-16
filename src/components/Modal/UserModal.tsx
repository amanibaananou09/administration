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
import { GeneralUser, UserModalRefType } from "common/AdminModel";
import { addUser } from "common/api/general-user-api";
import { userFormValidationSchema } from "common/form-validation";
import { useFormik } from "formik";
import { forwardRef, Ref, useImperativeHandle } from "react";

interface PropsType {}

interface FormValues extends GeneralUser {
  confirmPassword: string;
}

const UserModal = (props: PropsType, ref: Ref<UserModalRefType>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useFormik<Partial<FormValues>>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values: Partial<FormValues>) => {
      await addUser(values as GeneralUser);
      form.setSubmitting(false);
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
                isInvalid={!!form.errors.firstName && !!form.touched.firstName}
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
                isInvalid={!!form.errors.lastName && !!form.touched.lastName}
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
                isInvalid={!!form.errors.username && !!form.touched.username}
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
                isInvalid={!!form.errors.email && !!form.touched.email}
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
                isInvalid={!!form.errors.password && !!form.touched.password}
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
                  !!form.errors.confirmPassword &&
                  !!form.touched.confirmPassword
                }
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.values.confirmPassword}
                  onChange={form.handleChange}
                  type="password"
                  placeholder="Confirm Password"
                />
                <FormErrorMessage>
                  {form.errors.confirmPassword}
                </FormErrorMessage>
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
