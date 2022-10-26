import { RootState } from "app/store";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import { doAuthorizedCall } from "./spotify.api";
import { updateProfileData } from "./spotify.profile.slice";

type ProfileResponse = {
  display_name: string;
  images: Array<{
    url: string;
  }>;
};

export const getUserProfile =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const response: ProfileResponse = await doAuthorizedCall({
      getState,
      url: "https://api.spotify.com/v1/me",
      method: "GET",
    });
    const displayName = response.display_name;
    const avatar = response.images?.[0]?.url ?? "";
    dispatch(updateProfileData({ displayName, avatar }));
  };
