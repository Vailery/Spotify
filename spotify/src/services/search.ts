import { IAlbumData, parseAlbumData } from "./album";
import { spotifyFetch } from "./helpers";
import { parseSubscriptionsData } from "./subscriptions";
import { ITrackData, parseTrackData } from "./track";

export const getSearchResult = async (
  search: string,
  offset: number = 0,
  limit: number = 50
) => {
  const endpoint = `/search?q=${search}&type=album,artist,track&limit=${limit}&offset=${offset}`;
  const response = await spotifyFetch(endpoint);

  const albums = response.albums.items.map(parseAlbumData);
  const artist = response.artists.items.map(parseSubscriptionsData);
  const tracks = response.tracks.items.map(
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

  return { albums, artist, tracks };
};
