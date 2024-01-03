// import
import SignIn from "views/Pages/SignIn";
import ForgotPassword from "views/Pages/ForgotPassword";
import ResetPassword from "views/Pages/ResetPassword";

import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RouteConfig } from "common/model";
import { DocumentIcon, HomeIcon, PersonIcon } from "components/Icons/Icons";
import AdminSideBarItem from "components/Sidebar/AdminSideBarItem";
import { useTranslation } from "react-i18next";
import StationManagement from "views/Administration/StationManagement";
import UserManagement from "views/Administration/UserManagement";
import CustomerAccountManagement from "../views/Administration/CustomerAccountManagement";

export const administrationRoutes = (): RouteConfig[] => {
  const { t } = useTranslation();
  return [
    {
      path: "/customer-accounts",
      name: t("routes.manageAccounts"),
      icon: <HomeIcon color="inherit" />,
      component: CustomerAccountManagement,
      layout: "/administration",
      sideBarItemComponent: AdminSideBarItem,
    },
    {
      path: "/users",
      name: t("routes.manageUsers"),
      icon: <PersonIcon color="inherit" />,
      component: UserManagement,
      layout: "/administration",
      sideBarItemComponent: AdminSideBarItem,
    },
    {
      path: "/stations",
      name: t("routes.manageStations"),
      icon: <FontAwesomeIcon icon={faGasPump} color="inherit" />,
      component: StationManagement,
      layout: "/administration",
      sideBarItemComponent: AdminSideBarItem,
    },
  ];
};

export const authRoutes = (): RouteConfig[] => {
  const { t } = useTranslation();
  return [
    {
      path: "/signin",
      name: t("routes.signIn"),
      icon: <DocumentIcon color="inherit" />,
      component: SignIn,
      layout: "/auth",
    },
    {
      path: "/Forgot-Password",
      name: t("routes.signIn"),
      icon: <DocumentIcon color="inherit" />,
      component: ForgotPassword,
      layout: "/auth",
      hideInNavbar: true,
    },
    {
      path: "/reset-password",
      name: t("routes.signIn"),
      icon: <DocumentIcon color="inherit" />,
      component: ResetPassword,
      layout: "/auth",
      hideInNavbar: true,
    },
  ];
};
