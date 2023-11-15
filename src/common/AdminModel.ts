export interface CustomerAccountTableRowProps {
  id : number;
  name: string;
  description: string;
  status: boolean;
  masterUser: any;
}

export interface CustAccount {
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
  password: string;
  role: string;
}
export interface ModalRefCustAccount {
  open: (account?: CustAccount) => void;
  close: () => void;
}

export interface AccountModalProps {
  onSubmit: (values: CustAccount) => void;
  station: CustAccount | null;
  onClose: () => void;
  ref?: React.Ref<any>;
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
  address: string;
}

export interface Accounts {
  name: string;
  status: string;
  dateStatusChange: string;
  description: string;

}