import { IAlbumData, parseAlbumData } from "./album";
import { spotifyFetch } from "./helpers";
import { ITrackData, parseAlbumTrackData, parseTrackData } from "./track";

interface Image {
  url: string;
}

interface ITotal {
  total: number;
}

interface IArtistData {
  images: Image[];
  id: string;
  name: string;
  followers: ITotal;
}

export interface IArtistInfo {
  id: string;
  name: string;
  avatar: string;
  followers: number;
}

export const parseSubscriptionsData = (data: IArtistData) => {
  const id = data.id;
  const name = data.name;
  const avatar = data.images[0].url;
  const followers = data.followers.total;

  return {
    id,
    name,
    avatar,
    followers,
  };
};

export const getInfoAboutArtists = async (id: string) => {
  const endpoint = `/artists/${id}`;
  const response = await spotifyFetch(endpoint);

  const artist = parseSubscriptionsData(response);

  return { artist };
};

export const getArtistTracks = async (id: string) => {
  const endpoint = `/artists/${id}/top-tracks/?market=BY`;
  const response = await spotifyFetch(endpoint);

  const tracks = response.tracks.map(
    (item: ITrackData & { album: IAlbumData }) => {
      const parser = parseTrackData(
        item.album.id,
        item.album.images[0].url,
        item.album.name,
        item.album.release_date
      );
      return parser(item);
    }
  );

  return tracks;
};

export const getArtistAlbums = async (
  id: string,
  offset: number = 0,
  limit: number = 50
) => {
  const endpoint = `/artists/${id}/albums/?market=BY&limit=${limit}&offset=${offset}`;
  const response = await spotifyFetch(endpoint);

  const album = response.items.map(parseAlbumData);

  return album;
};

export const getInfoAboutArtistAlbum = async (id: string) => {
  const endpoint = `/albums/${id}`;
  const response = await spotifyFetch(endpoint);

  const album = parseAlbumData(response);

  return { album };
};

export const getAlbumTracks = async (
  id: string,
  offset: number = 0,
  limit: number = 50
) => {
  const endpoint = `/albums/${id}/tracks/?limit=${limit}&offset=${offset}`;
  const response = await spotifyFetch(endpoint);

  const tracks = response.items.map((item: ITrackData) => {
    return parseAlbumTrackData(item);
  });

  return tracks;
};
