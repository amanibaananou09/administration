// import
import React from "react";
import Dashboard from "src/views/Dashboard/Dashboard";
import Profile from "src/views/Dashboard/Profile";
import SignIn from "src/views/Pages/SignIn";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  SupportIcon,
  WalletIcon,
} from "src/components/Icons/Icons";
import ManageStation from "src/views/Dashboard/ManageStation";
import Transaction from "src/views/Dashboard/Transaction";
import TankDelivery from "src/views/Dashboard/TankDelivery";

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
