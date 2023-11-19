import { ReactNode } from "react";
import { CustomerAccount } from "./AdminModel";
import { Filter, Station, TankMeasurement, User } from "./model";

export interface CustomCardProps {
  title: string;
  avatar?: string;
  description?: string;
  onClick: (title: string) => void;
}

export interface ReportSalesChartMenuProps {
  filter: Filter;
  onChange: (newFilter: Filter) => void;
}

export interface TankChartMenuProps {
  tanks: Array<{ idConf: string | number | null }>;
  selectedTank: string | number | null;
  onChange: (idConf: string | number | null) => void;
}

export interface TransactionTableRowProps {
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

export interface CustomerAccountTableRowProps {
  customerAccount: CustomerAccount;
  isLastRow: boolean;
}

export interface AddStationModalProps {
  onSubmit: () => void;
}

export interface AddStationModalRefType {
  open: () => void;
}

export interface CustomAccountModalRefType {
  open: (account?: CustomerAccount) => void;
  close: () => void;
}

export interface StationModalRefType {
  open: (station: Station) => void;
  close: () => void;
}

export interface CustomerAccountModalProps {
  onSubmit: (values: CustomerAccount) => void;
  account: CustomerAccount | null;
  onClose: () => void;
  ref?: React.Ref<any>;
}

export interface UserModalRefType {
  open: () => void;
}

export interface SalesPumpGradesRowProps {
  pumpId: number;
  periode: string;
  startDate: string;
  endDate: string;
}

export interface LastTankRowProps {
  tankId: number;
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

export interface StationRowProps {
  id: number;
  name: string;
  address: string;
  controllerPtsId: string;
  firmwareInformations: any;
  onEdit: () => void;
  onDelete: () => void;
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
  isLoading: boolean;
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

export interface TankMeasurementRowProps {
  tankMeasurement: TankMeasurement;
}

export interface PeriodeProps {
  periode: string;
  startDate: string;
  endDate: string;
}

export interface TankDeliveryRowProps {
  tank: string;
  fuelGradeName: string;
  productHeight: number;
  waterHeight: number;
  temperature: number;
  productVolume: number;
}

export interface UserModalProps {
  onSubmit: () => void;
}

export interface AddUserModalProps {
  onSubmit: () => void;
}

export interface AddUserModalRefType {
  open: () => void;
}
