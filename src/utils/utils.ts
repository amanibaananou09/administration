import { Decode, User } from "common/model";
import jwt_decode from "jwt-decode";

export const decodeToken = (token: string | null): User | null => {
  if (!token) {
    return null;
  }

  const {
    sid,
    name,
    preferred_username,
    realm_access,
    email,
    exp,
  } = jwt_decode<Decode>(token);

  const user: User = {
    id: sid,
    fullName: name,
    username: preferred_username,
    role: realm_access.roles[0],
    token: token || "",
    email,
    expireTime: exp * 1000,
  };

  return user;
};

export const formatDate = (dateTimeStart: string): string => {
  return new Date(dateTimeStart).toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
