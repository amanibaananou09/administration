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

export const useCustomerAccountById = (customerAccountId: number) => {
  const { data: customerAccount, isLoading, error } = useQuery({
    queryKey: ["customerAccount", customerAccountId],
    queryFn: () => getCustomerAccountDetails(customerAccountId),
    enabled: !!customerAccountId,
  });

  return {
    isLoading,
    customerAccount,
    error,
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

export const useCustomerAccountQueries = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: create } = useMutation({
    mutationFn: createCustomerAccount,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["customerAccounts"],
      });
    },
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: updateAccount,
    onSuccess: (_, customerAccount) => {
      queryClient.invalidateQueries({
        queryKey: ["customerAccount", customerAccount.id],
      });
      return queryClient.invalidateQueries({
        queryKey: ["customerAccounts"],
      });
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: activateCustomerAccount,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["customerAccounts"] }),
  });

  const { mutate: desactivate } = useMutation({
    mutationFn: deactivateCustomerAccount,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["customerAccounts"] }),
  });

  return {
    create,
    update,
    activate,
    desactivate,
  };
};
