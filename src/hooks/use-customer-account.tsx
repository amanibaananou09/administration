import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateCustomerAccount,
  createCustomerAccount,
  deactivateCustomerAccount,
  getCustomerAccountDetails,
  getCustomerAccounts,
  updateAccount,
} from "common/api/customerAccount-api";
import useQueryParams from "./use-query-params";

export const useCustomerAccount = (customerAccountId: number = 0) => {
  const queryClient = useQueryClient();

  const { data: customerAccount, isLoading } = useQuery({
    queryKey: ["customerAccount", customerAccountId],
    queryFn: () => getCustomerAccountDetails(customerAccountId),
    enabled: !!(customerAccountId && customerAccountId > 0),
  });

  const { mutate: create } = useMutation({
    mutationFn: createCustomerAccount,
  });

  const { mutate: update } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      if (customerAccountId > 0) {
        return queryClient.invalidateQueries({
          queryKey: ["customerAccount", customerAccountId],
        });
      }
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: activateCustomerAccount,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["customerAccounts"] }),
  });

  const { mutate: desactivate } = useMutation({
    mutationFn: deactivateCustomerAccount,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["customerAccounts"] }),
  });

  return {
    isLoading,
    customerAccount,
    create,
    update,
    activate,
    desactivate,
  };
};

export const useCustomerAccounts = () => {
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
