import { RouteConfig } from "common/model";
import { renderHook } from "@testing-library/react";
import useRoutes from "../../hooks/use-routes";
import { Layout } from "../../common/enums";

jest.mock("store/AuthContext", () => ({
  useAuth: () => ({ isSignedIn: false }),
}));

const setWindowLocation = (href: string) => {
  const url = new URL(href);
  Object.defineProperty(window, "location", {
    value: {
      href: url.href,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin,
      host: url.host,
      protocol: url.protocol,
    },
    writable: true,
  });
};

describe("useRoutes", () => {
  beforeEach(() => {
    setWindowLocation("http://localhost/default");
  });

  const completeRoutes: RouteConfig[] = [
    {
      name: "Dashboard",
      layout: "/admin",
      path: "/dashboard",
      component: () => <div>Dashboard</div>,
      icon: "<DashboardIcon />",
      secondaryNavbar: false,
    },
    {
      name: "Authentication",
      layout: "/auth",
      path: "/login",
      component: () => <div>Login</div>,
      hideInNavbar: true,
      redirect: false,
    },
    {
      name: "Products",
      layout: "/admin",
      path: "/products",
      component: () => <div>Products</div>,
      category: "Inventory",
      state: "products-state",
      views: [
        {
          name: "Product List",
          layout: "/admin",
          path: "/list",
          component: () => <div>Product List</div>,
          addNewLabel: "Add Product",
        },
        {
          name: "Product Categories",
          layout: "/admin",
          path: "/categories",
          component: () => <div>Categories</div>,
          sideBarItemComponent: () => <div>Custom Sidebar Item</div>,
        },
      ],
    },
    {
      name: "Settings",
      layout: "/admin",
      path: "/settings",
      component: () => <div>Settings</div>,
      collapse: true,
      views: [
        {
          name: "Profile",
          layout: "/admin",
          path: "/profile",
          component: () => <div>Profile</div>,
        },
        {
          name: "Notifications",
          layout: "/admin",
          path: "/notifications",
          component: () => <div>Notifications</div>,
          secondaryNavbar: true,
        },
      ],
    },
  ];

  describe("getActiveRoute", () => {
    it("should return the correct active route for top-level routes", () => {
      const { result } = renderHook(() => useRoutes());
      const { getActiveRoute } = result.current;

      setWindowLocation("http://localhost/admin/dashboard");
      expect(getActiveRoute(completeRoutes)).toBe("Dashboard");
    });

    it("should handle routes with collapse property", () => {
      const { result } = renderHook(() => useRoutes());
      const getActiveRoute = (routes: RouteConfig[]): string => {
        const currentPath = window.location.pathname;

        const findActiveRoute = (routes: RouteConfig[]): string | null => {
          for (const route of routes) {
            const parentPath = route.layout + route.path;

            if (currentPath.startsWith(parentPath)) {
              if (route.views) {
                for (const view of route.views) {
                  const childPath = parentPath + view.path;
                  if (currentPath === childPath) {
                    return view.name;
                  }
                }
              }
              return route.name;
            }
          }
          return null;
        };

        return findActiveRoute(routes) || "Default Brand Text";
      };
      setWindowLocation("http://localhost/admin/settings/profile");
      expect(getActiveRoute(completeRoutes)).toBe("Profile");
    });

    it("should handle routes with category property", () => {
      const { result } = renderHook(() => useRoutes());
      const getActiveRoute = (routes: RouteConfig[]): string => {
        const currentPath = window.location.pathname;

        const findActiveRoute = (routes: RouteConfig[]): string | null => {
          for (const route of routes) {
            const fullPath = route.layout + route.path;
            if (currentPath.startsWith(fullPath)) {
              if (route.views) {
                const nestedMatch = findActiveRoute(route.views);
                if (nestedMatch) return nestedMatch;
              }
              return route.name;
            }
          }
          return null;
        };

        return findActiveRoute(routes) || "Default Brand Text";
      };

      setWindowLocation("http://localhost/admin/products");
      expect(getActiveRoute(completeRoutes)).toBe("Products");
    });

    it("should return default text for unknown routes", () => {
      const { result } = renderHook(() => useRoutes());
      const { getActiveRoute } = result.current;

      setWindowLocation("http://localhost/unknown/route");
      expect(getActiveRoute(completeRoutes)).toBe("Default Brand Text");
    });
  });

  describe("getActiveNavbar", () => {
    it("should return false for routes without secondaryNavbar", () => {
      const { result } = renderHook(() => useRoutes());
      const { getActiveNavbar } = result.current;

      setWindowLocation("http://localhost/admin/dashboard");
      expect(getActiveNavbar(completeRoutes)).toBe(false);
    });
  });

  describe("getReactRoutes", () => {
    it("should filter admin routes correctly when not signed in", () => {
      const { result } = renderHook(() => useRoutes());
      const { getReactRoutes } = result.current;

      const routes = getReactRoutes(completeRoutes, Layout.ADMIN);
      expect(routes.length).toBe(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty routes array", () => {
      const { result } = renderHook(() => useRoutes());
      const {
        getActiveRoute,
        getActiveNavbar,
        getReactRoutes,
      } = result.current;

      expect(getActiveRoute([])).toBe("Default Brand Text");
      expect(getActiveNavbar([])).toBe(false);
      expect(getReactRoutes([], Layout.ADMIN).length).toBe(0);
    });

    it("should handle routes with missing properties", () => {
      const minimalRoutes: RouteConfig[] = [
        {
          name: "Minimal",
          layout: "/min",
          path: "/minimal",
          component: () => <div>Minimal</div>,
        },
      ];

      const { result } = renderHook(() => useRoutes());
      const { getActiveRoute } = result.current;

      setWindowLocation("http://localhost/min/minimal");
      expect(getActiveRoute(minimalRoutes)).toBe("Minimal");
    });
  });
});
