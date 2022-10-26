import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import { doAuthorizedCall } from "./spotify.api";
import type { Playlist } from "types";
import { updateMyPlaylists } from "spotify/spotify.myPlaylists.slice";

type PlaylistsReponse = {
  items: Array<Playlist>;
  next?: string;
};

export const getMyPlaylists =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: PlaylistsReponse = await doAuthorizedCall({
      getState,
      url: "https://api.spotify.com/v1/me/playlists",
      method: "GET",
    });
    dispatch(updateMyPlaylists(response));
  };
