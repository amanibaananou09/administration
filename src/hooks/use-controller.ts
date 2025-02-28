import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../store/AuthContext";
import { dateTime } from "../common/api/controller-api";
import { GeneralStations } from "../common/AdminModel";

export const useDateByController = (station: GeneralStations | undefined) => {
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;

  const { data: DateTime, isLoading: isLoadings, error } = useQuery({
    queryKey: ["DateTime", station?.id, customerAccountId],
    queryFn: () => dateTime(customerAccountId, station?.id),
    enabled: !!(station && customerAccountId),
  });

  return {
    DateTime,
    isLoadings,
    error,
  };
};
