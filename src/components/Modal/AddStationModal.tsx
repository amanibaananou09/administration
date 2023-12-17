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
  Select,
  SimpleGrid,
  useDisclosure,
  InputRightElement,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { AddStation, RouteParams } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import { getListOfCountry } from "common/api/reference-data-api";
import { addStationFormValidationSchema } from "common/form-validation";
import { country } from "common/model";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  AddStationModalProps,
  AddStationModalRefType,
} from "common/react-props";
import { useFormik } from "formik";
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddStationModal = (
  props: AddStationModalProps,
  ref: Ref<AddStationModalRefType>,
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<RouteParams>();
  const [country, setCountry] = useState<country[]>([]);
  const { t } = useTranslation("administration");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useFormik<AddStation>({
    initialValues: {
      name: "",
      address: "",
      controllerPts: {
        ptsId: "",
        userController: {
          username: "",
          password: "",
        },
      },
      countryId: 0,
      customerAccountId: 0,
    },
    validationSchema: addStationFormValidationSchema,
    onSubmit: async (values: AddStation) => {
      values.customerAccountId = id ? Number(id) : 0;
      try {
        await addStation(values, id);
        form.setSubmitting(false);
        onClose();
        props.onSubmit();
      } catch (error) {
        form.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    if (isOpen) {
      form.resetForm();
    }
  }, [isOpen]);
  useEffect(() => {
    const getListCountry = async () => {
      try {
        const result = await getListOfCountry();
        setCountry(result);
      } catch (error) {
        console.error(error);
      }
    };
    getListCountry();
  }, []);

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
        <ModalHeader fontSize="2xl" color="teal.500">
          {t("addStationModal.header")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <form onSubmit={form.handleSubmit}>
            <SimpleGrid columns={2} spacing={5}>
              <FormControl
                isInvalid={!!form.errors.name && !!form.touched.name}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.name")}
                </FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("common.name")}
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!form.errors.address && !!form.touched.address}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.address")}
                </FormLabel>
                <Input
                  id="address"
                  name="address"
                  value={form.values.address}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("common.address")}
                />
                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.ptsId &&
                  !!form.touched.controllerPts?.ptsId
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  ptsId
                </FormLabel>
                <Input
                  id="ptsId"
                  name="controllerPts.ptsId"
                  value={form.values.controllerPts?.ptsId || ""}
                  onChange={form.handleChange}
                  type="text"
                  placeholder="ptsId"
                />
                <FormErrorMessage>
                  {form.errors.controllerPts?.ptsId}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!form.errors.countryId && !!form.touched.countryId}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.country")}
                </FormLabel>
                <Select
                  id="country"
                  name="countryId"
                  value={form.values.countryId}
                  onChange={form.handleChange}
                  placeholder={t("addStationModal.selectCountry")}
                >
                  {country.map((countryData) => (
                    <option key={countryData.id} value={countryData.id}>
                      {countryData.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{form.errors.countryId}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.userController?.username &&
                  !!form.touched.controllerPts?.userController?.username
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.userNameLabel")}
                </FormLabel>
                <Input
                  id="username"
                  name="controllerPts.userController.username"
                  value={
                    form.values.controllerPts?.userController?.username || ""
                  }
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("userInformation.userNameLabel")}
                />
                <FormErrorMessage>
                  {form.errors.controllerPts?.userController?.username}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.userController?.password &&
                  !!form.touched.controllerPts?.userController?.password
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.password")}
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="controllerPts.userController.password"
                    value={
                      form.values.controllerPts?.userController?.password || ""
                    }
                    onChange={form.handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder={t("common.password")}
                    pr="4.5rem"
                  />
                  <InputRightElement width="3.1rem">
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
                <FormErrorMessage>
                  {form.errors.controllerPts?.userController?.password}
                </FormErrorMessage>
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
            mr={3}
            size="lg"
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
            onClick={closeModal}
          >
            {t("common.cancel")}
          </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(AddStationModal);
