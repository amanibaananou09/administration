export interface CustAccount {
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

export interface AccountModalProps {
  onSubmit: (values: CustAccount) => void;
  account: CustAccount | null;
  onClose: () => void;
}

export interface CustomAccountModalRefType {
  open: (account?: CustAccount) => void;
  close: () => void;
}

export interface UserModalRefType {
  open: () => void;
}

export interface GeneralUser {
  id: number;
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

export interface Accounts {
  name: string;
  status: string;
  dateStatusChange: string;
  description: string;
}

export interface AddStation {
  name: string;
  address: string;
  controllerPts: ControllerPts;
  country: number;
  customerAccountId: number;
}

export interface ControllerPts {
  ptsId: string;
}

export interface RouteParams {
  id: string;
}
