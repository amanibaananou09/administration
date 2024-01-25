import { useQuery } from "@tanstack/react-query";
import { getCustomerAccounts } from "common/api/customerAccount-api";
import useQueryParams from "./use-query-params";

const useCustomerAccounts = () => {
  const query = useQueryParams();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { data: customerAccounts, isLoading } = useQuery({
    queryKey: ["customerAccounts", { name, creator, parent }],
    queryFn: () =>
      getCustomerAccounts({
        name,
        creator,
        parent,
      }),
  });

  return {
    isLoading,
    customerAccounts,
  };
};

export default useCustomerAccounts;
