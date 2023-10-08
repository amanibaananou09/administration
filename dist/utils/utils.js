import jwt_decode from "jwt-decode";
export const decodeToken = (token) => {
    if (!token) {
        return null;
    }
    const decodedToken = jwt_decode(token);
    const { sid, name, preferred_username, realm_access, email, exp, } = decodedToken;
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
