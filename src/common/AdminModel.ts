export interface CustomerAccount {
  id?: number;
  name: string;
  creatorUserId?: string;
  parentId: string;
  parentName?: string;
  resaleRight: string;
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
