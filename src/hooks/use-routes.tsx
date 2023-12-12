import { RouteConfig } from "common/model";
import { Route } from "react-router-dom";
import PrivateRoute from "router/Route/PrivateRoute";
import { useAuth } from "store/AuthContext";

const useRoutes = () => {
  const { isSignedIn } = useAuth();

  const getActiveRoute = (routes: RouteConfig[]): string => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views!!);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views!!);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes: RouteConfig[]): boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views!!);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar!!;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutesForLayout = (routes: RouteConfig[], layout: String): any => {
    const activeRoutes = routes.map((prop: any, key: any) => {
      if (prop.privateRoute && isSignedIn && prop.layout === layout) {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }

      if (prop.publicRoute && !isSignedIn && prop.layout === layout) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }

      return null;
    });

    return activeRoutes.filter((route: JSX.Element | null) => route != null);
  };

  return { getActiveRoute, getActiveNavbar, getRoutesForLayout };
};

export default useRoutes;
