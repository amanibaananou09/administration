import { ReactNode } from "react";
import { RouteConfig, User } from "./model";
import { Mode } from "./enums";

export interface CustomCardProps {
  title: string;
  avatar?: string;
  description?: string;
  onClick: (title: string) => void;
}

export interface ConfiguratorProps {
  secondary: boolean;
  isOpen: boolean;
  onClose: () => void;
  isChecked: boolean;
  onSwitch: (isChecked: boolean) => void;
}

export interface ExitConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface StationConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FixedPluginProps {
  secondary: boolean;
  fixed: boolean;
  onOpen: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface AddStationModalProps {
  onSubmit: () => void;
  mode: Mode;
}

export interface CustomerAccountModalProps {
  onSubmit: () => void;
  ref?: React.Ref<any>;
  mode: Mode;
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
  hamburgerColor?: string;
  secondary?: any;
}

export interface AuthContextProps {
  token: string | null;
  isSignedIn: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  impersonate: (userId: number) => void;
}

export interface ESSContextProps {
  isLoading: boolean;
  clearContext: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface UserModalProps {
  onSubmit: () => void;
  mode: Mode;
}

export interface AdminSideBarItemProps {
  route: RouteConfig;
  isOpen: boolean;
}
