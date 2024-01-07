import { getUserByEmail, getUserByUsername } from "common/api/general-user-api";
import { Decode, User } from "common/model";
import jwt_decode from "jwt-decode";
import { debounce } from "lodash";
import moment, { Moment } from "moment";

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

export const createPeriod = (period: string) => {
  let fromDate: Moment = moment();
  let toDate: Moment = moment();

  switch (period) {
    case "today":
      fromDate = moment();
      toDate = moment();

      break;
    case "yesterday":
      fromDate = moment().subtract(1, "day");
      toDate = moment().subtract(1, "day");

      break;
    case "weekly":
      fromDate = moment().startOf("week");
      toDate = moment().endOf("week");

      break;
    case "monthly":
      fromDate = moment().startOf("month");
      toDate = moment().endOf("month");

      break;
    case "yearly":
      fromDate = moment().startOf("year");
      toDate = moment().endOf("year");

    default:
      break;
  }

  let formattedFromDate = fromDate.hour(0).minute(0).format("YYYY-MM-DDTHH:mm");
  let formattedToDate = toDate.hour(23).minute(59).format("YYYY-MM-DDTHH:mm");

  return {
    fromDate: formattedFromDate,
    toDate: formattedToDate,
  };
};

export const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.slice(0, limit) + "...";
  }
};

export const isUsernameExist = debounce(async (username: string) => {
  return new Promise(async (resolve, reject) => {
    getUserByUsername(username)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}, 500);

export const isEmailExist = debounce(async (email: string) => {
  return new Promise(async (resolve, reject) => {
    getUserByEmail(email)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}, 500);
