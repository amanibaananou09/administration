import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { addStations } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import useFormValidation from "hooks/use-form-validation";
import { AddStationModalProps } from "common/react-props";
import { PhoneInput } from "components/Input/PhoneInput";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import { country } from "common/model";
import { listOfCreator } from "common/api/station-api";
import { getListOfCountry } from "common/api/reference-data-api";
import UIModal from "components/UI/Modal/UIModal";
import UIInputFormControl from "components/UI/Form/UIInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";

const StationModal = (props: AddStationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("administration");
  const history = useHistory();
  const [country, setCountry] = useState<country[]>([]);
  const [creatorsList, setCreatorsList] = useState<any[]>([]);
  const [compteList, setCompteList] = useState<any[]>([]);
  const { stationFormValidationSchema } = useFormValidation();

  const { user } = useAuth();
  const currentUserAccountId = user?.customerAccountId;

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
      customerAccountId: user?.customerAccountId,
      creatorAccountId: user?.creatorAccountId,
      modeAffectation: "",
      cordonneesGps: "",
    },
    validationSchema: stationFormValidationSchema,
    onSubmit: async (values: addStations) => {
      await addStation({ ...values }, user?.customerAccountId);
      form.setSubmitting(false);
      closeModalHandler();
      props.onSubmit();
    },
  });

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
  const handleControllerIdChange = (event: {
    target: { value: string | any[] };
  }) => {
    const newValue = event.target.value.slice(0, 24);
    form.handleChange({
      target: {
        name: "controllerPts.ptsId",
        value: newValue,
      },
    });
  };

  const closeModalHandler = () => {
    form.resetForm();
    onClose();
    history.replace("/administration/stations");
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <UIModal
      title={t("addStationModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <SimpleGrid columns={3} spacingX={8}>
          <UIInputFormControl
            isInvalid={!!form.errors.name && !!form.touched.name}
            label={t("stationModal.name")}
            fieldName="name"
            value={form.values.name}
            onChange={form.handleChange}
            errorMessage={form.errors.name}
          />
          <UIInputFormControl
            isInvalid={!!form.errors.address && !!form.touched.address}
            label={t("common.address")}
            fieldName="address"
            value={form.values.address}
            onChange={form.handleChange}
            errorMessage={form.errors.address}
          />
          <UISelectFormControl
            isInvalid={!!form.errors.countryId && !!form.touched.countryId}
            label={t("common.country")}
            fieldName="countryId"
            value={form.values.countryId}
            onChange={form.handleChange}
            errorMessage={form.errors.countryId}
          >
            {country.map((countryData) => (
              <option key={countryData.id} value={countryData.id}>
                {countryData.name}
              </option>
            ))}
          </UISelectFormControl>
          <UISelectFormControl
            isInvalid={
              !!form.errors.creatorAccountId && !!form.touched.creatorAccountId
            }
            label={t("common.creatorAccount")}
            fieldName="creatorAccountId"
            value={form.values.creatorAccountId}
            onChange={form.handleChange}
            errorMessage={form.errors.creatorAccountId}
          >
            {creatorsList.map((creator) => (
              <option key={creator.id} value={creator.id}>
                {creator.name}
              </option>
            ))}
          </UISelectFormControl>
          <UISelectFormControl
            isInvalid={
              !!form.errors.customerAccountId &&
              !!form.touched.customerAccountId
            }
            label={t("stationManagement.compte")}
            fieldName="customerAccountId"
            value={form.values.customerAccountId}
            onChange={form.handleChange}
            errorMessage={form.errors.customerAccountId}
          >
            {compteList.map((compte) => (
              <option key={compte.id} value={compte.id}>
                {compte.name}
              </option>
            ))}
          </UISelectFormControl>

          <UIInputFormControl
            isInvalid={
              !!form.errors.controllerPts?.ptsId &&
              !!form.touched.controllerPts?.ptsId
            }
            label={t("stationManagement.controllerId")}
            fieldName="controllerPts.ptsId"
            value={form.values.controllerPts?.ptsId || ""}
            onChange={handleControllerIdChange}
            errorMessage={form.errors.controllerPts?.ptsId}
          />
          <UISelectFormControl
            isInvalid={
              !!form.errors.controllerPts?.controllerType &&
              !!form.touched.controllerPts?.controllerType
            }
            label={t("stationManagement.typeController")}
            fieldName="controllerPts.controllerType"
            value={form.values.controllerPts?.controllerType}
            onChange={form.handleChange}
            errorMessage={form.errors.controllerPts?.controllerType}
          >
            <option value="PTS2">PTS2</option>
          </UISelectFormControl>
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
              id="controllerPts.phone"
              name="controllerPts.phone"
              value={form.values.controllerPts?.phone}
              onChange={form.handleChange}
              placeholder={t("userInformation.phoneLabel")}
            />
            <FormErrorMessage>
              {" "}
              {form.errors.controllerPts?.phone}
            </FormErrorMessage>
          </FormControl>
          <UIInputFormControl
            isInvalid={
              !!form.errors.controllerPts?.userController?.username &&
              !!form.touched.controllerPts?.userController?.username
            }
            label={t("userInformation.userNameLabel")}
            fieldName="controllerPts.userController.username"
            value={form.values.controllerPts?.userController?.username || ""}
            onChange={form.handleChange}
            errorMessage={form.errors.controllerPts?.userController?.username}
          />
          <UIInputFormControl
            isInvalid={
              !!form.errors.controllerPts?.userController?.password &&
              !!form.touched.controllerPts?.userController?.password
            }
            label={t("common.password")}
            fieldName="controllerPts.userController.password"
            type="password"
            value={form.values.controllerPts?.userController?.password || ""}
            onChange={form.handleChange}
            errorMessage={form.errors.controllerPts?.userController?.password}
          />
          <UIInputFormControl
            isInvalid={
              !!form.errors.cordonneesGps && !!form.touched.cordonneesGps
            }
            label={t("stationModal.cordonneesGps")}
            fieldName="cordonneesGps"
            value={form.values.cordonneesGps}
            onChange={form.handleChange}
            errorMessage={form.errors.cordonneesGps}
          />
          <UISelectFormControl
            isInvalid={
              !!form.errors.modeAffectation && !!form.touched.modeAffectation
            }
            label={t("stationModal.labelAffectation")}
            fieldName="modeAffectation"
            value={form.values.modeAffectation}
            onChange={form.handleChange}
            errorMessage={form.errors.modeAffectation}
          >
            <option value="MANUEL">{t("stationModal.manuel")}</option>
            <option value="AUTOMATIQUE">{t("stationModal.automatique")}</option>
          </UISelectFormControl>
        </SimpleGrid>
      </form>
    </UIModal>
  );
};

export default StationModal;
