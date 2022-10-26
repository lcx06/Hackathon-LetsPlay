import { createSlice } from "@reduxjs/toolkit";

import type { Track, TrackList } from "types";

type SpotifyMySongsState = {
  tracks: Track[];
  next?: string;
};

const initialState: SpotifyMySongsState = {
  tracks: [],
  next: undefined
};

export const spotifyMyTracksSlice = createSlice({
  name: "spotifyMyTracks",
  initialState,
  reducers: {
    updateMyTracks: (state, { payload }: { payload: TrackList }) => {
      const tracks = payload.items.map((item) => item.track);
      state.tracks = payload.add ? [...state.tracks, ...tracks] : tracks;

      state.next = payload.next;
    },
  },
});

export const { updateMyTracks } = spotifyMyTracksSlice.actions;

export const spotifyMyTracksReducer = spotifyMyTracksSlice.reducer;
