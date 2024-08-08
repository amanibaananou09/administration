import { useTranslation } from "react-i18next";
import { isEmailExist, isUsernameExist } from "utils/utils";
import * as Yup from "yup";
import { Schema } from "yup";
import moment from "moment";

const useValidators = () => {
  const { t } = useTranslation();

  /**
   * Yup Schema Validator
   */

  const username = Yup.string()
    .required(t("validation.username.required"))
    .min(3, t("validation.username.min"));
  const login = Yup.string()
    .required(t("validation.login.required"))
    .min(3, t("validation.login.min"));
  const usernameAsync = Yup.string().test(
    "username",
    t("validation.username.exist"),
    async (value) => {
      if (value) {
        const exist = await isUsernameExist(value);
        return !exist;
      }
      return true;
    },
  );
  const loginAsync = Yup.string().test(
    "username",
    t("validation.username.exist"),
    async (value) => {
      if (value) {
        const exist = await isUsernameExist(value);
        return !exist;
      }
      return true;
    },
  );
  const city = Yup.string()
    .required(t("validation.city.required"))
    .min(3, t("validation.city.min"));

  const firstName = Yup.string()
    .required(t("validation.firstName.required"))
    .min(3, t("validation.firstName.min"));

  const lastName = Yup.string()
    .required(t("validation.lastName.required"))
    .min(3, t("validation.lastName.min"));

  const name = Yup.string()
    .required(t("validation.name.required"))
    .min(3, t("validation.name.min"))
    .matches(
      /^[A-ZÉÔÈÀÖÆŒ][\s\S]*[^\s]$/,
      t("validation.name.firstLetterUppercaseOrNoSpaces"),
    );

  const email = Yup.string()
    .required(t("validation.email.required"))
    .email(t("validation.email.invalid"))
    .test("email", t("validation.email.exist"), async (value) => {
      if (value) {
        const exist = await isEmailExist(value);
        return !exist;
      }
      return true;
    });

  const password = Yup.string()
    .required(t("validation.password.required"))
    .min(6, t("validation.password.min"))
    .matches(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      t("validation.password.matches"),
    );

  const confirmPassword = Yup.string()
    .required(t("validation.confirmPassword.required"))
    .oneOf([Yup.ref("password")], t("validation.confirmPassword.match"));

  const phone = Yup.string()
    .required(t("validation.phone.required"))
    .min(10, t("validation.phone.min"));

  const parentAccount = Yup.string().required(
    t("validation.parentId.required"),
  );

  const creatorAccount = Yup.string().required(
    t("validation.creatorAccountId.required"),
  );
  const address = Yup.string()
    .required(t("validation.address.required"))
    .min(4, t("validation.address.min"));

  const ptsId = Yup.string()
    .required(t("validation.controllerPtsId.required"))
    .min(24, t("validation.controllerPtsId.min"))
    .matches(/^[a-zA-Z0-9]{24}$/, t("validation.controllerPtsId.matches"));

  const country = Yup.number()
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
  const plannedExportDate = Yup.date()
    .required(t("validation.plannedExportDate.required"))
    .min(
      moment().format("YYYY-MM-DDTHH:mm"),
      t("validation.plannedExportDate.greaterThan"),
    );
  /**
   * validation function for react form hook
   *
   */

  const validateWithSchema = async (schema: Schema, value: any) => {
    return await schema
      .validate(value)
      .then(() => true)
      .catch((err) => err.message);
  };

  const nameValidator = async (value: string) => {
    return await validateWithSchema(name, value);
  };
  const cityValidator = async (value: string) => {
    return await validateWithSchema(city, value);
  };

  const parentValidator = async (value: string) => {
    return await validateWithSchema(parentAccount, value);
  };

  const creatorValidator = async (value: string) => {
    return await validateWithSchema(creatorAccount, value);
  };

  const usernameValidator = async (value: string) => {
    return await validateWithSchema(username.concat(usernameAsync), value);
  };
  const loginValidator = async (value: string) => {
    return await validateWithSchema(login.concat(loginAsync), value);
  };
  const emailValidator = async (value: string) => {
    return await validateWithSchema(email, value);
  };

  const firstNameValidator = async (value: string) => {
    return await validateWithSchema(firstName, value);
  };

  const lastNameValidator = async (value: string) => {
    return await validateWithSchema(lastName, value);
  };

  const passwordValidator = async (value: string) => {
    return await validateWithSchema(password, value);
  };

  const phoneValidator = async (value: string) => {
    return await validateWithSchema(phone, value);
  };

  const paymentMethodValidator = async (value: string) => {
    return await validateWithSchema(
      Yup.string().required(t("validation.paymentMethod.required")),
      value,
    );
  };

  const addressValidator = async (value: string) => {
    return await validateWithSchema(address, value);
  };

  const countryValidator = async (value: string) => {
    return await validateWithSchema(country, value);
  };

  const cordonneesGpsValidator = async (value: string) => {
    return await validateWithSchema(cordonneesGps, value);
  };

  const modeAffectationValidator = async (value: string) => {
    return await validateWithSchema(modeAffectation, value);
  };

  const ptsIdValidator = async (value: string) => {
    return await validateWithSchema(ptsId, value);
  };

  const controllerTypeValidator = async (value: string) => {
    return await validateWithSchema(controllerType, value);
  };

  const controllerUsernameValidator = async (value: string) => {
    return await validateWithSchema(username, value);
  };
  const plannedExportDateValidator = async (value: Date) => {
    return await validateWithSchema(plannedExportDate, value);
  };
  return {
    nameValidator,
    cityValidator,
    parentValidator,
    creatorValidator,
    usernameValidator,
    loginValidator,
    emailValidator,
    firstNameValidator,
    lastNameValidator,
    passwordValidator,
    phoneValidator,
    paymentMethodValidator,
    addressValidator,
    countryValidator,
    cordonneesGpsValidator,
    modeAffectationValidator,
    ptsIdValidator,
    controllerTypeValidator,
    controllerUsernameValidator,
    plannedExportDateValidator,
  };
};

export default useValidators;
