import { act, renderHook } from "@testing-library/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "store/AuthContext";
import useQueryParams from "../../hooks/use-query-params";
import {
  useStationById,
  useStationQueries,
  useStations,
  useUploadedInformation,
} from "../../hooks/use-station";
import { addStations, GeneralStations } from "../../common/AdminModel";

jest.mock("@tanstack/react-query");
jest.mock("store/AuthContext");
jest.mock("../../hooks/use-query-params");
jest.mock("common/api/station-api");
jest.mock("common/api/customerAccount-api");

describe("Station Hooks", () => {
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        customerAccountId: "test-account-id",
      },
    });
    (useQueryParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("useStationById", () => {
    it("should fetch station by id when enabled", () => {
      const mockStation = { id: 1, name: "Test Station" };
      (useQuery as jest.Mock).mockReturnValue({
        data: mockStation,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useStationById(1));

      expect(useQuery).toHaveBeenCalledWith({
        queryKey: ["station", 1],
        queryFn: expect.any(Function),
        enabled: true,
      });
      expect(result.current).toEqual({
        station: mockStation,
        isLoading: false,
        error: null,
      });
    });

    it("should not fetch when stationId or customerAccountId is missing", () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
      });

      (useAuth as jest.Mock).mockReturnValue({ user: null });

      const { result } = renderHook(() => useStationById(0));

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );

      expect(result.current).toEqual({
        station: undefined,
        isLoading: false,
        error: null,
      });
    });
  });

  describe("useStations", () => {
    it("should fetch stations with criteria", () => {
      const mockData = {
        content: [{ id: 1, name: "Station 1" }],
        totalPages: 1,
        totalElements: 1,
      };
      (useQuery as jest.Mock).mockReturnValue({
        data: mockData,
        isLoading: false,
        error: null,
      });

      const criteria = { page: 0, size: 10 };
      const { result } = renderHook(() => useStations(criteria));

      expect(useQuery).toHaveBeenCalledWith({
        queryKey: [
          "stations",
          { name: undefined, creator: undefined, parent: undefined },
          criteria,
          expect.anything(),
        ],
        queryFn: expect.any(Function),
        enabled: true,
        select: expect.any(Function),
      });
      expect(result.current).toEqual({
        stations: mockData.content,
        totalPages: 1,
        totalElements: 1,
        numberOfElements: 0,
        size: 0,
        isLoading: false,
        error: null,
      });
    });

    it("should apply query params when available", () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: {
          content: [],
          totalPages: 0,
          totalElements: 0,
        },
        isLoading: false,
        error: null,
      });

      (useQueryParams as jest.Mock).mockReturnValue(
        new URLSearchParams("name=test&creator=user1&parent=parent1"),
      );

      renderHook(() => useStations({ page: 0, size: 10 }));

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: [
            "stations",
            { name: "test", creator: "user1", parent: "parent1" },
            { page: 0, size: 10 },
            expect.anything(),
          ],
          queryFn: expect.any(Function),
          enabled: true,
          select: expect.any(Function),
        }),
      );
    });

    it("should add index to each station in content", () => {
      const mockData = {
        content: [{ id: 1 }, { id: 2 }],
        totalPages: 1,
      };
      (useQuery as jest.Mock).mockReturnValue({
        data: {
          ...mockData,
          content: mockData.content.map((station, index) => ({
            ...station,
            index: 10 * 0 + index + 1,
          })),
        },
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useStations({ page: 0, size: 10 }));

      expect(result.current.stations?.[0].index).toBe(1);
      expect(result.current.stations?.[1].index).toBe(2);
    });
  });

  describe("useStationQueries", () => {
    it("should provide mutation functions", () => {
      const mockMutateAsync = jest.fn();
      (useMutation as jest.Mock).mockImplementation((config) => ({
        mutateAsync: mockMutateAsync,
        mutate: mockMutateAsync,
      }));

      const { result } = renderHook(() => useStationQueries());

      expect(result.current).toEqual({
        update: expect.any(Function),
        create: expect.any(Function),
        activate: expect.any(Function),
        desactivate: expect.any(Function),
      });
    });

    it("should invalidate queries after successful create", async () => {
      const mockMutateAsync = jest.fn().mockResolvedValue({});
      (useMutation as jest.Mock).mockImplementation(
        ({ onSuccess }: { onSuccess: (data: any) => void }) => ({
          mutateAsync: async (
            ...args: [newStation: addStations, options?: any]
          ) => {
            const result = await mockMutateAsync(...args);
            onSuccess(result);
            return result;
          },
        }),
      );

      const { result } = renderHook(() => useStationQueries());

      await act(async () => {
        await result.current.create({
          name: "Test Station",
          identifier: "test-1",
        } as addStations);
      });

      expect(mockMutateAsync).toHaveBeenCalled();
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["stations"],
      });
    });

    it("should invalidate queries after successful update", async () => {
      const mockMutateAsync = jest.fn().mockResolvedValue({});
      (useMutation as jest.Mock).mockImplementation(({ onSuccess }) => ({
        mutateAsync: async (station: GeneralStations) => {
          const result = await mockMutateAsync(station);
          onSuccess(result, station);
          return result;
        },
      }));

      const { result } = renderHook(() => useStationQueries());

      const station: GeneralStations = {
        id: "1",
        name: "Updated Station",
        identifier: "station-1",
        address: "123 Street",
        city: "City",
        creatorCustomerAccountName: "creator",
        customerAccountId: "customer-1",
        customerAccountName: "Customer",
        creatorAccountId: "creator-account-1",
        account: "Test Account",
        controllerType: "DEFAULT",
        phone: "589632269",
        connection: "connection",
        createdDate: "2013-05-12",
        password: "pass",
        countryId: 1,
        cordonneesGps: "12,1",
        modeAffectation: "AUTO",
        journal: "5",
        actif: true,
        controllerPts: {
          ptsId: "pts123",
          userController: {
            password: "passtest ",
            username: "pts test",
          },
        },
      };

      await act(async () => {
        await result.current.update(station);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith(station);
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["station", station.id],
      });
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["stations"],
      });
    });
  });

  describe("useUploadedInformation", () => {
    it("should fetch uploaded information when enabled", () => {
      const mockInfo = { data: "test-info" };
      (useQuery as jest.Mock).mockReturnValue({
        data: mockInfo,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() =>
        useUploadedInformation("customer-1", "pts-1"),
      );

      expect(useQuery).toHaveBeenCalledWith({
        queryKey: ["information", "customer-1", "pts-1"],
        queryFn: expect.any(Function),
        enabled: true,
      });
      expect(result.current).toEqual({
        information: mockInfo,
        isLoading: false,
        error: null,
      });
    });

    it("should not fetch when customerAccountId is missing", () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useUploadedInformation("", "pts-1"));

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );

      expect(result.current).toEqual({
        information: undefined,
        isLoading: false,
        error: null,
      });
    });
  });
});
