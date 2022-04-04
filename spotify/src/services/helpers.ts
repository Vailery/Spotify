import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken,
} from "./authentication";

export const spotifyFetch = async (endpoint: string) => {
  const generateHeaders = () => {
    return {
      Authorization: `Bearer ${getAccessToken()}`,
    };
  };

  const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: generateHeaders(),
  });

  axiosApi.interceptors.response.use(
    (resp) => {
      return resp;
    },
    async function (error) {
      if (error.response.status === 401) {
        await refreshAccessToken();
        return axiosApi.request({
          ...error.config,
          headers: generateHeaders(),
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosApi.get(endpoint).then((response) => response.data);
};

const refreshAccessToken = async () => {
  const formData = new URLSearchParams();

  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", getRefreshToken());

  return new Promise((resolve, reject) => {
    spotifyTokenFetch(formData).then((data) => {
      const accessToken = data.data.access_token;

      updateAccessToken(accessToken, () => {
        resolve(null);
      });
    });
  });
};

const spotifyTokenFetch = async (formData: URLSearchParams) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const Buffer = require("buffer").Buffer;

  return axios
    .create({
      baseURL: "https://accounts.spotify.com",
      headers: {
        Authorization: `Basic ${new Buffer(
          clientId + ":" + clientSecret
        ).toString("base64")}`,
      },
    })
    .post("/api/token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
};

export const setRefreshTokenFromCode = async (
  code: string,
  callback: () => void
) => {
  const formData = new URLSearchParams();

  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", process.env.REACT_APP_CALLBACK_URL!);

  return spotifyTokenFetch(formData).then((data) => {
    const refreshToken = data.data.refresh_token;
    const accessToken = data.data.access_token;

    updateRefreshToken(refreshToken, () => {
      updateAccessToken(accessToken, callback);
    });
  });
};

export const musixMatchFetch = async (endpoint: string) => {
  let musixMatchUrl = process.env.REACT_APP_MUSIXMATCH_BASE_URL + endpoint;
  return axios
    .create({
      baseURL: `https://api.allorigins.win/get?url=${encodeURIComponent(
        musixMatchUrl
      )}`,
    })
    .get("")
    .then((response) => response.data);
};
