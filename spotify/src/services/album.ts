import { IArtistData, parseArtistData } from "./artist";
import { parseTrackData, ITrackData } from "./track";

interface Image {
  url: string;
}

export interface IAlbumData {
  artists: IArtistData[];
  id: string;
  name: string;
  images: Image[];
  tracks: { items: ITrackData[] };
  release_date: string;
}

export const parseAlbumData = (data: IAlbumData) => {
  const { name, id, release_date } = data;
  const cover = data.images[0].url;
  const tracks = data.tracks.items.map(
    parseTrackData(id, cover, name, release_date)
  );
  const artists = data.artists.map(parseArtistData);
  const releaseDate = new Date(release_date);

  return { artists, cover, id, name, tracks, releaseDate };
};
