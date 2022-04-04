interface Image {
  url: string;
}

interface IArtistData {
  images: Image[];
  id: string;
  name: string;
}

export interface IArtistInfo {
  id: string;
  name: string;
  avatar: string;
}

export const parseSubscriptionsData = (data: IArtistData) => {
  const id = data.id;
  const name = data.name;
  const avatar = data.images[0].url;

  return {
    id,
    name,
    avatar,
  };
};
