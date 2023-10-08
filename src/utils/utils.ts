import jwt_decode from "jwt-decode";

interface DecodedToken {
  sid: string;
  name: string;
  preferred_username: string;
  realm_access: {
    roles: string[];
  };
  email: string;
  exp: number;
}

interface DecodedTokenResult {
  id: string;
  fullName: string;
  username: string;
  role: string;
  token: string;
  email: string;
  expireTime: number;
}

export const decodeToken = (
  token: string | null,
): DecodedTokenResult | null => {
  if (!token) {
    return null;
  }

  const decodedToken: DecodedToken = jwt_decode(token);

  const {
    sid,
    name,
    preferred_username,
    realm_access,
    email,
    exp,
  } = decodedToken;

  return {
    id: sid,
    fullName: name,
    username: preferred_username,
    role: realm_access.roles[0],
    token,
    email,
    expireTime: exp * 1000,
  };
};
