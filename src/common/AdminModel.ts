import { Country } from "common/model";

export interface CustomerAccount {
  index?: number;
  id?: string;
  name: string;
  city: string;
  creatorAccountId: string;
  parentId: string;
  parentName?: string;
  creatorCustomerAccountName?: string;
  resaleRight: boolean;
  cardManager: boolean;
  exported: boolean;
  dateStatusChange?: string;
  stations?: number;
  stationsCount?: number;
  status: string;
  actif?: boolean;
  masterUser: MasterUser;
  creatorUser?: GeneralUser;
  paymentMethods?: PaymentMethod[];
}

export interface CustomerAccountCreteria {
  page: number;
  size: number;
}

export interface PaymentMethod {
  code: string;
  customerAccountId?: string;
}

export interface MasterUser {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password?: string;
  role?: string;
}

export interface GeneralUser {
  index?: number;
  id?: number;
  actif?: boolean;
  dateStatusChange?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  phone: string;
  changePassword?: boolean;
  sendSms?: boolean;
  subnetMask?: string;
  customerAccountId: string;
  creatorAccountId: string;
  lastConnectionDate: string;
  creatorCustomerAccountName?: string;
  customerAccountName?: string;
}

export interface GeneralUserCreteria {
  page: number;
  size: number;
}

export interface userScope {
  id: number;
  scope: string;
  code: string;
  description: string;
}

export interface Account {
  name: string;
  status: string;
  dateStatusChange: string;
  description: string;
}

export interface ControllerPts {
  ptsId: string;
  phone?: string;
  controllerType?: string;
  userController: UserController;
}

export interface UserController {
  [x: string]: string;

  username: string;
  password: string;
}

export interface GeneralStations {
  index?: number;
  id?: string;
  name: string;
  address: string;
  city: string;
  creatorCustomerAccountName: string;
  customerAccountName: string;
  creatorAccountId: string;
  account: string;
  controllerType: string;
  actif: boolean;
  controllerPts: ControllerPts;
  phone: string;
  connection: string;
  dateStatusChange: string;
  password: string;
  countryId: number;
  customerAccountId: string;
  cordonneesGps: string;
  modeAffectation: string;
  country?: Country;
  journal: string;
}

export interface GeneralStationCreteria {
  page: number;
  size: number;
}

export interface addStations {
  name: string;
  address: string;
  controllerPts: ControllerPts;
  countryId: number;
  customerAccountId?: string;
  creatorAccountId?: string;
  modeAffectation: string;
  cordonneesGps: string;
}

export interface CustomerAccountFormValues {
  id?: string;
  name: string;
  city: string;
  savedName?: string;
  parentId: string;
  creatorAccountId: string;
  resaleRight: boolean;
  cardManager: boolean;
  exported: boolean;
  status: string;
  actif?: boolean;
  username: string;
  savedUsername?: string;
  email: string;
  savedEmail: string;
  firstName: string;
  lastName: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  paymentMethods?: PaymentMethod[];
}

export interface UserFormValues {
  id?: number;
  username: string;
  savedUsername?: string;
  firstName: string;
  lastName: string;
  email: string;
  savedEmail?: string;
  password?: string;
  phone: string;
  changePassword?: boolean;
  sendSms?: boolean;
  actif?: boolean;
  creatorAccountId: string;
  customerAccountId: string;
  subnetMask?: string;
  lastConnectionDate: string;
}

export interface StationFormValues {
  id?: string;
  name: string;
  address: string;
  city: string;
  creatorCustomerAccountName: string;
  customerAccountName: string;
  creatorAccountId: string;
  account: string;
  controllerType: string;
  actif: boolean;
  controllerPts: ControllerPts;
  phone: string;
  connection: string;
  dateStatusChange: string;
  password: string;
  countryId: number;
  customerAccountId: string;
  savedCustomerAccountId: string;
  cordonneesGps: string;
  modeAffectation: string;
  country?: Country;
  journal: string;
}
