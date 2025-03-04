import { useQuery } from "@tanstack/react-query";
import { getFirmwareVersion } from "../common/api/configuration-api";

export const useFirmwareVersion = (ptsId: string) => {
  const { data: firmwareVersion, isLoading: isLoadingg, error } = useQuery({
    queryKey: ["firmwareVersion", ptsId],
    queryFn: () => getFirmwareVersion(ptsId),
    enabled: !!ptsId,
  });

  return {
    firmwareVersion,
    isLoadingg,
    error,
  };
};
