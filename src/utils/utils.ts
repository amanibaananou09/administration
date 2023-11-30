import { Decode, User } from "common/model";
import jwt_decode from "jwt-decode";
import { number } from "yup";

export const decodeToken = (token: string | null): User | null => {
  if (!token) {
    return null;
  }

  const {
    sid,
    family_name,
    given_name,
    preferred_username,
    realm_access,
    email,
    exp,
    phone,
    name,
    customerAccountId,
  } = jwt_decode<Decode>(token);

  const user: User = {
    id: sid,
    phone: phone,
    name: name,
    firstName: given_name,
    lastName: family_name,
    username: preferred_username,
    role: realm_access.roles[0],
    token: token || "",
    email,
    expireTime: exp * 1000,
    customerAccountId: customerAccountId,
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

export const formatNumber = (value: number) => {
  return parseFloat(value.toFixed(2));
};

export const getColorForTankLevel = (level: number): string => {
  if (level >= 90) {
    return "#07C100";
  } else if (level >= 60) {
    return "#1FC32F";
  } else if (level >= 50) {
    return "#EAA817";
  } else if (level >= 30) {
    return "#EA8B17";
  } else {
    return "#E02200";
  }
};
