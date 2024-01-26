import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateCustomerAccount,
  createCustomerAccount,
  deactivateCustomerAccount,
  getCustomerAccountDetails,
  updateAccount,
} from "common/api/customerAccount-api";

const useCustomerAccount = (customerAccountId: number = 0) => {
  const queryClient = useQueryClient();

  const { data: customerAccount, isPending } = useQuery({
    queryKey: ["customerAccount", customerAccountId],
    queryFn: () => getCustomerAccountDetails(customerAccountId),
    enabled: !!(customerAccountId && customerAccountId > 0),
  });

  const { mutate: create } = useMutation({
    mutationFn: createCustomerAccount,
    onSuccess: () => {
      if (customerAccountId > 0) {
        return queryClient.invalidateQueries({
          queryKey: ["customerAccount", customerAccountId],
        });
      }
    },
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
    isLoading: isPending,
    customerAccount,
    create,
    update,
    activate,
    desactivate,
  };
};

export default useCustomerAccount;
