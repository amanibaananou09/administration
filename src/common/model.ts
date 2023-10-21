import React, { ReactNode } from "react";

export interface Station {
  id: number;
  name: string;
  address: string;
  controllerId: number;
  controllerPtsId: string;
  firmwareInformations: any;
  controllerPts: any;
  countryId: any;
}

export interface Transaction {
  id: string;
  pump: string;
  fuelGradeName: string;
  volume: number;
  price: number;
  amount: number;
  totalVolume: number;
  totalAmount: number;
  dateTimeStart: string;
}

export interface TankDeliveryProps {
  tank: string;
  fuelGradeName: string;
  productHeight: number;
  waterHeight: number;
  temperature: number;
  productVolume: number;
}

export interface Tank {
  idConf: string;
}

export interface CustomCardProps {
  title: string;
  avatar?: string;
  description?: string;
  onClick: (title: string) => void;
}

export interface Filter {
  type: string;
  fuelGrade: string;
  pump: string;
  tank: string;
  period: string;
  chartType: string;
}

export interface ReportSalesChartMenuProps {
  filter: Filter;
  onChange: (newFilter: Filter) => void;
}

export interface TankChartMenuProps {
  tanks: Array<{ idConf: string | number | null }>;
  selectedTank: string | null;
  onChange: (idConf: string | number | null) => void;
}

export interface ChartData {
  labels: any;
  datasets: {
    name: string;
    data: number[];
    backgroundColor: string;
    borderWidth?: number;
  }[];
}

export interface TablesTableRowProps {
  pump: string;
  fuelGrade: string;
  volume: number;
  price: number;
  amount: number;
  dateTimeStart: string;
}

export interface ConfiguratorProps {
  secondary: any;
  isOpen: boolean;
  onClose: () => void;
  isChecked: boolean;
  onSwitch: (isChecked: boolean) => void;
}

export interface FixedPluginProps {
  secondary: any;
  fixed: any;
  onOpen: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export interface ConfirmationModalProps {
  message: string;
  onConfirm: (station: any) => void;
}

export interface StationModalProps {
  onSubmit: (values: Station) => void;
  station: Station | null;
  onClose: () => void;
  ref?: React.Ref<any>;
}

export interface AdminNavbarProps {
  logoText?: string;
  variant?: undefined;
  children?: undefined;
  fixed: boolean;
  secondary?: boolean;
  brandText?: string;
  onOpen: () => void;
  scrolled?: boolean;
}

export interface AuthNavbarProps {
  logo?: any;
  logoText?: string;
  secondary?: any;
}

export interface RenderTrackProps {
  style: React.CSSProperties;
  [key: string]: any;
}

export interface RenderThumbProps {
  style: React.CSSProperties;
  [key: string]: any;
}

export interface SidebarProps {
  logo: any;
  routes?: any;
  sidebarVariant?: string;
  colorMode?: string;
  hamburgerColor?: string;
  secondary?: any;
}

export interface Route {
  layout: string;
  path: string;
  name: string;
  publicRoute?: boolean;
  privateRoute?: boolean;
  redirect?: boolean;
  category?: boolean;
  state?: string;
  views?: Route[];
  icon?: string | JSX.Element;
}

export interface DashboardTableRowProps {
  logo: any;
  name: string;
  members: string[];
  budget: string;
  progression: number;
}

export interface InvoicesRowProps {
  date: string;
  code: string;
  price: string;
  format: string;
  logo: any;
}

export interface StationRowProps {
  id: number;
  name: string;
  address: string;
  controllerId: number;
  controllerPtsId: string;
  firmwareInformations: any;
  onEdit: () => void;
  onDelete: () => void;
}

export interface TankDeliveryRowProps {
  tank: string;
  fuelGradeName: string;
  productHeight: number;
  waterHeight: number;
  temperature: number;
  productVolume: number;
}

export interface TransactionRowProps {
  name: string;
  date: string;
  logo: React.ElementType;
  price: string;
}

export interface AuthContextProps {
  token: string | null;
  isSignedIn: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface User {
  id?: string;
  fullName?: string;
  username?: string;
  role?: string;
  token?: string;
  email?: string;
  expireTime?: number;
}

export interface Decode {
  sid: string;
  name: string;
  preferred_username: string;
  realm_access: any;
  email: string;
  exp: number;
}
