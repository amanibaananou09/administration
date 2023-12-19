import {country} from 'common/model';
export interface CustomerAccount {
  id?: number;
  name: string;
  creatorAccountId?: string;
  parentId?: string;
  parentName?: string;
  creatorCustomerAccountName?: string;
  resaleRight: boolean;
  stations?: number;
  stationsCount?: number;
  status?: string;
  actif?: boolean;
  masterUser: MasterUser;
  creatorUser?: GeneralUser;
}

export interface MasterUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  password: string;
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
  password: string;
  role?: string;
  phone: string;
  changePassword?: boolean;
  sendSms?: boolean;
  subnetMask?: string;
  customerAccountId?: string;
  creatorAccountId?: string;
  lastVisit?: string;
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
  creatorCustomerAccountName:string;
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
  country: country ;
}

export interface addStations {
  name: string;
  address: string;
  controllerPts: ControllerPts;
  countryId: number;
  customerAccountId: number;
  creatorAccountId: string;
  modeAffectation: string;
  cordonneesGps: string;
}
