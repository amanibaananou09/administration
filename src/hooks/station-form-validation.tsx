import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const stationFormValidation = () => {
    const { t } = useTranslation("administration");
 const stationFormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, t("validation.name.min"))
      .required(t("validation.name.required")),
    address: Yup.string()
      .min(4, t("validation.address.min"))
      .required(t("validation.address.required")),
    controllerPts: Yup.object().shape({
      ptsId: Yup.string()
        .matches(/^[0-9]{24}$/, t("validation.controllerPtsId.matches"))
        .required(t("validation.controllerPtsId.required")),
        phone: Yup.string().min(10, t("validation.phone.min")).nullable(),
        controllerType: Yup.string().required(t("validation.controllerType.required")),
        userController: Yup.object().shape({
        username: Yup.string()
          .min(4, t("validation.username.min"))
          .required(t("validation.username.required")),
        password: Yup.string()
          .min(6, t("validation.password.min"))
          .required(t("validation.password.required")),
      }),
    }),
    creatorAccountId: Yup.number()
      .required(t("validation.creatorAccount.required")),
    countryId: Yup.number()
      .required(t("validation.countryId.required")),
    customerAccountId: Yup.number()
      .required(t("validation.customerAccountId.required")),
    modeAffectation: Yup.string().required(t("validation.modeAffectation.required")),
    cordonneesGps: Yup.string().required(t("validation.cordonneesGps.required")),
  });
  return {
    stationFormValidationSchema,
  };
};
export default stationFormValidation;