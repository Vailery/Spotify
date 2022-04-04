const authorityParam = "authority";
const accessTokenParam = "accessToken";
const refreshTokenParam = "refreshToken";
const recentParam = "recent";

export const getSpotifyAuthURL = () => {
  const authURL = process.env.REACT_APP_AUTHORIZATION_URL;
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const redirectURL = process.env.REACT_APP_CALLBACK_URL;
  const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-read-recently-played",
    "user-follow-read",
    "user-library-read",
  ];

  return `${authURL}/?client_id=${clientID}`
    .concat(`&redirect_uri=${redirectURL}`)
    .concat(`&response_type=code`)
    .concat(`&scope=${encodeURIComponent(scopes.join(" "))}`)
    .concat(`&show_dialog=true`);
};

export const updateAccessToken = (
  accessToken: string,
  callback: () => void
) => {
  const authority = JSON.parse(localStorage.getItem(authorityParam) || "{}");

  authority[accessTokenParam] = accessToken;

  localStorage.setItem(authorityParam, JSON.stringify(authority));

  callback();
};

export const updateRefreshToken = (
  refreshToken: string,
  callback: () => void
) => {
  const authority = JSON.parse(localStorage.getItem(authorityParam) || "{}");

  authority[refreshTokenParam] = refreshToken;

  localStorage.setItem(authorityParam, JSON.stringify(authority));

  callback();
};

export const checkIsLogged = () => {
  const storedAuthority = localStorage.getItem(authorityParam);
  if (!storedAuthority) return false;

  const authority = JSON.parse(storedAuthority);

  return (
    authority[refreshTokenParam] != null &&
    authority[refreshTokenParam] != undefined
  );
};

export const getAccessToken = () => {
  const authority = localStorage.getItem(authorityParam);
  if (!authority) {
    return null;
  }

  const authorityObj = JSON.parse(authority);
  const accessToken = authorityObj[accessTokenParam] || null;

  return accessToken;
};

export const getRefreshToken = () => {
  const authority = JSON.parse(localStorage.getItem(authorityParam) || "{}");

  const refreshToken = authority[refreshTokenParam];

  return refreshToken;
};

export const clearSession = (callback: () => void) => {
  localStorage.removeItem(authorityParam);
  localStorage.removeItem(recentParam);

  callback();
};
