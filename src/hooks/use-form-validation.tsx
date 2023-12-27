import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormValidation = () => {
  const { t } = useTranslation();

  const username = Yup.string()
    .min(4, t("validation.username.min"))
    .required(t("validation.username.required"));

  const firstName = Yup.string()
    .min(4, t("validation.firstName.min"))
    .required(t("validation.firstName.required"));

  const lastName = Yup.string()
    .min(4, t("validation.lastName.min"))
    .required(t("validation.lastName.required"));

  const name = Yup.string()
    .min(4, t("validation.name.min"))
    .required(t("validation.name.required"));

  const email = Yup.string()
    .email(t("validation.email.invalid"))
    .required(t("validation.email.required"));

  const password = Yup.string()
    .min(6, t("validation.password.min"))
    .matches(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      t("validation.password.matches"),
    )
    .required(t("validation.password.required"));

  const confirmPassword = Yup.string()
    .oneOf([Yup.ref("password")], t("validation.confirmPassword.match"))
    .required(t("validation.confirmPassword.required"));

  const phone = Yup.string()
    .required(t("validation.phone.required"))
    .min(10, t("validation.phone.min"));

  const parentAccount = Yup.string().required(
    t("validation.parentId.required"),
  );

  const creatorAccountId = Yup.string().required(
    t("validation.creatorAccountId.required"),
  );
  const address = Yup.string()
    .min(4, t("validation.address.min"))
    .required(t("validation.address.required"));
  const ptsId = Yup.string()
    .matches(/^[a-zA-Z0-9]{24}$/, t("validation.controllerPtsId.matches"))
    .required(t("validation.controllerPtsId.required"));
  const countryId = Yup.number()
    .required(t("validation.countryId.required"))
    .positive(t("validation.countryId.positive"));
  const subnetMask = Yup.string().required(t("validation.subnetMask.required"));
  const modeAffectation = Yup.string().required(
    t("validation.modeAffectation.required"),
  );
  const controllerType = Yup.string().required(
    t("validation.controllerType.required"),
  );
  const cordonneesGps = Yup.string().required(
    t("validation.cordonneesGps.required"),
  );
  const userFormValidationSchema = Yup.object().shape({
    username,
    email,
    password,
    confirmPassword,
    phone,
    creatorAccountId,
    customerAccountId: parentAccount,
    subnetMask,
  });

  const customerAccountValidationSchema = Yup.object().shape({
    name,
    parentId: parentAccount,
    creatorAccountId,
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("masterUser.password")],
        t("validation.confirmPassword.match"),
      )
      .required(t("validation.confirmPassword.required")),
    masterUser: Yup.object({
      username,
      email,
      firstName,
      lastName,
      phone,
      password,
    }),
  });
  const stationFormValidationSchema = Yup.object().shape({
    name,
    address,
    controllerPts: Yup.object().shape({
      ptsId,
      phone,
      controllerType,
      userController: Yup.object().shape({
        username,
        password,
      }),
    }),
    creatorAccountId,
    countryId,
    customerAccountId: parentAccount,
    modeAffectation,
    cordonneesGps,
  });

  const signInFormValidationSchema = Yup.object().shape({
    username: Yup.string().required(t("validation.username.required")),
    password: Yup.string().required(t("validation.password.required")),
  });

  return {
    userFormValidationSchema,
    customerAccountValidationSchema,
    stationFormValidationSchema,
    signInFormValidationSchema,
  };
};

export default useFormValidation;
