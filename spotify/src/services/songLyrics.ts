import { musixMatchFetch } from "./helpers";

export const getSongLyrics = async (track?: string, artist?: string) => {
  if (track) {
    track = encodeURIComponent(track);
  }
  if (artist) {
    artist = encodeURIComponent(artist);
  }

  const endpoint = `/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`;
  const response = await musixMatchFetch(endpoint);
  const result = JSON.parse(response.contents);

  const str = ".";
  const text = result.message.body.lyrics.lyrics_body.replace(/\n/g, "<br />");

  const lyrics = text.substring(0, text.lastIndexOf(str)).replace("..", "...");

  return lyrics;
};
