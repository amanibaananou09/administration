import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { getFirmwareVersion } from "../../common/api/configuration-api";
import { useFirmwareVersion } from "../../hooks/use-configuration";

jest.mock("@tanstack/react-query");
jest.mock("../../common/api/configuration-api");

const mockedUseQuery = useQuery as jest.Mock;
const mockedGetFirmwareVersion = getFirmwareVersion as jest.Mock;

describe("useFirmwareVersion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call useQuery with correct parameters when ptsId is provided", () => {
    const ptsId = "test-pts-id";
    const mockFirmwareVersion = "1.2.3";

    mockedUseQuery.mockReturnValue({
      data: mockFirmwareVersion,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useFirmwareVersion(ptsId));

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["firmwareVersion", ptsId],
      queryFn: expect.any(Function),
      enabled: true,
    });

    expect(result.current).toEqual({
      firmwareVersion: mockFirmwareVersion,
      isLoadingg: false,
      error: null,
    });
  });

  it("should not enable the query when ptsId is empty", () => {
    const ptsId = "";

    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderHook(() => useFirmwareVersion(ptsId));

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ["firmwareVersion", ptsId],
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it("should return loading state correctly", () => {
    const ptsId = "test-pts-id";

    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useFirmwareVersion(ptsId));

    expect(result.current.isLoadingg).toBe(true);
  });

  it("should return error state correctly", () => {
    const ptsId = "test-pts-id";
    const mockError = new Error("API Error");

    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
    });

    const { result } = renderHook(() => useFirmwareVersion(ptsId));

    expect(result.current.error).toBe(mockError);
  });

  it("should call getFirmwareVersion with correct ptsId", async () => {
    const ptsId = "test-pts-id";
    const mockFirmwareVersion = "1.2.3";

    mockedGetFirmwareVersion.mockResolvedValue(mockFirmwareVersion);

    mockedUseQuery.mockImplementation(({ queryFn }) => {
      const data = queryFn ? queryFn() : Promise.resolve(undefined);

      return {
        data: data instanceof Promise ? undefined : data,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useFirmwareVersion(ptsId));

    await waitFor(() => {
      expect(mockedGetFirmwareVersion).toHaveBeenCalledWith(ptsId);
    });

    mockedUseQuery.mockReturnValue({
      data: mockFirmwareVersion,
      isLoading: false,
      error: null,
    });

    const { result: updatedResult } = renderHook(() =>
      useFirmwareVersion(ptsId),
    );

    expect(updatedResult.current.firmwareVersion).toBe(mockFirmwareVersion);
  });
});
