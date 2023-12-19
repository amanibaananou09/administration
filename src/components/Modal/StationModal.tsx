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
  Select,
} from "@chakra-ui/react";
import {
  CustomerAccount,
  GeneralStations,
  addStations,
} from "common/AdminModel";
import {
  addStation,
  getCustomerAccounts,
} from "common/api/customerAccount-api";
import  stationFormValidation  from "hooks/station-form-validation";
import { AddStationModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import { country } from "common/model";
import {
  getCustomerAccountInformation,
  listOfCreator,
} from "common/api/station-api";
import { getListOfCountry } from "common/api/reference-data-api";

const StationModal = (props: AddStationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("administration");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [country, setCountry] = useState<country[]>([]);
  const [accountName, setAccountName] = useState<string>("");
  const [accounts, setAccounts] = useState<CustomerAccount[]>([]);
  const [creatorsList, setCreatorsList] = useState<any[]>([]);
  const [compteList, setCompteList] = useState<any[]>([]);
  const { stationFormValidationSchema } = stationFormValidation();
  const { user } = useAuth();
  const currentUserAccountId = user?.customerAccountId;
  useEffect(() => {
    const getListOfAccounts = async () => {
      const customerAccounts: CustomerAccount[] = await getCustomerAccounts();
      setAccounts(customerAccounts);

      if (currentUserAccountId) {
        try {
          const accountInformation = await getCustomerAccountInformation(
            currentUserAccountId,
          );
          setAccountName(accountInformation.name);
          form.setFieldValue("customerAccountId", accountInformation.id || "");
        } catch (error) {
          console.error("Error fetching customer account information:", error);
        }
      }
    };

    if (isOpen) {
      getListOfAccounts();
    }
  }, [isOpen, user]);
  useEffect(() => {
    onOpen();
  }, []);
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
  const closeModalHandler = () => {
    form.resetForm();
    onClose();
    history.replace("/administration/stations");
  };
  const form = useFormik<addStations>({
    initialValues: {
      name: "",
      address: "",
      controllerPts: {
        ptsId: "",
        phone: "",
        controllerType: "",
        userController: {
          username: "",
          password: "",
        },
      },
      countryId: 0,
      customerAccountId: 0,
      creatorAccountId: "",
      modeAffectation: "",
      cordonneesGps: "",
    },
    validationSchema: stationFormValidationSchema,
    onSubmit: async (values: addStations) => {
      try {
        form.setSubmitting(true);
  
        const valuesToSend = {
          ...values,
          customerAccountId: Number(user?.customerAccountId),
        };
  
        await addStation(valuesToSend, user?.customerAccountId);
  
        form.setSubmitting(false);
        closeModalHandler();
        props.onSubmit();
      } catch (error) {
        form.setSubmitting(false);
        console.error("Error while adding station:", error);
      }
    },
  });

  const handleSubmit = async () => {
    try {
      form.setSubmitting(true);

      const valuesToSend = {
        ...form.values,
        customerAccountId: Number(user?.customerAccountId),
      };

      await addStation(valuesToSend, user?.customerAccountId);

      form.setSubmitting(false);
      closeModalHandler();
      props.onSubmit();
    } catch (error) {
      form.setSubmitting(false);
      console.error("Error while adding station:", error);
    }
  };
  useEffect(() => {
    const fetchCreatorsList = async () => {
      try {
        const response = await listOfCreator(currentUserAccountId);
        setCreatorsList(response);
        setCompteList(response);
      } catch (error) {
        console.error("Error fetching creators list:", error);
      }
    };

    if (isOpen) {
      fetchCreatorsList();
    }
  }, [isOpen]);

  return (
    <Modal
      motionPreset="slideInBottom"
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={closeModalHandler}
      size="4xl"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="teal.500">
          {t("addStationModal.header")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="24px">
          <form onSubmit={form.handleSubmit}>
            <SimpleGrid columns={3} spacing={4}>
              <FormControl
                isInvalid={!!form.errors.name && !!form.touched.name}
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("stationModal.name")}
                </FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("stationModal.labelname")}
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
                  !!form.errors.creatorAccountId &&
                  !!form.touched.creatorAccountId
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("common.creatorAccount")}
                </FormLabel>
                <Select
                  id="creatorAccountId"
                  name="creatorAccountId"
                  value={form.values.creatorAccountId}
                  onChange={form.handleChange}
                  placeholder={t("stationModal.selectCreator")}
                >
                  {creatorsList.map((creator) => (
                    <option key={creator.id} value={creator.id}>
                      {creator.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {form.errors.creatorAccountId}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb="20px">
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("stationManagement.compte")}
                </FormLabel>
                <Select
                  id="customerAccountId"
                  name="customerAccountId"
                  value={form.values.customerAccountId}
                  onChange={form.handleChange}
                >
                  {compteList.map((compte) => (
                    <option key={compte.id} value={compte.id}>
                      {compte.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.ptsId &&
                  !!form.touched.controllerPts?.ptsId
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("stationManagement.controllerId")}
                </FormLabel>
                <Input
                  id="controllerPts.ptsId"
                  name="controllerPts.ptsId"
                  value={form.values.controllerPts?.ptsId || ""}
                  onChange={form.handleChange}
                  type="text"
                  pattern="[0-9]"
                  maxLength={24}
                  placeholder={t("stationManagement.controllerId")}
                />
                <FormErrorMessage>
                  {form.errors.controllerPts?.ptsId}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.controllerType &&
                  !!form.touched.controllerPts?.controllerType
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("stationManagement.typeController")}
                </FormLabel>
                <Select
                  id="controllerPts.controllerType"
                  name="controllerPts.controllerType"
                  value={form.values.controllerPts?.controllerType}
                  onChange={form.handleChange}
                  placeholder={t("stationModal.selectControllerType")}
                >
                  <option value="PTS2">PTS2</option>
                </Select>
                <FormErrorMessage>
                  {form.errors.controllerPts?.controllerType}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.controllerPts?.phone &&
                  !!form.touched.controllerPts?.phone
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("userInformation.phoneLabel")}
                </FormLabel>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={form.values.controllerPts?.phone}
                  onChange={form.handleChange}
                  placeholder={t("userInformation.phoneLabel")}
                />
                <FormErrorMessage>
                  {form.errors.controllerPts?.phone}
                </FormErrorMessage>
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
              <FormControl
                isInvalid={
                  !!form.errors.cordonneesGps && !!form.touched.cordonneesGps
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("stationModal.cordonneesGps")}
                </FormLabel>
                <Input
                  id="cordonneesGps"
                  name="cordonneesGps"
                  value={form.values.cordonneesGps}
                  onChange={form.handleChange}
                  type="text"
                  placeholder={t("stationModal.cordonneesGpsPlaceholder")}
                />
                <FormErrorMessage>{form.errors.cordonneesGps}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!form.errors.modeAffectation &&
                  !!form.touched.modeAffectation
                }
                mb="20px"
              >
                <FormLabel ms="4px" fontSize="sm" fontWeight="bold">
                  {t("stationModal.labelAffectation")}
                </FormLabel>
                <Select
                  id="modeAffectation"
                  name="modeAffectation"
                  value={form.values.modeAffectation}
                  onChange={form.handleChange}
                  placeholder={t("stationModal.selectModeAffectation")}
                >
                  <option value="MANUEL">{t("stationModal.manuel")}</option>
                  <option value="AUTOMATIQUE">
                    {t("stationModal.automatique")}
                  </option>
                </Select>
                <FormErrorMessage>
                  {form.errors.modeAffectation}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="flex-end">
            <Button
              type="submit"
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

export default StationModal;
