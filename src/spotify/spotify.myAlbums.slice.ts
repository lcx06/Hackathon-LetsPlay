import { createSlice } from "@reduxjs/toolkit";

import type { Album } from "types";

type SpotifyMyAlbumsState = {
  albums: Array<Album>;
};

const initialState: SpotifyMyAlbumsState = {
  albums: [],
};

export const spotifyMyAlbumsSlice = createSlice({
  name: "spotifyMyAlbums",
  initialState,
  reducers: {
    updateMyAlbums: (state, action) => {
      state.albums = action.payload;
    },
  },
});

export const { updateMyAlbums } = spotifyMyAlbumsSlice.actions;

export const spotifyMyAlbumsReducer = spotifyMyAlbumsSlice.reducer;
