import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GeneralStations, addStations } from "common/AdminModel";
import { addStation } from "common/api/customerAccount-api";
import {
  activateStation,
  deactivateStation,
  stationInformation,
  updateStation,
} from "common/api/station-api";
import { useAuth } from "store/AuthContext";

const useStation = (stationId: number = 0) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const { data: station, isPending } = useQuery({
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
    isLoading: isPending,
    update,
    create,
    activate,
    desactivate,
  };
};

export default useStation;
