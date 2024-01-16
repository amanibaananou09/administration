import {
  CustomerAccount,
  CustomerAccountFormValues,
  GeneralStations,
  GeneralUser,
  stationFormValues,
  UserFormValues,
} from "common/AdminModel";
import { Mode } from "common/enums";

/**
 * Customer Account form utils
 */

export const customerAccountInitFormValues = {
  mode: Mode.CREATE,
  name: "",
  actif: false,
  resaleRight: false,
  status: "ENABLED",
  confirmPassword: "",
  parentId: "",
  creatorAccountId: "",
  username: "",
  originalUsername: "",
  email: "",
  originalEmail: "",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  paymentMethods: [
    {
      code: "",
    },
  ],
};

export const customerAccountToFormValues = (
  customerAccount: CustomerAccount,
): CustomerAccountFormValues => {
  const {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    paymentMethods,
    status,
    actif,
    masterUser,
  } = customerAccount;

  const { username, firstName, lastName, email, phone } = masterUser;

  return {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    status,
    actif,
    username,
    originalUsername: username,
    email,
    originalEmail: email,
    firstName,
    lastName,
    phone,
    paymentMethods,
  };
};

export const formValuesToCustomerAccount = (
  values: CustomerAccountFormValues,
): CustomerAccount => {
  const {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    username,
    email,
    firstName,
    lastName,
    password,
    phone,
    paymentMethods,
    status,
    actif,
  } = values;

  return {
    id,
    name,
    creatorAccountId,
    parentId,
    resaleRight,
    paymentMethods,
    status,
    actif,
    masterUser: {
      username,
      email,
      firstName,
      lastName,
      password,
      phone,
    },
  };
};

export const userInitFormValues = {
  mode: Mode.CREATE,
  username: "",
  firstName: "",
  lastName: "",
  originalUsername: "",
  email: "",
  originalEmail: "",
  password: "",
  confirmPassword: "",
  phone: "",
  changePassword: false,
  sendSms: false,
  actif: false,
  creatorAccountId: "",
  customerAccountId: "",
  subnetMask: "",
  lastConnectionDate: "",
};

export const userToFormValues = (user: GeneralUser): UserFormValues => {
  const {
    id,
    username,
    creatorAccountId,
    customerAccountId,
    firstName,
    lastName,
    email,
    phone,
    sendSms,
    actif,
    changePassword,
    subnetMask,
    lastConnectionDate,
  } = user;

  return {
    id,
    creatorAccountId,
    customerAccountId,
    username,
    originalUsername: username,
    email,
    originalEmail: email,
    firstName,
    lastName,
    phone,
    sendSms,
    actif,
    changePassword,
    subnetMask,
    lastConnectionDate,
  };
};

export const formValuesToUser = (values: UserFormValues): GeneralUser => {
  const {
    id,
    creatorAccountId,
    customerAccountId,
    username,
    email,
    firstName,
    lastName,
    phone,
    password,
    sendSms,
    actif,
    changePassword,
    lastConnectionDate,
  } = values;

  return {
    id,
    username,
    creatorAccountId,
    customerAccountId,
    sendSms,
    changePassword,
    actif,
    email,
    firstName,
    lastName,
    password,
    phone,
    lastConnectionDate,
  };
};

export const stationInitFormValues = {
  mode: Mode.CREATE,
  name: "",
  address: "",
  creatorCustomerAccountName: "",
  customerAccountName: "",
  creatorAccountId: "",
  account: "",
  controllerType: "",
  actif: false,
  controllerPts: {
    ptsId: "",
    phone: "",
    controllerType: "",
    userController: {
      username: "",
      password: "",
    },
  },
  phone: "",
  connection: "",
  dateStatusChange: "",
  password: "",
  countryId: 0,
  customerAccountId: "",
  cordonneesGps: "",
  modeAffectation: "",
  journal: "",
};

export const stationToFormValues = (
  station: GeneralStations,
): stationFormValues => {
  const {
    id,
    name,
    address,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    dateStatusChange,
    password,
    countryId,
    customerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  } = station;

  return {
    id,
    name,
    address,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    dateStatusChange,
    password,
    countryId,
    customerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  };
};

export const formValuesToStation = (
  values: stationFormValues,
): GeneralStations => {
  const {
    id,
    name,
    address,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    dateStatusChange,
    password,
    countryId,
    customerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  } = values;

  return {
    id,
    name,
    address,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    dateStatusChange,
    password,
    countryId,
    customerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  };
};
