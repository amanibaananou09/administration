import { useQuery } from "@tanstack/react-query";
import { listStation } from "common/api/station-api";
import { useAuth } from "store/AuthContext";
import useQueryParams from "./use-query-params";

const useStations = () => {
  const query = useQueryParams();
  const { user } = useAuth();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { data: stations, isPending } = useQuery({
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
    isLoading: isPending,
    stations,
  };
};

export default useStations;
