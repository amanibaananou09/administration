import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormValidation = () => {
  const { t } = useTranslation("administration");

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

  const parentId = Yup.string().required(t("validation.parentId.required"));

  const creatorAccountId = Yup.string().required(
    t("validation.creatorAccountId.required"),
  );

  const subnetMask = Yup.string().required(t("validation.subnetMask.required"));

  const userFormValidationSchema = Yup.object().shape({
    username,
    email,
    password,
    confirmPassword,
    phone,
    creatorAccountId,
    customerAccountId: parentId,
    subnetMask,
  });

  const customerAccountValidationSchema = Yup.object().shape({
    name,
    parentId,
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

  return {
    userFormValidationSchema,
    customerAccountValidationSchema,
  };
};

export default useFormValidation;
