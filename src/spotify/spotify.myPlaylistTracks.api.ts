import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import { doAuthorizedCall } from "./spotify.api";
import type { TrackList } from "types";
import { updatePlaylistInfo, updatePlaylistTracks } from "spotify/spotify.myPlaylistTracks.slice";

export const getPlaylistTracks =
  (
    id: string,
    next?: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: TrackList = await doAuthorizedCall({
      getState,
      url: next ?? `https://api.spotify.com/v1/playlists/${id}/tracks`,
      method: "GET",
    });
    dispatch(updatePlaylistTracks({ ...response, add: !!next }));
  };

export const getPlaylistInfo =
  (
    id: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: TrackList = await doAuthorizedCall({
      getState,
      url: `https://api.spotify.com/v1/playlists/${id}`,
      method: "GET",
    });
    dispatch(updatePlaylistInfo(response));
  };
