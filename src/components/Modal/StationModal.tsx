import {
  Divider,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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
        <Flex direction="column" p="2">
          <Flex alignItems="center">
            <Text w="50%">{t("stationModal.name")}</Text>
            <UIInputFormControl formik={form} fieldName="name" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.address")}</Text>
            <UIInputFormControl formik={form} fieldName="address" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.country")}</Text>
            <UISelectFormControl
              formik={form}
              label=""
              placeholder={t("common.country")}
              fieldName="countryId"
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
              label=""
              placeholder={t("common.creator")}
              fieldName="creatorAccountId"
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("stationManagement.compte")}</Text>
            <UISelectFormControl
              formik={form}
              label=""
              placeholder={t("stationManagement.compte")}
              fieldName="customerAccountId"
            >
              {accountSelectOptions}
            </UISelectFormControl>
          </Flex>
          <Flex alignItems="center">
            <Text w="50%">{t("stationModal.cordonneesGps")}</Text>

            <UIInputFormControl formik={form} fieldName="cordonneesGps" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("stationModal.labelAffectation")}</Text>

            <UISelectFormControl
              formik={form}
              label=""
              placeholder={t("stationModal.labelAffectation")}
              fieldName="modeAffectation"
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
            <UIInputFormControl formik={form} fieldName="controllerPts.ptsId" />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("stationManagement.typeController")}</Text>

            <UISelectFormControl
              formik={form}
              label=""
              placeholder={t("stationManagement.typeController")}
              fieldName="controllerPts.controllerType"
            >
              <option value="PTS2">PTS2</option>
            </UISelectFormControl>
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.userNameLabel")}</Text>

            <UIInputFormControl
              formik={form}
              fieldName="controllerPts.userController.username"
            />
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("common.password")}</Text>
            <UIInputFormControl
              formik={form}
              fieldName="controllerPts.userController.password"
              type="password"
            />{" "}
          </Flex>

          <Flex alignItems="center">
            <Text w="50%">{t("userInformation.phoneLabel")}</Text>

            <UIPhoneInputFormControl
              formik={form}
              label=""
              fieldName="controllerPts.phone"
            />
          </Flex>
        </Flex>
      </form>
    </UIModal>
  );
};

export default StationModal;
