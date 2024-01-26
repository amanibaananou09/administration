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

export const useStation = (stationId: number = 0) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const { data: station, isLoading } = useQuery({
    queryKey: ["station", stationId],
    queryFn: () => stationInformation(stationId, customerAccountId),
    enabled: !!(stationId && stationId > 0),
  });

  const { mutate: create } = useMutation({
    mutationFn: (newStation: addStations) =>
      addStation(customerAccountId!!, newStation),
  });

  const { mutate: update } = useMutation({
    mutationFn: (station: GeneralStations) =>
      updateStation(customerAccountId!!, station),
    onSuccess: () => {
      if (stationId > 0) {
        return queryClient.invalidateQueries({
          queryKey: ["customerAccount", customerAccountId],
        });
      }
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: (stationId: string) =>
      activateStation(customerAccountId!!, stationId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["stations"] }),
  });

  const { mutate: desactivate } = useMutation({
    mutationFn: (stationId: string) =>
      deactivateStation(user?.customerAccountId!!, stationId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["stations"] }),
  });

  return {
    station,
    isLoading,
    update,
    create,
    activate,
    desactivate,
  };
};

export const useStations = () => {
  const query = useQueryParams();
  const { user } = useAuth();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { data: stations, isLoading } = useQuery({
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
    isLoading,
    stations,
  };
};
