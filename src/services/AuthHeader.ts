import { getAccessToken, isValidToken, refreshAccessToken } from "./AuthService";

export const authHeader = async () => {
  console.debug("authHeader");
  const token = await getAccessToken();

  if (token) {
    if (!await isValidToken()) {
      refreshAccessToken();
    }

    return { 'Authorization': token };
  }

  return {'Authorization': ""};
}
