export interface IArtist {
  avatar: string;
  id: string;
  name: string;
}

export interface IArtistData {
  name: string;
  id: string;
  avatar?: string;
}

export const parseArtistData = (data: IArtistData) => {
  const name = data.name;
  const id = data.id;
  const avatar = data.avatar ?? "";

  return { id, name, avatar };
};
