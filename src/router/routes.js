// import
import React from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  SupportIcon,
  WalletIcon,
} from "components/Icons/Icons";
import ManageStation from "views/Dashboard/ManageStation";
import Transaction from "views/Dashboard/Transaction";
import TankDelivery from "views/Dashboard/TankDelivery";

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
      },
    ],
  },
];
export default dashRoutes;
