import { IAlbumData } from "./album";
import { spotifyFetch } from "./helpers";
import { ITrackData, parseTrackData } from "./track";

interface IPlaylist {
  added_at: string;
  track: ITrackData & { album: IAlbumData };
}

export const getUserTracksLibrary = async (
  limit: number = 50,
  offset: number = 0
) => {
  const endpoint = `/me/tracks/?limit=${limit}&offset=${offset}`;
  const response = await spotifyFetch(endpoint);

  const tracks = response.items.map((item: IPlaylist) => {
    const { album } = item.track;
    const parser = parseTrackData(album.id, album.images[0].url, album.name);
    return parser(item.track);
  });

  return tracks;
};
