import { country } from "common/model";

export interface CustomerAccount {
  id?: string;
  name: string;
  creatorAccountId: string;
  parentId: string;
  parentName?: string;
  creatorCustomerAccountName?: string;
  resaleRight: boolean;
  dateStatusChange?: string;
  stations?: number;
  stationsCount?: number;
  status: string;
  actif?: boolean;
  masterUser: MasterUser;
  creatorUser?: GeneralUser;
  paymentMethods?: PaymentMethod[];
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

export interface RouteParams {
  id: string;
}

export interface GeneralStations {
  id?: string;
  name: string;
  address: string;
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
  country?: country;
  journal: string;
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
  parentId: string;
  creatorAccountId: string;
  resaleRight: boolean;
  status: string;
  actif?: boolean;
  username: string;
  originalUsername: string;
  email: string;
  originalEmail: string;
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
  firstName: string;
  lastName: string;
  originalUsername: string;
  email: string;
  originalEmail: string;
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

export interface stationFormValues {
  id?: string;
  name: string;
  address: string;
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
  country?: country;
  journal: string;
}
