import { Divider, Flex, useDisclosure } from "@chakra-ui/react";
import { GeneralStations, StationFormValues } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import { getListOfCountry } from "common/api/reference-data-api";
import { country } from "common/model";
import { AddStationModalProps } from "common/react-props";
import UIInputFormControl from "components/UI/Form/UIInputFormControl";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import UIModal from "components/UI/Modal/UIModal";
import useCreators from "hooks/use-creators";
import useHttp from "hooks/use-http";
import useValidators from "hooks/use-validators";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const history = useHistory();
  const { id } = useParams<Params>();
  const [country, setCountry] = useState<country[]>([]);
  const { creators } = useCreators();
  const { user } = useAuth();
  const validator = useValidators();

  const { makeRequest: submit } = useHttp(addStation, false);
  const { makeRequest: fetchDetails } = useHttp<GeneralStations>(
    stationInformation,
    false,
  );

  const isCreateMode = mode === Mode.CREATE;
  const isViewMode = mode === Mode.VIEW;
  const isEditMode = mode === Mode.EDIT;

  const form = useForm<StationFormValues>({
    mode: "all",
    defaultValues: {
      ...stationInitFormValues,
      customerAccountId: user!!.customerAccountId,
      creatorAccountId: user!!.customerAccountId,
    },
  });

  const submitHandler: SubmitHandler<StationFormValues> = async (values) => {
    if (isCreateMode || isEditMode) {
      try {
        const station = formValuesToStation(values);

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
    } else if (isViewMode) {
      history.push(`/administration/stations/edit/${id}`);
    }
  };

  useEffect(() => {
    onOpen();

    const getListCountry = async () => {
      try {
        const result = await getListOfCountry();
        setCountry(result);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStationDetails = async () => {
      try {
        if (isEditMode || (isViewMode && id)) {
          const stationDetails = await fetchDetails(+id);
          // Ensure that account.masterUser is defined before accessing its properties
          const values = stationToFormValues(stationDetails);
          form.reset(values);
        }
      } catch (error) {
        console.error("Error while fetching stations details:", error);
      }
    };

    getListCountry();
    fetchStationDetails();
  }, [mode, id]);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/stations");
  };

  const accountSelectOptions =
    creators &&
    creators.map((creator) => (
      <option key={creator.id} value={creator.id}>
        {creator.name}
      </option>
    ));

  let modalTitle = t("addStationModal.header");
  if (isEditMode) modalTitle = t("addStationModal.update");
  if (isViewMode) modalTitle = t("addStationModal.view");

  return (
    <UIModal
      title={modalTitle}
      isOpen={isOpen}
      onClose={closeModalHandler}
      onSubmit={form.handleSubmit(submitHandler)}
      isSubmitting={form.formState.isSubmitting}
      mode={mode}
    >
      <form>
        <Flex direction="column" p="2">
          <UIInputFormControl
            label={t("stationModal.name")}
            name="name"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.nameValidator }}
          />

          <UIInputFormControl
            label={t("common.address")}
            name="address"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.addressValidator }}
          />

          <UISelectFormControl
            label={t("common.country")}
            name="countryId"
            placeholder={t("common.country")}
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.countryValidator }}
          >
            {country.map((countryData) => (
              <option key={countryData.id} value={countryData.id}>
                {countryData.name}
              </option>
            ))}
          </UISelectFormControl>

          <UISelectFormControl
            label={t("common.creator")}
            name="creatorAccountId"
            placeholder={t("common.creator")}
            control={form.control}
            disabled={isEditMode || isViewMode}
            rules={{ validate: validator.creatorValidator }}
          >
            {accountSelectOptions}
          </UISelectFormControl>

          <UISelectFormControl
            label={t("stationManagement.compte")}
            name="customerAccountId"
            placeholder={t("stationManagement.compte")}
            control={form.control}
            disabled={isEditMode || isViewMode}
            rules={{ validate: validator.parentValidator }}
          >
            {accountSelectOptions}
          </UISelectFormControl>

          <UIInputFormControl
            label={t("stationModal.cordonneesGps")}
            name="cordonneesGps"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.cordonneesGpsValidator }}
          />

          <UISelectFormControl
            label={t("stationModal.labelAffectation")}
            name="modeAffectation"
            placeholder={t("stationModal.labelAffectation")}
            control={form.control}
            disabled={isEditMode || isViewMode}
            rules={{ validate: validator.modeAffectationValidator }}
          >
            <option value="MANUEL">{t("stationModal.manuel")}</option>
            <option value="AUTOMATIQUE">{t("stationModal.automatique")}</option>
          </UISelectFormControl>

          <Divider my={4} />

          <UIInputFormControl
            label={t("stationManagement.controllerId")}
            name="controllerPts.ptsId"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.ptsIdValidator }}
          />

          <UISelectFormControl
            label={t("stationManagement.typeController")}
            name="controllerPts.controllerType"
            placeholder={t("stationManagement.typeController")}
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.controllerTypeValidator }}
          >
            <option value="PTS2">PTS2</option>
          </UISelectFormControl>

          <UIInputFormControl
            label={t("userInformation.userNameLabel")}
            name="controllerPts.userController.username"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.controllerUsernameValidator }}
          />

          {mode == Mode.CREATE && (
            <UIInputFormControl
              label={t("common.password")}
              name="controllerPts.userController.password"
              type="password"
              control={form.control}
              rules={{ validate: validator.passwordValidator }}
            />
          )}

          <UIPhoneInputFormControl
            label={t("userInformation.phoneLabel")}
            control={form.control}
            name="controllerPts.phone"
            disabled={isViewMode}
            rules={{ validate: validator.phoneValidator }}
          />
        </Flex>
      </form>
    </UIModal>
  );
};

export default StationModal;
