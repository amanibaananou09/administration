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
import { useTranslation } from "react-i18next";

export const dashboardRoutes = () => {
  const { t } = useTranslation("dashboard");
  return [
    {
      path: "/home",
      name: t("routes.dashboard"),
      icon: <HomeIcon color="inherit" />,
      component: Dashboard,
      layout: "/dashboard",
      privateRoute: true,
    },
    {
      path: "/manage-station",
      name: t("routes.manageStations"),
      icon: <SupportIcon color="inherit" />,
      component: ManageStation,
      layout: "/dashboard",
      privateRoute: true,
    },
    {
      path: "/transaction",
      name: t("routes.transactions"),
      icon: <WalletIcon color="inherit" />,
      component: Transactions,
      layout: "/dashboard",
      privateRoute: true,
    },
    {
      path: "/tank-delivery",
      name: t("routes.tankDelivery"),
      icon: <WalletIcon color="inherit" />,
      component: TankDeliveries,
      layout: "/dashboard",
      privateRoute: true,
    },
    {
      path: "/profile",
      name: t("routes.profile"),
      icon: <PersonIcon color="inherit" />,
      secondaryNavbar: true,
      component: Profile,
      layout: "/dashboard",
      privateRoute: true,
    },
    {
      path: "/signin",
      name: t("routes.signIn"),
      icon: <DocumentIcon color="inherit" />,
      component: SignIn,
      layout: "/auth",
      publicRoute: true,
    },
  ];
};

export const administrationRoutes = () => {
  const { t } = useTranslation("administration");
  return [
    {
      path: "/customer-accounts/:id",
      name: t("routes.informationAccounts"),
      icon: <HomeIcon color="inherit" />,
      component: CustomerAccountInformation,
      layout: "/administration",
      privateRoute: true,
      hideInNavbar: true,
    },
    {
      path: "/customer-accounts",
      name: t("routes.manageAccounts"),
      icon: <HomeIcon color="inherit" />,
      component: CustomerAccountManagement,
      layout: "/administration",
      privateRoute: true,
    },
    {
      path: "/users/:id",
      name: t("routes.userDetails"),
      icon: <HomeIcon color="inherit" />,
      component: UserDetails,
      layout: "/administration",
      privateRoute: true,
      hideInNavbar: true,
    },
    {
      path: "/users",
      name: t("routes.manageUsers"),
      icon: <PersonIcon color="inherit" />,
      component: UserManagement,
      layout: "/administration",
      privateRoute: true,
    },
  ];
};
