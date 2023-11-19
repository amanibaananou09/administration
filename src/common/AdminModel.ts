export interface CustomerAccount {
  id?: number | string;
  name: string;
  description: string;
  status: string;
  masterUser: MasterUser;
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
  id: number | string;
  actif: boolean;
  dateStatusChange: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

export interface userScope {
  id: number;
  scope: string;
  code: string;
  description: string;
}

export interface Accounts {
  name: string;
  status: string;
  dateStatusChange: string;
  description: string;
}

export interface ControllerPts {
  ptsId: string;
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
