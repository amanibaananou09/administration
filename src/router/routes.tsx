import React from "react";
import Dashboard from "../views/Dashboard/Dashboard";
import Profile from "../views/Dashboard/Profile";
import SignIn from "../views/Pages/SignIn";

import {
  HomeIcon,
  PersonIcon,
  DocumentIcon,
  SupportIcon,
  WalletIcon,
} from "../components/Icons/Icons.ts";
import ManageStation from "../views/Dashboard/ManageStation";
import Transaction from "../views/Dashboard/Transaction";
import TankDelivery from "../views/Dashboard/TankDelivery";

interface DashRoute {
  path: string;
  name: string;
  icon: JSX.Element;
  component: React.FC;
  layout: string;
  privateRoute: boolean;
}

interface AccountPage {
  path: string;
  name: string;
  icon: JSX.Element;
  secondaryNavbar?: boolean;
  component: React.FC;
  layout: string;
  privateRoute: boolean;
  onlyPublicRoute?: boolean;
}

interface DashRouteCategory {
  name: string;
  category: string;
  state: string;
  views: AccountPage[];
}

const dashRoutes: (DashRoute | DashRouteCategory)[] = [
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
    component: Transaction,
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
        privateRoute: false,
      },
    ],
  },
];

export default dashRoutes;
