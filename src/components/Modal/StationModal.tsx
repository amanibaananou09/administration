import { Divider, Flex, useDisclosure } from "@chakra-ui/react";
import { StationFormValues } from "common/AdminModel";
import { AddStationModalProps } from "common/react-props";
import UIInputFormControl from "components/UI/Form/UIInputFormControl";
import UIPhoneInputFormControl from "components/UI/Form/UIPhoneInputFormControl";
import UISelectFormControl from "components/UI/Form/UISelectFormControl";
import UIModal from "components/UI/Modal/UIModal";
import useCountries from "hooks/use-countries";
import useCreators from "hooks/use-creators";
import { useStationById, useStationQueries } from "hooks/use-station";
import useValidators from "hooks/use-validators";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "store/AuthContext";
import {
  formValuesToStation,
  stationInitFormValues,
  stationToFormValues,
} from "utils/form-utils";
import { Mode } from "../../common/enums";

type Params = {
  id: string;
};

const StationModal = ({ onSubmit, mode }: AddStationModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<Params>();

  const validator = useValidators();
  const { user } = useAuth();

  const { countries } = useCountries();
  const { creators } = useCreators();
  const { station } = useStationById(+id);
  const { create, update } = useStationQueries();

  const isCreateMode = mode === Mode.CREATE;
  const isViewMode = mode === Mode.VIEW;
  const isEditMode = mode === Mode.EDIT;

  const form = useForm<StationFormValues>({
    mode: "all",
    values: station
      ? stationToFormValues(station)
      : {
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
            await create(station);
            break;
          case Mode.EDIT:
            await update(station);
            break;
        }
        closeModalHandler();
        onSubmit();
      } catch (error) {}
    } else if (isViewMode) {
      history.push(`/administration/stations/edit/${id}`);
    }
  };

  useEffect(() => {
    onOpen();
  }, []);

  const closeModalHandler = () => {
    onClose();
    history.replace("/administration/stations");
  };

  const accountSelectOptions =
    creators &&
    creators
      .filter((creator) => !creator.resaleRight)
      .map((creator) => (
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

          <UISelectFormControl
            label={t("common.country")}
            name="countryId"
            placeholder={t("common.country")}
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.countryValidator }}
          >
            {countries &&
              countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
          </UISelectFormControl>
          <UIInputFormControl
            label={t("common.city")}
            name="city"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.cityValidator }}
          />

          <UIInputFormControl
            label={t("common.address")}
            name="address"
            control={form.control}
            disabled={isViewMode}
            rules={{ validate: validator.addressValidator }}
          />
          <UIPhoneInputFormControl
            label={t("common.phone")}
            control={form.control}
            name="phone"
            disabled={isViewMode}
            rules={{ validate: validator.phoneValidator }}
          />
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
            disabled={isViewMode}
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
            maxLength={24}
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
