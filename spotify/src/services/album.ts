import { IArtistData, parseArtistData } from "./artist";
import { ITrackData, parseTrackData } from "./track";

interface Image {
  url: string;
}

export interface IAlbum {
  artists: IArtistData[];
  cover: string;
  id: string;
  name: string;
  releaseDate: Date;
  total: number;
}

export interface IAlbumData {
  artists: IArtistData[];
  id: string;
  name: string;
  images: Image[];
  tracks: { items: ITrackData[] };
  release_date: string;
  total_tracks: number;
}

export const parseAlbumData = (data: IAlbumData) => {
  const { name, id, release_date, total_tracks } = data;
  const cover = data.images[0].url;
  const artists = data.artists.map(parseArtistData);
  const releaseDate = new Date(release_date);
  const total = total_tracks;

  return { artists, cover, id, name, releaseDate, total };
};
