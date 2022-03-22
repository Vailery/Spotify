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
