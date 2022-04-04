import { IArtist, IArtistData, parseArtistData } from "./artist";

export interface ITrack {
  albumName: string;
  albumCover: string;
  albumId: string;
  artists: IArtist[];
  duration: number;
  id: string;
  sourceUrl: string;
  title: string;
  albumReleaseDate: string;
}

export interface ITrackData {
  artists: IArtistData[];
  duration_ms: number;
  id: string;
  preview_url: string;
  name: string;
}

export const parseTrackData =
  (
    albumId: string,
    albumCover: string,
    albumName: string,
    albumReleaseDate: string
  ) =>
  (data: ITrackData) => {
    const title = data.name;
    const sourceUrl = data.preview_url;
    const id = data.id;
    const artists = data.artists.map(parseArtistData);
    const duration = data.duration_ms;

    return {
      id,
      title,
      sourceUrl,
      artists,
      albumCover,
      albumId,
      albumName,
      duration,
      albumReleaseDate,
    };
  };
