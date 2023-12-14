export interface CustomerAccount {
  id?: number | string;
  name: string;
  creatorUserId?: string;
  parentId: string;
  parentName?: string;
  resaleRight: string;
  stations?: number;
  stationsCount?: number;
  status?: string;
  actif?: string;
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
  id?: number | string;
  actif?: string;
  dateStatusChange?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  phone: string;
  changePassword?: string;
  sendSms?: string;
  subnetMask?: string;
  customerAccountId?: string;
  creatorAccountId?: string;
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
  userController: UserController;
}

export interface UserController {
  username: string;
  password: string;
}

export interface AddStation {
  name: string;
  address: string;
  controllerPts: ControllerPts;
  countryId: number;
  customerAccountId: number;
}

export interface RouteParams {
  id: string;
}
