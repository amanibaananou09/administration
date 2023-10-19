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
import ManageStation from "views/Dashboard/ManageStation";
import TankDelivery from "views/Dashboard/TankDelivery";
import Transactions from "views/Dashboard/Transactions";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    privateRoute: true,
  },
  {
    path: "/manage-station",
    name: "Manage Stations",
    icon: <SupportIcon color="inherit" />,
    component: ManageStation,
    layout: "/admin",
    privateRoute: true,
  },
  {
    path: "/transaction",
    name: "Transactions",
    icon: <WalletIcon color="inherit" />,
    component: Transactions,
    layout: "/admin",
    privateRoute: true,
  },
  {
    path: "/tank-delivery",
    name: "Tank Delivery",
    icon: <WalletIcon color="inherit" />,
    component: TankDelivery,
    layout: "/admin",
    privateRoute: true,
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
        privateRoute: true,
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
        onlyPublicRoute: true,
      },
    ],
  },
];
export default dashRoutes;
