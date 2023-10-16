import jwtDecode from "jwt-decode";

export const decodedToken = (
    token: string
): { email: string; role: string; iat: number; exp: number } => {
    return jwtDecode(token);
};
