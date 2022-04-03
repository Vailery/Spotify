import axios from "axios";
import { getToken } from "./authentication";

export const spotifyFetch = async (endpoint: string) => {
  return axios
    .create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .get(endpoint)
    .then((response) => response.data);
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
