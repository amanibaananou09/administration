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
import { CustomerAccountCreteria } from "../common/AdminModel";

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

export const useCustomerAccounts = (creteria: CustomerAccountCreteria) => {
  const query = useQueryParams();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { page } = creteria;

  const { data, isLoading } = useQuery({
    queryKey: ["customerAccounts", { name, creator, parent }, creteria],
    queryFn: () =>
      getCustomerAccounts(
        {
          name,
          creator,
          parent,
        },
        page,
      ),
  });

  return {
    isLoading,
    customerAccounts: data?.content,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    numberOfElements: data?.numberOfElements ?? 0,
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
