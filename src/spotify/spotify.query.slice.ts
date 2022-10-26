import { createSlice } from "@reduxjs/toolkit";

import type { Album, Playlist, Track } from "types";

type SpotifyQueryState = {
  results: (Track | Album | Playlist)[];
};

const initialState: SpotifyQueryState = {
  results: [],
};

export const spotifyQuerySlice = createSlice({
  name: "spotifyQuery",
  initialState,
  reducers: {
    setResults: (state, { payload }) => {
      const data = []
      data.push(...payload.tracks.items);
      data.push(...payload.albums.items);
      data.push(...payload.playlists.items);
      state.results = data;
    },
  },
});

export const { setResults } = spotifyQuerySlice.actions;

export const spotifyQueryReducer = spotifyQuerySlice.reducer;
