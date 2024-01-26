import { useQuery } from "@tanstack/react-query";
import { getUsers } from "common/api/general-user-api";
import useQueryParams from "./use-query-params";

const useUsers = () => {
  const query = useQueryParams();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { data: users, isPending } = useQuery({
    queryKey: ["users", { name, creator, parent }],
    queryFn: () =>
      getUsers({
        name,
        creator,
        parent,
      }),
  });

  return {
    isLoading: isPending,
    users,
  };
};

export default useUsers;
