import { renderHook, waitFor } from "@testing-library/react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getListOfCountry } from "common/api/reference-data-api";
import useCountries from "../../hooks/use-countries";

jest.mock("@tanstack/react-query");
jest.mock("common/api/reference-data-api");

const mockedUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockedGetListOfCountry = getListOfCountry as jest.Mock;

const createMockQueryResult = <T>(
  overrides: Partial<UseQueryResult<T, Error>>,
): UseQueryResult<T, Error> =>
  ({
    data: undefined,
    error: null,
    isError: false,
    isPending: false,
    isLoading: false,
    isFetching: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: false,
    status: "pending",
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isFetched: false,
    isFetchedAfterMount: false,
    isInitialLoading: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetching: false,
    isStale: false,
    refetch: jest.fn(),
    fetchStatus: "idle",
    ...overrides,
  } as UseQueryResult<T, Error>);
describe("useCountries hook", () => {
  beforeEach(() => {
    mockedGetListOfCountry.mockResolvedValue([]);

    mockedUseQuery.mockImplementation(({ queryFn, queryKey }) => {
      if (queryFn) {
        queryFn({
          queryKey: queryKey || ["countries"],
          signal: new AbortController().signal,
          meta: undefined,
        });
      }

      return createMockQueryResult({
        isPending: true,
        isLoading: true,
        status: "pending",
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return countries data and loading state", async () => {
    const mockCountries = [
      { id: 1, name: "France" },
      { id: 2, name: "Germany" },
    ];

    mockedUseQuery.mockImplementation(() =>
      createMockQueryResult({
        data: mockCountries,
        isPending: false,
        isLoading: false,
        isSuccess: true,
        status: "success",
      }),
    );

    const { result } = renderHook(() => useCountries());

    expect(result.current).toEqual({
      countries: mockCountries,
      isLoading: false,
    });
  });

  it("should call useQuery with correct parameters", () => {
    renderHook(() => useCountries());

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["countries"],
      queryFn: getListOfCountry,
      staleTime: Infinity,
    });
  });

  it("should handle loading state correctly", () => {
    mockedUseQuery.mockImplementation(() =>
      createMockQueryResult({
        isPending: true,
        isLoading: true,
        status: "pending",
      }),
    );

    const { result } = renderHook(() => useCountries());

    expect(result.current).toEqual({
      countries: undefined,
      isLoading: true,
    });
  });

  it("should call the API function", async () => {
    renderHook(() => useCountries());

    await waitFor(() => {
      expect(mockedGetListOfCountry).toHaveBeenCalled();
    });
  });

  it("should handle error state", () => {
    const error = new Error("API error");
    mockedUseQuery.mockImplementation(() =>
      createMockQueryResult({
        error,
        isError: true,
        status: "error",
      }),
    );

    const { result } = renderHook(() => useCountries());

    expect(result.current).toEqual({
      countries: undefined,
      isLoading: false,
    });
  });
});
