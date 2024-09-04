import {
  CustomerAccount,
  CustomerAccountFormValues,
  GeneralStations,
  GeneralUser,
  StationFormValues,
  UserFormValues,
} from "common/AdminModel";
import { Mode } from "common/enums";
import moment from "moment";

/**
 * Customer Account form utils
 */

export const customerAccountInitFormValues: CustomerAccountFormValues = {
  name: "",
  city: "",
  actif: false,
  resaleRight: false,
  cardManager: false,
  exported: false,
  status: "ENABLED",
  confirmPassword: "",
  parentId: "",
  creatorAccountId: "",
  username: "",
  email: "",
  savedEmail: "",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  paymentMethods: [
    {
      code: "",
    },
  ],
  plannedExportDate: moment().format("YYYY-MM-DDTHH:mm"),
};

export const customerAccountToFormValues = (
  customerAccount: CustomerAccount,
): CustomerAccountFormValues => {
  const {
    id,
    name,
    city,
    cardManager,
    creatorAccountId,
    parentId,
    resaleRight,
    exported,
    paymentMethods,
    status,
    actif,
    masterUser,
    plannedExportDate,
  } = customerAccount;

  const { username, firstName, lastName, email, phone } = masterUser;

  return {
    id,
    name,
    city,
    cardManager,
    savedName: name,
    creatorAccountId,
    parentId,
    resaleRight,
    exported,
    status,
    actif,
    username,
    savedUsername: username,
    email,
    savedEmail: email,
    firstName,
    lastName,
    phone,
    paymentMethods,
    plannedExportDate: plannedExportDate ?? moment().format("YYYY-MM-DDTHH:mm"),
  };
};

export const formValuesToCustomerAccount = (
  values: CustomerAccountFormValues,
): CustomerAccount => {
  const {
    id,
    name,
    savedName,
    city,
    cardManager,
    creatorAccountId,
    parentId,
    resaleRight,
    exported,
    username,
    email,
    firstName,
    lastName,
    password,
    phone,
    paymentMethods,
    status,
    actif,
    plannedExportDate,
  } = values;

  return {
    id,
    name: name ?? savedName,
    city,
    cardManager,
    creatorAccountId,
    parentId,
    resaleRight,
    exported,
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
    plannedExportDate: moment().format("YYYY-MM-DDTHH:mm"),
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
    savedUsername: username,
    email,
    savedEmail: email,
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

export const stationInitFormValues: StationFormValues = {
  name: "",
  address: "",
  city: "",
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
  createdDate: "",
  password: "",
  countryId: 0,
  customerAccountId: "",
  savedCustomerAccountId: "",
  cordonneesGps: "",
  modeAffectation: "",
  journal: "",
};

export const stationToFormValues = (
  station: GeneralStations,
): StationFormValues => {
  const {
    id,
    name,
    address,
    city,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    createdDate,
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
    city,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    createdDate,
    password,
    countryId,
    customerAccountId,
    savedCustomerAccountId: customerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  };
};

export const formValuesToStation = (
  values: StationFormValues,
): GeneralStations => {
  const {
    id,
    name,
    address,
    city,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    createdDate,
    password,
    countryId,
    customerAccountId,
    savedCustomerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  } = values;

  return {
    id,
    name,
    address,
    city,
    creatorCustomerAccountName,
    customerAccountName,
    creatorAccountId,
    account,
    controllerType,
    actif,
    controllerPts,
    phone,
    connection,
    createdDate,
    password,
    countryId,
    customerAccountId: customerAccountId ?? savedCustomerAccountId,
    cordonneesGps,
    modeAffectation,
    journal,
  };
};
