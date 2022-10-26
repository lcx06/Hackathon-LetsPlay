import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import { doAuthorizedCall } from "./spotify.api";
import type { TrackList } from "types";
import { updateMyTracks } from "spotify/spotify.mySongs.slice";

export const getMyTracks =
  (next?: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: TrackList = await doAuthorizedCall({
      getState,
      url: next ?? "https://api.spotify.com/v1/me/tracks",
      method: "GET",
    });
    dispatch(updateMyTracks({ ...response, add: !!next }));
  };
