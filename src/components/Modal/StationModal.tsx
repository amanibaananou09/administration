import { SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { addStations } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import { getListOfCountry } from "common/api/reference-data-api";
import { country } from "common/model";
import { AddStationModalProps } from "common/react-props";
import UIInputFormControl from "components/UI/Form/UIInputFormControl";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import UIModal from "components/UI/Modal/UIModal";
import { useFormik } from "formik";
import useCreators from "hooks/use-creators";
import useFormValidation from "hooks/use-form-validation";
import useHttp from "hooks/use-http";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useAuth } from "store/AuthContext";

const StationModal = ({ onSubmit }: AddStationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const history = useHistory();
  const [country, setCountry] = useState<country[]>([]);
  const { creators } = useCreators();
  const { stationFormValidationSchema } = useFormValidation();
  const { user } = useAuth();
  const { makeRequest: submit } = useHttp(addStation, false);

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
      creatorAccountId: user?.customerAccountId,
      modeAffectation: "",
      cordonneesGps: "",
    },
    validationSchema: stationFormValidationSchema,
    onSubmit: async (values: addStations) => {
      try {
        await submit(user?.customerAccountId, values);
        form.setSubmitting(false);
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while creating a new station");
      }
    },
  });

  const closeModalHandler = () => {
    form.resetForm();
    onClose();
    history.replace("/administration/stations");
  };

  useEffect(() => {
    onOpen();
  }, []);

  const accountSelectOptions =
    creators &&
    creators.map((creator) => (
      <option key={creator.id} value={creator.id}>
        {creator.name}
      </option>
    ));

  return (
    <UIModal
      title={t("addStationModal.header")}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
    >
      <form>
        <UIInputFormControl
          formik={form}
          label={t("stationModal.name")}
          fieldName="name"
        />
        <SimpleGrid columns={2} spacingX={5}>
          <UIInputFormControl
            formik={form}
            label={t("common.address")}
            fieldName="address"
          />
          <UISelectFormControl
            formik={form}
            label={t("common.country")}
            fieldName="countryId"
          >
            {country.map((countryData) => (
              <option key={countryData.id} value={countryData.id}>
                {countryData.name}
              </option>
            ))}
          </UISelectFormControl>
          <UISelectFormControl
            formik={form}
            label={t("common.creatorAccount")}
            fieldName="creatorAccountId"
          >
            {accountSelectOptions}
          </UISelectFormControl>
          <UISelectFormControl
            formik={form}
            label={t("stationManagement.compte")}
            fieldName="customerAccountId"
          >
            {accountSelectOptions}
          </UISelectFormControl>
        </SimpleGrid>

        <Text textColor="teal.500" fontWeight="bold" fontSize="xl" mb="20px">
          {t("stationManagement.controller")}
        </Text>

        <SimpleGrid columns={3} spacingX={5}>
          <UIInputFormControl
            formik={form}
            label={t("stationManagement.controllerId")}
            fieldName="controllerPts.ptsId"
          />
          <UISelectFormControl
            formik={form}
            label={t("stationManagement.typeController")}
            fieldName="controllerPts.controllerType"
          >
            <option value="PTS2">PTS2</option>
          </UISelectFormControl>

          <UIInputFormControl
            formik={form}
            label={t("userInformation.userNameLabel")}
            fieldName="controllerPts.userController.username"
          />
          <UIInputFormControl
            formik={form}
            label={t("common.password")}
            fieldName="controllerPts.userController.password"
            type="password"
          />

          <UIPhoneInputFormControl
            formik={form}
            label={t("userInformation.phoneLabel")}
            fieldName="controllerPts.phone"
          />

          <UIInputFormControl
            formik={form}
            label={t("stationModal.cordonneesGps")}
            fieldName="cordonneesGps"
          />
          <UISelectFormControl
            formik={form}
            label={t("stationModal.labelAffectation")}
            fieldName="modeAffectation"
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
