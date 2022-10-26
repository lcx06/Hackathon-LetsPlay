import { createSlice } from "@reduxjs/toolkit";

import type { Track, TrackList } from "types";

type SpotifyPlaylistTracksState = {
  name: string;
  description: string;
  images: Array<{ url: string, height: number, width: number }>;

  tracks: Track[];
  next?: string;
};

const initialState: SpotifyPlaylistTracksState = {
  name: "",
  description: "",
  images: [],

  tracks: [],
  next: undefined
};

export const spotifyPlaylistTracksSlice = createSlice({
  name: "spotifyPlaylistTracks",
  initialState,
  reducers: {
    updatePlaylistTracks: (state, { payload }: { payload: TrackList }) => {
      const tracks = payload.items.map((item) => item.track);
      state.tracks = payload.add ? [...state.tracks, ...tracks] : tracks;

      state.next = payload.next;
    },
    updatePlaylistInfo: (state, { payload }) => {
      state.name = payload.name;
      state.description = payload.description;
      state.images = payload.images;
    }
  },
});

export const { updatePlaylistTracks, updatePlaylistInfo } = spotifyPlaylistTracksSlice.actions;

export const spotifyPlaylistTracksReducer = spotifyPlaylistTracksSlice.reducer;
