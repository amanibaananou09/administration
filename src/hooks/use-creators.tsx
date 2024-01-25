import { useQuery } from "@tanstack/react-query";
import { listOfCreator } from "common/api/station-api";
import { useAuth } from "store/AuthContext";

const useCreators = () => {
  const { user } = useAuth();

  const customerAccountId = user?.customerAccountId;

  const { data: creators } = useQuery({
    queryKey: ["creators"],
    queryFn: () => listOfCreator(user?.customerAccountId),
    enabled: !!customerAccountId,
  });

  return {
    creators,
  };
};

export default useCreators;
