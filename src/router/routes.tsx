// import
import SignIn from "views/Pages/SignIn";

import { RouteConfig } from "common/model";
import { DocumentIcon, HomeIcon, PersonIcon } from "components/Icons/Icons";
import AdminSideBarItem from "components/Sidebar/AdminSideBarItem";
import { useTranslation } from "react-i18next";
import UserDetails from "views/Administration/UserDetails";
import UserManagement from "views/Administration/UserManagement";
import CustomerAccountManagement from "../views/Administration/CustomerAccountManagement";

export const administrationRoutes = (): RouteConfig[] => {
  const { t } = useTranslation("administration");
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
      path: "/users/:id/details",
      name: t("routes.userDetails"),
      icon: <HomeIcon color="inherit" />,
      component: UserDetails,
      layout: "/administration",
      hideInNavbar: true,
    },
    {
      path: "/users",
      name: t("routes.manageUsers"),
      icon: <PersonIcon color="inherit" />,
      component: UserManagement,
      layout: "/administration",
      sideBarItemComponent: AdminSideBarItem,
    },
  ];
};

export const authRoutes = (): RouteConfig[] => {
  const { t } = useTranslation("dashboard");
  return [
    {
      path: "/signin",
      name: t("routes.signIn"),
      icon: <DocumentIcon color="inherit" />,
      component: SignIn,
      layout: "/auth",
    },
  ];
};
