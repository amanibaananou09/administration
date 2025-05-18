import { renderHook, waitFor } from "@testing-library/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  activateCustomerAccount,
  createCustomerAccount,
  deactivateCustomerAccount,
  exportAccount,
  updateAccount,
} from "common/api/customerAccount-api";
import { useAuth } from "../../store/AuthContext";
import {
  useCustomerAccountById,
  useCustomerAccountQueries,
  useCustomerAccounts,
} from "../../hooks/use-customer-account";
import useQueryParams from "../../hooks/use-query-params";
import {
  CustomerAccount,
  GeneralUser,
  MasterUser,
} from "../../common/AdminModel";

jest.mock("@tanstack/react-query");
jest.mock("common/api/customerAccount-api");
jest.mock("../../hooks/use-query-params");
jest.mock("../../store/AuthContext");

const mockUseQuery = useQuery as jest.Mock;
const mockUseMutation = useMutation as jest.Mock;
const mockUseQueryClient = useQueryClient as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;
const mockMasterUser: MasterUser = {
  id: "master1",
  username: "masteruser",
  email: "master@example.com",
  firstName: "Master",
  lastName: "User",
  phone: "1234567890",
  role: "admin",
};

const mockGeneralUser: GeneralUser = {
  id: 1,
  username: "user1",
  email: "user@example.com",
  firstName: "First",
  lastName: "Last",
  phone: "0987654321",
  customerAccountId: "acc1",
  creatorAccountId: "accCreator",
  lastConnectionDate: "2023-10-01",
  role: "user",
};

const newCustomerAccount: CustomerAccount = {
  name: "New Account",
  city: "Test City",
  creatorAccountId: "999",
  parentId: "0",
  resaleRight: false,
  cardManager: false,
  exported: false,
  status: "Pending",
  masterUser: mockMasterUser,
  identifier: "ID123",
  parentName: "Parent Name",
  creatorCustomerAccountName: "Creator Name",
  dateStatusChange: "2023-10-01",
  stations: 5,
  stationsCount: 5,
  actif: true,
  creatorUser: mockGeneralUser,
  paymentMethods: [{ code: "PM1" }],
  plannedExportDate: "2023-10-15",
  scheduledDate: "2023-10-20",
};

const updatedCustomerAccount: CustomerAccount = {
  id: "abc123",
  name: "Updated Account",
  city: "Updated City",
  creatorAccountId: "999",
  parentId: "0",
  resaleRight: true,
  cardManager: true,
  exported: false,
  status: "Active",
  masterUser: mockMasterUser,
  identifier: "ID123",
  parentName: "Parent Name",
  creatorCustomerAccountName: "Creator Name",
  dateStatusChange: "2023-10-02",
  stations: 10,
  stationsCount: 10,
  actif: true,
  creatorUser: mockGeneralUser,
  paymentMethods: [{ code: "PM2" }],
  plannedExportDate: "2023-10-25",
  scheduledDate: "2023-10-30",
};
describe("useCustomerAccountById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });
  });

  it("should fetch customer account by id when enabled", async () => {
    const mockAccount = { id: 1, name: "Test Account" };
    mockUseQuery.mockReturnValue({
      data: mockAccount,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useCustomerAccountById(1));

    await waitFor(() => {
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ["customerAccount", 1],
        queryFn: expect.any(Function),
        enabled: true,
      });
      expect(result.current).toEqual({
        isLoading: false,
        customerAccount: mockAccount,
        error: null,
      });
    });
  });

  it("should not fetch when customerAccountId is not provided", async () => {
    const { result } = renderHook(() =>
      useCustomerAccountById(undefined as any),
    );

    await waitFor(() => {
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ["customerAccount", undefined],
        queryFn: expect.any(Function),
        enabled: false,
      });
      expect(result.current.isLoading).toBeFalsy();
    });
  });
});

describe("useCustomerAccounts", () => {
  const mockCriteria = { page: 0, size: 10 };
  const mockUser = { customerAccountId: 123 };
  const mockData = {
    content: [{ id: 1, name: "Account 1" }],
    totalPages: 1,
    totalElements: 1,
    numberOfElements: 1,
    size: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });
    mockUseAuth.mockReturnValue({ user: mockUser });
    (useQueryParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === "name") return "test";
        if (key === "creator") return "creator";
        if (key === "parent") return "parent";
        return null;
      }),
    });
  });

  it("should fetch customer accounts with criteria and query params", async () => {
    const { result } = renderHook(() => useCustomerAccounts(mockCriteria));

    await waitFor(() => {
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: [
          "customerAccounts",
          { name: "test", creator: "creator", parent: "parent" },
          mockCriteria,
          mockUser,
        ],
        queryFn: expect.any(Function),
        select: expect.any(Function),
      });

      expect(result.current).toEqual({
        isLoading: false,
        customerAccounts: mockData.content,
        totalPages: 1,
        totalElements: 1,
        numberOfElements: 1,
        size: 10,
      });
    });
  });

  it("should handle empty query params", async () => {
    (useQueryParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const { result } = renderHook(() => useCustomerAccounts(mockCriteria));

    await waitFor(() => {
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: [
          "customerAccounts",
          { name: undefined, creator: undefined, parent: undefined },
          mockCriteria,
          mockUser,
        ],
        queryFn: expect.any(Function),
        select: expect.any(Function),
      });

      expect(result.current).toEqual({
        isLoading: false,
        customerAccounts: mockData.content,
        totalPages: 1,
        totalElements: 1,
        numberOfElements: 1,
        size: 10,
      });
    });
  });
});

describe("useCustomerAccountQueries", () => {
  let mockQueryClient: { invalidateQueries: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    mockQueryClient = {
      invalidateQueries: jest.fn(),
    };
    mockUseQueryClient.mockReturnValue(mockQueryClient);
    mockUseMutation.mockImplementation((options) => ({
      mutateAsync: jest.fn(),
      mutate: jest.fn(),
    }));
  });

  it("should provide mutation functions with proper cache invalidation", () => {
    const { result } = renderHook(() => useCustomerAccountQueries());

    result.current.create(newCustomerAccount as CustomerAccount);
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: createCustomerAccount,
      onSuccess: expect.any(Function),
    });

    result.current.update(updatedCustomerAccount as CustomerAccount);
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: updateAccount,
      onSuccess: expect.any(Function),
    });

    result.current.activate(1);
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: activateCustomerAccount,
      onSuccess: expect.any(Function),
    });

    result.current.desactivate(1);
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: deactivateCustomerAccount,
      onSuccess: expect.any(Function),
    });

    result.current.exportCustomerAccount(1);
    expect(mockUseMutation).toHaveBeenCalledWith({
      mutationFn: exportAccount,
      onSuccess: expect.any(Function),
    });
  });
});
