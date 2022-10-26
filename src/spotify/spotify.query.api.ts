import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import { doAuthorizedCall } from "./spotify.api";
import type { TrackList } from "types";
import { setResults } from "spotify/spotify.query.slice";

export const makeQuery =
  (input: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: TrackList = await doAuthorizedCall({
      getState,
      url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(input)}&type=track,album,playlist`,
      method: "GET",
    });
    dispatch(setResults(response));
  };
