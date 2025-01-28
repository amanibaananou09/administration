import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addStations,
  GeneralStationCreteria,
  GeneralStations,
} from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import {
  activateStation,
  deactivateStation,
  getUploadedInformation,
  listStation,
  stationInformation,
  updateStation,
} from "common/api/station-api";
import { useAuth } from "store/AuthContext";
import useQueryParams from "./use-query-params";

export const useStationById = (stationId: number) => {
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const { data: station, isLoading, error } = useQuery({
    queryKey: ["station", stationId],
    queryFn: () => stationInformation(stationId, customerAccountId),
    enabled: !!(stationId && customerAccountId),
  });

  return {
    station,
    isLoading,
    error,
  };
};

export const useStations = (creteria: GeneralStationCreteria) => {
  const query = useQueryParams();
  const { user } = useAuth();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { page, size } = creteria;

  const { data, isLoading, error } = useQuery({
    queryKey: ["stations", { name, creator, parent }, creteria, user],
    queryFn: () => {
      if (user?.customerAccountId) {
        return listStation(
          {
            customerAccountId: user?.customerAccountId,
            name,
            creator,
            parent,
          },
          page,
          size,
        );
      }
    },
    enabled: !!user?.customerAccountId,
    select: (data) => {
      if (!data || !data.content) {
        return data;
      }
      return {
        ...data,
        content: data.content.map((station, index) => ({
          index: creteria.page * creteria.size + index + 1,
          ...station,
        })),
      };
    },
  });

  return {
    stations: data?.content,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    numberOfElements: data?.numberOfElements ?? 0,
    size: data?.size ?? 0,
    isLoading,
    error,
  };
};

export const useStationQueries = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const { mutateAsync: create } = useMutation({
    mutationFn: (newStation: addStations) =>
      addStation(customerAccountId!!, newStation),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stations"],
      });
    },
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: (station: GeneralStations) =>
      updateStation(customerAccountId!!, station),
    onSuccess: (_, station) => {
      queryClient.invalidateQueries({
        queryKey: ["station", station.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["stations"],
      });
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: (stationId: string) =>
      activateStation(customerAccountId!!, stationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stations"] }),
  });

  const { mutate: desactivate } = useMutation({
    mutationFn: (stationId: string) =>
      deactivateStation(user?.customerAccountId!!, stationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stations"] }),
  });

  return {
    update,
    create,
    activate,
    desactivate,
  };
};

export const useUploadedInformation = (
  customerAccountId: string,
  ptsId: string,
) => {
  const { data: information, isLoading, error } = useQuery({
    queryKey: ["information", customerAccountId, ptsId],
    queryFn: () => getUploadedInformation(customerAccountId, ptsId),
    enabled: !!customerAccountId,
  });

  return {
    information,
    isLoading,
    error,
  };
};
