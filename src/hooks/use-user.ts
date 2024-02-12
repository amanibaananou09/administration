import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateUser,
  addUser,
  deactivateUser,
  getUsers,
  updateUser,
  userInformation,
} from "common/api/general-user-api";
import { GeneralUserCreteria } from "../common/AdminModel";
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

export const useUsers = (creteria: GeneralUserCreteria) => {
  const query = useQueryParams();
  const name = query.get("name") ?? undefined;
  const creator = query.get("creator") ?? undefined;
  const parent = query.get("parent") ?? undefined;

  const { page, size } = creteria;

  const { data, isLoading } = useQuery({
    queryKey: ["users", { name, creator, parent }, creteria],
    queryFn: () =>
      getUsers(
        {
          name,
          creator,
          parent,
        },
        page,
        size,
      ),
  });

  return {
    isLoading,
    users: data?.content,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    numberOfElements: data?.numberOfElements ?? 0,
    size: data?.size ?? 0,
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
