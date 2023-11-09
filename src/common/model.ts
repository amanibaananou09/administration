import React, { ReactNode } from "react";

export interface Station {
  id: number;
  name: string;
  address: string;
  actif: boolean;
  controllerPts: controllerPts;
  country: country;
}

export interface country {
  id: number;
  name: string;
  code: string;
  currency: currency;
}
export interface currency {
  code: string;
  id: number;
  locale: string;
  name: string;
}
export interface controllerPts {
  id: number;
  ptsId: string;
  currentConfigurationId: number;
  currentFirmwareInformation: currentFirmwareInformation;
}

export interface currentFirmwareInformation {
  ptsId: string;
  dateTime: string;
  versionState: boolean;
  modificationDate: string;
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
  fuelGrade: string;
  pump: string;
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
  labels: string[];
  datasets: {
    name: string;
    data: number[];
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
  secondary: boolean;
  isOpen: boolean;
  onClose: () => void;
  isChecked: boolean;
  onSwitch: (isChecked: boolean) => void;
}

export interface FixedPluginProps {
  secondary: boolean;
  fixed: boolean;
  onOpen: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export interface ConfirmationModalProps {
  message: string;
  onConfirm: (station: Station) => void;
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

export interface RouteConfig {
  layout: string;
  path: string;
  name: string;
  publicRoute?: boolean;
  privateRoute?: boolean;
  redirect?: boolean;
  category?: boolean;
  state?: string;
  views?: RouteConfig[];
  icon?: string | JSX.Element;
  secondaryNavbar?: boolean;
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

export interface ESSContextProps {
  selectedStation: Station | null;
  isAdminMode: Boolean;
  selectStation: (selectedStation: Station) => void;
  selectAdminMode: () => void;
  selectDashboardMode: () => void;
  clearContext: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface ModalRef {
  open: (station?: Station) => void;
  close: () => void;
}
export interface User {
  id?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  username: string;
  role?: string;
  token: string;
  expireTime?: number;
  Address: string;
  Phone: string;
  name: string;
}

export interface Decode {
  sid: string;
  name: string;
  preferred_username: string;
  realm_access: any;
  email: string;
  exp: number;
  given_name: string;
  family_name: string;
  Address: string;
  Phone: string;
}

export interface fuelGrade {
  name: string;
  price: number;
  expansionCoefficient: string;
}
export interface Grades {
  fuelGrade: string;
  totalSalesParAmount: number;
  totalSalesParVolume: number;
}

export interface pump {
  id: string;
  portId: string;
  protocol: number;
  baudRate: number;
  address: string;
}
export interface TankMeasurement {
  tank: number;
  fuelGrade: string;
  percentage: number;
  productVolume: number;
  waterVolume: number;
  temperature: number;
}
export interface TankMeasurementRowProps {
  tankMeasurement: TankMeasurement;
}

export interface SalesPump {
  pumpId: number;
  allSales: number;
  pumpSales: number;
}

export interface SalesPumpGrades {
  pumpId: number;
  fuelGrade: String;
  totalSalesParAmount: number;
}
export interface TankDelivery {
  dateTime: string;
  tank: number;
  fullGrade: string;
  productHeight: number;
  waterHeight: number;
  temperature: number;
  productVolume: number;
  waterVolume: number;
  pumpsDispensedVolume: number;
  productTCVolume: number;
  productDensity: number;
  productMass: number;
}
export interface LastTankRowProps {
  tankId: number;
}

export interface SalesPumpGradesRowProps {
  pumpId: number;
  periode: string;
  startDate: string;
  endDate: string;
}

export interface tankMeasurementData {
  dateTime: string;
  tank: number;
  fullGrade: string;
  productVolume: number;
}
export interface tankLevelData {
  dateTime: string;
  tank: number;
  fullGrade: string;
  productVolume: number;
  salesVolume: number;
  tankVolumeChanges: number;
  changedVolume: number;
}
export interface periodeProps {
  periode: string;
  startDate: string;
  endDate: string;
}

export interface FilterTables {
  pump: String;
}
