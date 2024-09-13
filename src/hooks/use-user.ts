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
import {
  exitImpersonation,
  impersonateUser,
  searchUser,
} from "../common/api/auth-api";
import { getlog } from "../common/api/customerAccount-api";
import { LogCreteria } from "../common/model";

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
  const { user } = useAuth();
  const customerAccountId = user?.customerAccountId;
  const { data, isLoading } = useQuery({
    queryKey: ["users", { name, creator, parent }, creteria, user],
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

export const useUsersByName = () => {
  const { user } = useAuth();

  const { data: customerAccounts, isLoading, error } = useQuery({
    queryKey: ["customerAccounts", user?.id],
    queryFn: () => searchUser(),
    enabled: !!user?.id,
  });

  return {
    customerAccounts,
    isLoading,
    error,
  };
};

export const useImpersonateUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: impersonate } = useMutation({
    mutationFn: impersonateUser,
    onSuccess: (data, targetUserId) => {
      queryClient.invalidateQueries({ queryKey: ["users", targetUserId] });
    },
    onError: (error) => {
      console.error("Impersonation failed:", error);
    },
  });

  return {
    impersonateUser,
  };
};

export const useExitImpersonation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: exit } = useMutation({
    mutationFn: exitImpersonation,
    onSuccess: (data, targetUserId) => {
      queryClient.invalidateQueries({ queryKey: ["users", targetUserId] });
    },
    onError: (error) => {
      console.error("Exiting impersonation failed:", error);
    },
  });

  return {
    exit,
  };
};
export const useLog = (
  customerAccountId: string | undefined,
  userId: string | undefined,
  creteria: LogCreteria,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["log", customerAccountId, userId, creteria],
    queryFn: () => getlog(customerAccountId, userId, creteria),
    enabled: !!customerAccountId,
    select: (data) => {
      return {
        ...data,
        content: data.map((log, index) => ({
          index: index + 1,
          ...log,
        })),
      };
    },
  });

  return {
    log: data?.content,
    isLoading,
    error,
  };
};
