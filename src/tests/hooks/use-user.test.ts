import { renderHook, waitFor } from "@testing-library/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../common/api/general-user-api";
import {
  useExitImpersonation,
  useLog,
  useUserById,
  useUserQueries,
  useUsers,
  useUsersByName,
} from "../../hooks/use-user";
import { searchUser } from "../../common/api/auth-api";
import { getlog } from "../../common/api/customerAccount-api";
import { useAuth } from "../../store/AuthContext";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("../../common/api/general-user-api", () => ({
  getUsers: jest.fn(),
  userInformation: jest.fn(),
  addUser: jest.fn(),
  updateUser: jest.fn(),
  activateUser: jest.fn(),
  deactivateUser: jest.fn(),
}));

jest.mock("../../common/api/customerAccount-api", () => ({
  getlog: jest.fn(),
}));

jest.mock("../../store/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    user: {
      customerAccountId: "test-account-id",
      id: "test-user-id",
    },
  })),
}));

jest.mock("../../common/api/auth-api", () => ({
  searchUser: jest.fn(),
  exitImpersonation: jest.fn(),
  impersonateUser: jest.fn(),
}));

jest.mock("../../hooks/use-query-params", () => ({
  __esModule: true,
  default: () => ({
    get: jest.fn((param) => {
      if (param === "name") return "test";
      if (param === "creator") return "creator1";
      if (param === "parent") return "parent1";
      return null;
    }),
  }),
}));

const mockUseQuery = useQuery as jest.Mock;
const mockUseMutation = useMutation as jest.Mock;
const mockUseQueryClient = useQueryClient as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

describe("User Hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: {
        customerAccountId: "test-account-id",
        id: "test-user-id",
      },
    });
  });

  describe("useUserById", () => {
    it("fetches user data successfully", () => {
      const mockUser = { id: 1, name: "Test" };
      mockUseQuery.mockReturnValue({
        data: mockUser,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useUserById(1));

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ["user", 1] }),
      );
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isLoading).toBe(false);
    });

    it("does not fetch when userId is undefined", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
      });
      renderHook(() => useUserById(undefined as any));

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["user", undefined],
          enabled: false,
        }),
      );
    });
  });

  describe("useUsers", () => {
    it("fetches users with criteria and adds index property", async () => {
      const mockData = {
        content: [{ id: 1, name: "A" }],
        totalPages: 2,
        totalElements: 10,
        numberOfElements: 1,
        size: 10,
      };

      (getUsers as jest.Mock).mockResolvedValue(mockData);

      mockUseQuery.mockImplementation(({ select }) => ({
        data: select ? select(mockData) : mockData,
        isLoading: false,
      }));

      const criteria = { page: 0, size: 10 };

      const { result } = renderHook(() => useUsers(criteria));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.users).toEqual([
        {
          index: 1,
          id: 1,
          name: "A",
        },
      ]);

      expect(result.current.totalPages).toBe(2);
      expect(result.current.totalElements).toBe(10);
      expect(result.current.numberOfElements).toBe(1);
      expect(result.current.size).toBe(10);
    });
  });

  describe("useUserQueries", () => {
    it("should provide mutation functions", () => {
      mockUseMutation.mockImplementation((options) => ({
        mutateAsync: jest.fn().mockImplementation((...args) => {
          if (options.onSuccess) {
            return Promise.resolve().then(() => options.onSuccess(...args));
          }
          return Promise.resolve();
        }),
        mutate: jest.fn(),
      }));

      const { result } = renderHook(() => useUserQueries());

      expect(typeof result.current.create).toBe("function");
      expect(typeof result.current.update).toBe("function");
      expect(typeof result.current.activate).toBe("function");
      expect(typeof result.current.desactivate).toBe("function");
    });

    it("should invalidate queries after create", async () => {
      const mockInvalidateQueries = jest.fn();
      mockUseQueryClient.mockReturnValue({
        invalidateQueries: mockInvalidateQueries,
      });

      mockUseMutation.mockImplementation((options) => ({
        mutateAsync: async () => {
          await options.onSuccess();
          return Promise.resolve();
        },
      }));

      const { result } = renderHook(() => useUserQueries());
      await result.current.create({} as any);

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["users"],
      });
    });

    it("should invalidate queries after update", async () => {
      const mockInvalidateQueries = jest.fn();
      mockUseQueryClient.mockReturnValue({
        invalidateQueries: mockInvalidateQueries,
      });

      mockUseMutation.mockImplementation((options) => ({
        mutateAsync: async (user: { id: number; [key: string]: any }) => {
          await options.onSuccess(null, user);
          return Promise.resolve();
        },
      }));

      const { result } = renderHook(() => useUserQueries());
      const mockUser = { id: 123, name: "Updated User" };
      await result.current.update(mockUser as any);

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["user", mockUser.id],
      });
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["users"],
      });
    });

    it("should invalidate queries after activate", async () => {
      const mockInvalidateQueries = jest.fn();
      mockUseQueryClient.mockReturnValue({
        invalidateQueries: mockInvalidateQueries,
      });

      mockUseMutation.mockImplementation((options) => ({
        mutate: async () => {
          await options.onSuccess();
          return Promise.resolve();
        },
      }));

      const { result } = renderHook(() => useUserQueries());
      result.current.activate({} as any);

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["users"],
      });
    });

    it("should invalidate queries after desactivate", async () => {
      const mockInvalidateQueries = jest.fn();
      mockUseQueryClient.mockReturnValue({
        invalidateQueries: mockInvalidateQueries,
      });

      mockUseMutation.mockImplementation((options) => ({
        mutate: async () => {
          await options.onSuccess();
          return Promise.resolve();
        },
      }));

      const { result } = renderHook(() => useUserQueries());
      result.current.desactivate({} as any);

      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["users"],
      });
    });
  });

  describe("useExitImpersonation", () => {
    it("should provide exit function and invalidate queries on success", async () => {
      const mockQueryClient = { invalidateQueries: jest.fn() };
      mockUseQueryClient.mockReturnValue(mockQueryClient);

      mockUseMutation.mockImplementation((options) => ({
        mutateAsync: async (targetUserId: number) => {
          await options.onSuccess("data", targetUserId);
          return Promise.resolve();
        },
      }));

      const { result } = renderHook(() => useExitImpersonation());
      await result.current.exit(1);

      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["users", 1],
      });
    });

    it("should log error on impersonation failure", async () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockUseMutation.mockImplementation((options) => ({
        mutateAsync: async () => {
          const error = new Error("Impersonation failed");
          await options.onError(error);
          throw error;
        },
      }));

      const { result } = renderHook(() => useExitImpersonation());
      await expect(result.current.exit(1)).rejects.toThrow(
        "Impersonation failed",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Exiting impersonation failed:",
        expect.any(Error),
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("useUsersByName", () => {
    it("fetches customer accounts successfully when user id is available", async () => {
      const mockCustomerAccounts = [{ id: "acc1", name: "Account 1" }];
      (searchUser as jest.Mock).mockResolvedValue(mockCustomerAccounts);

      mockUseQuery.mockReturnValue({
        data: mockCustomerAccounts,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useUsersByName());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["customerAccounts", "test-user-id"],
          queryFn: expect.any(Function),
          enabled: true,
        }),
      );
      expect(result.current.customerAccounts).toEqual(mockCustomerAccounts);
      expect(result.current.error).toBeNull();
    });

    it("does not fetch when user id is undefined", () => {
      mockUseAuth.mockReturnValue({
        user: {
          customerAccountId: "test-account-id",
          id: undefined,
        },
      });

      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useUsersByName());

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["customerAccounts", undefined],
          enabled: false,
        }),
      );
      expect(result.current.customerAccounts).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useLog", () => {
    it("fetches log data successfully and adds index property", async () => {
      const mockLogData = [{ id: "log1", message: "Log Entry 1" }];
      (getlog as jest.Mock).mockResolvedValue(mockLogData);

      mockUseQuery.mockImplementation(({ select }) => ({
        data: select ? select(mockLogData) : mockLogData,
        isLoading: false,
        error: null,
      }));

      const customerAccountId = "test-account-id";
      const userId = "user123";
      const criteria = {
        page: 0,
        size: 10,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      };

      const { result } = renderHook(() =>
        useLog(customerAccountId, userId, criteria),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["log", customerAccountId, userId, criteria],
          queryFn: expect.any(Function),
          enabled: true,
        }),
      );
      expect(result.current.log).toEqual([
        {
          index: 1,
          id: "log1",
          message: "Log Entry 1",
        },
      ]);
      expect(result.current.error).toBeNull();
    });

    it("does not fetch when customerAccountId is undefined", () => {
      mockUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      });

      const customerAccountId = undefined;
      const userId = "user123";
      const criteria = {
        page: 0,
        size: 10,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      };

      const { result } = renderHook(() =>
        useLog(customerAccountId, userId, criteria),
      );

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["log", customerAccountId, userId, criteria],
          enabled: false,
        }),
      );
      expect(result.current.log).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
