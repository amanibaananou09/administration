import jwt_decode from "jwt-decode";

export interface User {
  id?: string;
  fullName?: string;
  username?: string;
  role?: string;
  token?: string;
  email?: string;
  expireTime?: number;
}

export interface Decode {
  sid: string;
  name: string;
  preferred_username: string;
  realm_access: any;
  email: string;
  exp: number;
}

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
