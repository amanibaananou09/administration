import { renderHook, waitFor } from "@testing-library/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../common/api/general-user-api";
import {
  useExitImpersonation,
  useUserById,
  useUserQueries,
  useUsers,
} from "../../hooks/use-user";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));
jest.mock("../../common/api/general-user-api", () => ({
  getUsers: jest.fn(),
  userInformation: jest.fn(),
}));
jest.mock("../../common/api/customerAccount-api", () => ({
  getlog: jest.fn(),
}));
jest.mock("../../store/AuthContext", () => ({
  useAuth: () => ({
    user: {
      customerAccountId: "test-account-id",
    },
  }),
}));
jest.mock("../../common/api/auth-api", () => ({
  searchUser: jest.fn(),
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

describe("User Hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useUserById", () => {
    it("fetches user data successfully", () => {
      const mockUser = { id: 1, name: "Test" };
      (useQuery as jest.Mock).mockReturnValue({
        data: mockUser,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useUserById(1));

      expect(useQuery).toHaveBeenCalledWith(
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
  });

  describe("useExitImpersonation", () => {
    it("should provide exit function", async () => {
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
  });
});
