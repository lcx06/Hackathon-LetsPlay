import { createSlice } from "@reduxjs/toolkit";

import type { Playlist } from "types";

type SpotifyMyPlaylistsState = {
  playlists: Array<Playlist>;
  next?: string;
};

const initialState: SpotifyMyPlaylistsState = {
  playlists: [],
  next: undefined
};

export const spotifyMyPlaylistsSlice = createSlice({
  name: "spotifyMyPlaylists",
  initialState,
  reducers: {
    updateMyPlaylists: (state, { payload }) => {
      state.playlists = payload.items;
      state.next = payload.next;
    },
  },
});

export const { updateMyPlaylists } = spotifyMyPlaylistsSlice.actions;

export const spotifyMyPlaylistsReducer = spotifyMyPlaylistsSlice.reducer;
