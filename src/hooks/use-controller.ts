import { useQuery } from "@tanstack/react-query";
import { dateTime } from "../common/api/controller-api";
import { GeneralStations } from "../common/AdminModel";

export const useDateByController = (
  station: GeneralStations | undefined,
  customerAccountId: string | undefined,
) => {
  const {
    data: DateTime,
    isLoading: isLoadings,
    error,
    refetch: refetchDateTime,
  } = useQuery({
    queryKey: ["DateTime", station?.id, customerAccountId],
    queryFn: () => dateTime(customerAccountId, station?.id),
    enabled: !!(station?.id && customerAccountId),
  });

  return {
    DateTime,
    isLoadings,
    error,
    refetchDateTime,
  };
};
