import { spotifyFetch } from "./helpers";

interface Image {
  url: string;
}

export interface IUserData {
  display_name: string;
  id: string;
  images: Image[];
}

export interface IUserInfo {
  name: string;
  avatarUrl: string;
  id: string;
}

const parseUserData = (data: IUserData) => {
  const name = data.display_name;
  const id = data.id;
  const avatarUrl = data.images[0].url;

  return { avatarUrl, id, name };
};

export const getCurrentUser = async () => {
  const data = await spotifyFetch("/me");
  const user = parseUserData(data);

  return user;
};
