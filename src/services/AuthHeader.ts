import { getAccessToken, isValidToken, refreshAccessToken } from "./AuthService";

export const authHeader = async () => {
  console.debug("authHeader");

  if (!await isValidToken()) {
    refreshAccessToken();
  }

  const token = await getAccessToken();

  if (token)
    return { 'Authorization': token };


  return { 'Authorization': "" };
}

export const authHeaderWithContentType = async () => {
  let authorization = (await authHeader()).Authorization;
  return {
    authorization,
    'Content-Type': 'application/json'
  };
}
