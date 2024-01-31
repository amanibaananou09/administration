import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateUser,
  addUser,
  deactivateUser,
  getUsers,
  updateUser,
  userInformation,
} from "common/api/general-user-api";
import useQueryParams from "./use-query-params";

export const useUserById = (userId: number) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userInformation(userId),
    enabled: !!userId,
  });

  return {
    isLoading,
    user,
    error,
  };
};

export const useUsers = () => {
  const query = useQueryParams();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", { name, creator, parent }],
    queryFn: () =>
      getUsers({
        name,
        creator,
        parent,
      }),
  });

  return {
    isLoading,
    users,
  };
};

export const useUserQueries = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: create } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, user) => {
      queryClient.invalidateQueries({
        queryKey: ["user", user.id],
      });
      return queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: activateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const { mutate: desactivate } = useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return {
    create,
    update,
    activate,
    desactivate,
  };
};
