// import
import Dashboard from "views/Dashboard/Dashboard";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Pages/SignIn";

import {
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  SupportIcon,
  WalletIcon
} from "components/Icons/Icons";
import ManageUsers from "views/Administration/ManageUsers";
import UserDetails from "views/Administration/UserDetails";
import ManageStation from "views/Dashboard/ManageStation";
import TankDelivery from "views/Dashboard/TankDelivery";
import Transactions from "views/Dashboard/Transactions";
import CustomerAccount from "../views/Administration/CustomerAccount";
import CustomerAccountInformation from "../views/Administration/CustomerAccountInformation";

export const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/dashboard",
    privateRoute: true
  },
  {
    path: "/manage-station",
    name: "Manage Stations",
    icon: <SupportIcon color="inherit" />,
    component: ManageStation,
    layout: "/dashboard",
    privateRoute: true
  },
  {
    path: "/transaction",
    name: "Transactions",
    icon: <WalletIcon color="inherit" />,
    component: Transactions,
    layout: "/dashboard",
    privateRoute: true
  },
  {
    path: "/tank-delivery",
    name: "Tank Delivery",
    icon: <WalletIcon color="inherit" />,
    component: TankDelivery,
    layout: "/dashboard",
    privateRoute: true
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/dashboard",
    privateRoute: true
  },
  {
    path: "/signin",
    name: "Sign In",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
    publicRoute: true
  }
];

export const administrationRoutes = [
  {
    path: "/home",
    name: "Manage Accounts",
    icon: <HomeIcon color="inherit" />,
    component: CustomerAccount,
    layout: "/administration",
    privateRoute: true
  },
  {
    path: "/manages-users/details",
    name: "User Details",
    icon: <PersonIcon color="inherit" />,
    component: UserDetails,
    layout: "/administration",
    privateRoute: true,
    hideInNavbar: true
  },
  {
    path: "/manages-users",
    name: "Manage Users",
    icon: <PersonIcon color="inherit" />,
    component: ManageUsers,
    layout: "/administration",
    privateRoute: true
  },
  {
    path: "/CustomerAccountInformation/:id",
    name: "Information Accounts",
    icon: <HomeIcon color="inherit" />,
    component: CustomerAccountInformation,
    layout: "/administration",
    privateRoute: true,
    hideInNavbar: true
  },
  {
    path: "/UserDetails/:id",
    name: "User Details",
    icon: <HomeIcon color="inherit" />,
    component: UserDetails,
    layout: "/administration",
    privateRoute: true,
    hideInNavbar: true
  }
];
