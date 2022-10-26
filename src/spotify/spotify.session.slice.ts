import { RootState } from "app/store";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "initial",
  accessToken: "",
  refreshToken: "",
  displayName: "",
  avatarURL: "",
};

export const spotifySessionSlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    authorizationRequested: (state) => {
      state.status = "authorizationInProgress";
    },
    hasBeenAuthorized: (state, action) => {
      state.status = "logged";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { hasBeenAuthorized, authorizationRequested, updateAccessToken } =
  spotifySessionSlice.actions;

export const isLoggedIn = (state: RootState) =>
  state.session.status === "logged";

export const spotifySessionReducer = spotifySessionSlice.reducer;
