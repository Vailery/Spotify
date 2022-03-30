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
    .concat(`&response_type=token`)
    .concat(`&scope=${encodeURIComponent(scopes.join(" "))}`)
    .concat(`&show_dialog=true`);
};

export const setSession = (
  accessToken: string,
  tokenLifetime: string,
  callback: () => void
) => {
  const expiresIn = Date.now() + +tokenLifetime * 1000;
  const authority = JSON.stringify({ accessToken, expiresIn });

  localStorage.setItem("authority", authority);

  callback();
};

export const checkIsLogged = () => {
  const storedAuthority = localStorage.getItem("authority");
  if (!storedAuthority) return false;

  const authority = JSON.parse(storedAuthority);

  return authority.expiresIn > Date.now();
};

export const getToken = () => {
  const authority = JSON.parse(localStorage.getItem("authority") || "{}");

  const accessToken = authority.accessToken;

  return accessToken;
};

export const clearSession = (callback: () => void) => {
  localStorage.removeItem("authority");

  callback();
};
