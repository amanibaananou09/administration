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

export const useUser = (userId: number = 0) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userInformation(userId),
    enabled: !!(userId && userId > 0),
  });

  const { mutate: create } = useMutation({
    mutationFn: addUser,
  });

  const { mutate: update } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      if (userId > 0) {
        return queryClient.invalidateQueries({
          queryKey: ["user", userId],
        });
      }
    },
  });

  const { mutate: activate } = useMutation({
    mutationFn: activateUser,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const { mutate: desactivate } = useMutation({
    mutationFn: deactivateUser,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return {
    isLoading,
    user,
    create,
    update,
    activate,
    desactivate,
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
