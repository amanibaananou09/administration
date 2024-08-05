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
import { useAuth } from "../store/AuthContext";
import { searchUser } from "../common/api/auth-api";

export const useUserById = (userId: number) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
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
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;
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
        customerAccountId,
      ),
    select: (data) => {
      return {
        ...data,
        content: data.content.map((user, index) => ({
          index: creteria.page * creteria.size + index + 1,
          ...user,
        })),
      };
    },
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

export const useUsersByName = (name: string) => {
  const { user } = useAuth();

  const {
    data: listUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listUser", user?.id, name],
    queryFn: () => searchUser(name),
    enabled: !!user?.id,
  });

  return {
    listUser,
    isLoading,
    error,
  };
};
