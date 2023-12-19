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
  currencyId?: number;
  phoneCode?: string;
  phonePrefix?: string;
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
  tag: string;
  amount: number;
  totalVolume: number;
  totalAmount: number;
  dateTimeStart: string;
}

export interface TankDelivery {
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

export interface ChartFilter {
  fuelGrade: string;
  pump: string;
  chartType: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    name: string;
    data: number[];
    borderWidth?: number;
  }[];
}

export interface RouteConfig {
  layout: string;
  path: string;
  name: string;
  hideInNavbar?: boolean;
  redirect?: boolean;
  category?: string;
  state?: string;
  views?: RouteConfig[];
  icon?: string | JSX.Element;
  secondaryNavbar?: boolean;
  collapse?: boolean;
  component: () => JSX.Element;
  sideBarItemComponent?: React.ComponentType<{
    route: RouteConfig;
    isOpen: boolean;
  }>;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username: string;
  role?: string;
  token: string;
  expireTime?: number;
  phone: string;
  name: string;
  customerAccountId: string;
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
  phone: string;
  customerAccountId: string;
}

export interface fuelGrade {
  idConf: string | null;
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

export interface LastTankDelivery {
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
