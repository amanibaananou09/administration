// import
import Dashboard from "views/Dashboard/Dashboard";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Pages/SignIn";

import {
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  SupportIcon,
  WalletIcon,
} from "components/Icons/Icons";
import UserDetails from "views/Administration/UserDetails";
import UserManagement from "views/Administration/UserManagement";
import ManageStation from "views/Dashboard/ManageStation";
import TankDeliveries from "views/Dashboard/TankDeliveries";
import Transactions from "views/Dashboard/Transactions";
import CustomerAccountInformation from "../views/Administration/CustomerAccountInformation";
import CustomerAccountManagement from "../views/Administration/CustomerAccountManagement";

export const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/dashboard",
    privateRoute: true,
  },
  {
    path: "/manage-station",
    name: "Manage Stations",
    icon: <SupportIcon color="inherit" />,
    component: ManageStation,
    layout: "/dashboard",
    privateRoute: true,
  },
  {
    path: "/transaction",
    name: "Transactions",
    icon: <WalletIcon color="inherit" />,
    component: Transactions,
    layout: "/dashboard",
    privateRoute: true,
  },
  {
    path: "/tank-delivery",
    name: "Tank Delivery",
    icon: <WalletIcon color="inherit" />,
    component: TankDeliveries,
    layout: "/dashboard",
    privateRoute: true,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/dashboard",
    privateRoute: true,
  },
  {
    path: "/signin",
    name: "Sign In",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
    publicRoute: true,
  },
];

export const administrationRoutes = [
  {
    path: "/customer-accounts/:id",
    name: "Information Accounts",
    icon: <HomeIcon color="inherit" />,
    component: CustomerAccountInformation,
    layout: "/administration",
    privateRoute: true,
    hideInNavbar: true,
  },
  {
    path: "/customer-accounts",
    name: "Manage Accounts",
    icon: <HomeIcon color="inherit" />,
    component: CustomerAccountManagement,
    layout: "/administration",
    privateRoute: true,
  },
  {
    path: "/users/:id",
    name: "User Details",
    icon: <HomeIcon color="inherit" />,
    component: UserDetails,
    layout: "/administration",
    privateRoute: true,
    hideInNavbar: true,
  },
  {
    path: "/users",
    name: "Manage Users",
    icon: <PersonIcon color="inherit" />,
    component: UserManagement,
    layout: "/administration",
    privateRoute: true,
  },
];
