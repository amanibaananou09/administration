import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { dateTime } from "../../common/api/controller-api";
import { GeneralStations } from "../../common/AdminModel";
import { useDateByController } from "../../hooks/use-controller";

jest.mock("@tanstack/react-query");
jest.mock("../../common/api/controller-api");

const mockedUseQuery = useQuery as jest.Mock;
const mockedDateTime = dateTime as jest.Mock;

describe("useDateByController", () => {
  const mockStation: GeneralStations = {
    id: "station-123",
    identifier: "ST123",
    name: "Main Station",
    address: "123 Main St",
    city: "Paris",
    countryId: 1,
    cordonneesGps: "48.8566,2.3522",
    connection: "Ethernet",
    controllerType: "TypeA",
    password: "station-password",
    phone: "+123456789",
    actif: true,
    journal: "journal-info",
    modeAffectation: "auto",

    creatorCustomerAccountName: "creator-account",
    customerAccountName: "customer-account",
    creatorAccountId: "creator-id-123",
    account: "account-123",
    customerAccountId: "customer-id-456",

    controllerPts: {
      ptsId: "pts-456",
      userController: {
        username: "admin",
        password: "securepassword",
      },
    },

    createdDate: "2023-01-01T00:00:00Z",
    country: {
      id: 1,
      name: "France",
      code: "FR",
    },
  };

  const mockCustomerAccountId = "customer-456";
  const mockDateTimeResponse = "2023-11-15T12:00:00Z";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useQuery with correct parameters when station and customerAccountId are provided", () => {
    mockedUseQuery.mockReturnValue({
      data: mockDateTimeResponse,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useDateByController(mockStation, mockCustomerAccountId),
    );

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["DateTime", mockStation.id, mockCustomerAccountId],
      queryFn: expect.any(Function),
      enabled: true,
    });

    expect(result.current).toEqual({
      DateTime: mockDateTimeResponse,
      isLoadings: false,
      error: null,
    });
  });

  it("should not enable the query when station.id is missing", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderHook(() => useDateByController(undefined, mockCustomerAccountId));

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["DateTime", undefined, mockCustomerAccountId],
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it("should not enable the query when customerAccountId is missing", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderHook(() => useDateByController(mockStation, undefined));

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["DateTime", mockStation.id, undefined],
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it("should return loading state correctly", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() =>
      useDateByController(mockStation, mockCustomerAccountId),
    );

    expect(result.current.isLoadings).toBe(true);
  });

  it("should return error state correctly", () => {
    const mockError = new Error("API Error");

    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
    });

    const { result } = renderHook(() =>
      useDateByController(mockStation, mockCustomerAccountId),
    );

    expect(result.current.error).toBe(mockError);
  });

  it("should call dateTime with correct parameters", async () => {
    mockedDateTime.mockResolvedValue(mockDateTimeResponse);
    mockedUseQuery.mockImplementation(({ queryFn }) => {
      return {
        data: queryFn ? queryFn() : undefined,
        isLoading: false,
        error: null,
      };
    });

    renderHook(() => useDateByController(mockStation, mockCustomerAccountId));

    await waitFor(() => {
      expect(mockedDateTime).toHaveBeenCalledWith(
        mockCustomerAccountId,
        mockStation.id,
      );
    });
  });

  it("should handle undefined station object", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderHook(() => useDateByController(undefined, mockCustomerAccountId));

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["DateTime", undefined, mockCustomerAccountId],
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it("should handle empty customerAccountId", () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderHook(() => useDateByController(mockStation, ""));

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["DateTime", mockStation.id, ""],
      queryFn: expect.any(Function),
      enabled: false,
    });
  });
});
