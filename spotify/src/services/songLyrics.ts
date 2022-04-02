import { musixMatchFetch } from "./helpers";

export const getSongLyrics = async (track?: string, artist?: string) => {
  const endpoint = `/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`;
  const response = await musixMatchFetch(endpoint);

  const str =
    "<br /><br />******* This Lyrics is NOT for Commercial use *******";
  const text = response.message.body.lyrics.lyrics_body.replace(
    /\n/g,
    "<br />"
  );

  const lyrics = text.substring(0, text.length - str.length);

  return lyrics;
};
