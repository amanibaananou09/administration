import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useFormValidation = () => {
  const { t } = useTranslation("administration");

  const userFormValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, t("validation.username.min"))
      .required(t("validation.username.required")),

    email: Yup.string()
      .email(t("validation.email.invalid"))
      .required(t("validation.email.required")),

    password: Yup.string()
      .min(6, t("validation.password.min"))
      .matches(
        /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
        t("validation.password.matches"),
      )
      .required(t("validation.password.required")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.confirmPassword.match"))
      .required(t("validation.confirmPassword.required")),

    phone: Yup.string()
      .required(t("validation.phone.required"))
      .min(10, t("validation.phone.min")),

    creatorAccountId: Yup.string().required(
      t("validation.creatorAccountId.required"),
    ),

    subnetMask: Yup.string().required(t("validation.subnetMask.required")),
  });

  return {
    userFormValidationSchema,
  };
};

export default useFormValidation;
