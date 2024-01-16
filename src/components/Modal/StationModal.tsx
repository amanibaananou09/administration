import { Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { GeneralStations, stationFormValues } from "common/AdminModel";
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
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import {
  formValuesToStation,
  stationInitFormValues,
  stationToFormValues,
} from "utils/form-utils";
import {
  stationInformation,
  updateStation,
} from "../../common/api/station-api";
import { Mode } from "../../common/enums";

type Params = {
  id: string;
};

const StationModal = ({ onSubmit, mode }: AddStationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const history = useHistory();
  const [country, setCountry] = useState<country[]>([]);
  const { creators } = useCreators();
  const {
    stationFormValidationSchema,
    editStationFormValidationSchema,
  } = useFormValidation();
  const { user } = useAuth();
  const { makeRequest: submit } = useHttp(addStation, false);
  const { makeRequest: fetchDetails, isLoading } = useHttp<GeneralStations>(
    stationInformation,
    false,
  );

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

  const form = useFormik<stationFormValues>({
    initialValues: {
      ...stationInitFormValues,
      customerAccountId: user!!.customerAccountId,
      creatorAccountId: user!!.customerAccountId,
    },
    enableReinitialize: true,
    validationSchema:
      mode === Mode.EDIT || mode === Mode.VIEW
        ? editStationFormValidationSchema
        : stationFormValidationSchema,

    onSubmit: async (values: stationFormValues) => {
      const station = formValuesToStation(values);

      try {
        switch (mode) {
          case Mode.CREATE:
            await submit(user?.customerAccountId, station);
            break;
          case Mode.EDIT:
            await updateStation(user?.customerAccountId, station);
            break;
        }
        closeModalHandler();
        onSubmit();
      } catch (error) {
        console.error("Error while submitting the form");
      }
    },
  });

  useEffect(() => {
    onOpen();

    const fetchStationDetails = async () => {
      try {
        if (mode === Mode.EDIT || (mode === Mode.VIEW && id)) {
          const stationDetails = await fetchDetails(+id);
          // Ensure that account.masterUser is defined before accessing its properties
          const values = stationToFormValues(stationDetails);
          form.setValues(values);
        }
      } catch (error) {
        console.error("Error while fetching account details:", error);
      }
    };

    fetchStationDetails();
  }, [mode, id]);
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
      title={
        mode === Mode.EDIT
          ? t("addStationModal.update")
          : mode === Mode.VIEW
          ? t("addStationModal.view")
          : t("addStationModal.header")
      }
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={() => form.handleSubmit()}
      isSubmitting={form.isSubmitting}
      mode={mode}
    >
      <form>
        <Flex direction="column" p="2">
          <Flex alignItems="center">
            <Text w="50%">{t("stationModal.name")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="name"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.address")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="address"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.country")}</Text>
            <UISelectFormControl
              formik={form}
              placeholder={t("common.country")}
              fieldName="countryId"
              isDisabled={mode === Mode.VIEW}
            >
              {country.map((countryData) => (
                <option key={countryData.id} value={countryData.id}>
                  {countryData.name}
                </option>
              ))}
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.creator")}</Text>
            <UISelectFormControl
              formik={form}
              placeholder={t("common.creator")}
              fieldName="creatorAccountId"
              isDisabled={mode === Mode.EDIT || mode === Mode.VIEW}
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("stationManagement.compte")}</Text>
            <UISelectFormControl
              formik={form}
              placeholder={t("stationManagement.compte")}
              fieldName="customerAccountId"
              isDisabled={mode === Mode.EDIT || mode === Mode.VIEW}
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("stationModal.cordonneesGps")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="cordonneesGps"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("stationModal.labelAffectation")}</Text>

            <UISelectFormControl
              formik={form}
              placeholder={t("stationModal.labelAffectation")}
              fieldName="modeAffectation"
              isDisabled={mode === Mode.VIEW}
            >
              <option value="MANUEL">{t("stationModal.manuel")}</option>
              <option value="AUTOMATIQUE">
                {t("stationModal.automatique")}
              </option>
            </UISelectFormControl>
          </Flex>

          <Divider my={4} />

          <Flex alignItems="center">
            <Text w="50%">{t("stationManagement.controllerId")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="controllerPts.ptsId"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("stationManagement.typeController")}</Text>

            <UISelectFormControl
              formik={form}
              placeholder={t("stationManagement.typeController")}
              fieldName="controllerPts.controllerType"
              isDisabled={mode === Mode.VIEW}
            >
              <option value="PTS2">PTS2</option>
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.userNameLabel")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="controllerPts.userController.username"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>
          {mode == Mode.CREATE && (
            <Flex alignItems="center">
              <Text w="50%">{t("common.password")}</Text>
              <UIInputFormControl
                formik={form}
                fieldName="controllerPts.userController.password"
                type="password"
              />{" "}
            </Flex>
          )}
          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.phoneLabel")}</Text>

            <UIPhoneInputFormControl
              formik={form}
              fieldName="controllerPts.phone"
              isDisabled={mode === Mode.VIEW}
            />
          </Flex>
        </Flex>
      </form>
    </UIModal>
  );
};

export default StationModal;