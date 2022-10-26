import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import { doAuthorizedCall } from "./spotify.api";
import { updateMyAlbums } from "./spotify.myAlbums.slice";
import type { Album } from "types";

type AlbumsResponse = {
  items: Array<{
    album: Album;
  }>;
};

export const getMyAlbums =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: AlbumsResponse = await doAuthorizedCall({
      getState,
      url: "https://api.spotify.com/v1/me/albums",
      method: "GET",
    });
    dispatch(updateMyAlbums(response.items.map((item) => item.album)));
  };
