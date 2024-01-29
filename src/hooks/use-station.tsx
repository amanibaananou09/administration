import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GeneralStations, addStations } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import {
  activateStation,
  deactivateStation,
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

export const useStations = () => {
  const query = useQueryParams();
  const { user } = useAuth();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { data: stations, isLoading, error } = useQuery({
    queryKey: ["stations", { name, creator, parent }],
    queryFn: () => {
      if (user?.customerAccountId) {
        return listStation({
          customerAccountId: user?.customerAccountId,
          name,
          creator,
          parent,
        });
      }
    },
    enabled: !!user?.customerAccountId,
  });

  return {
    stations,
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
