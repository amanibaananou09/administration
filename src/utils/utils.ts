import jwt_decode from "jwt-decode";
import { Decode, User } from "common/model";


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
