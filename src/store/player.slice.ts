import { createSlice } from "@reduxjs/toolkit";

type PlayerState = {
  playing: number;
  queue: Array<string>;
  shouldPlay: boolean;
};

const initialState: PlayerState = {
  playing: -1,
  queue: [],
  shouldPlay: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playNow: (state, action) => {
      if (!action.payload) return;

      if (state.playing === -1) {
        state.queue.push(action.payload);
        state.playing = 0;
      } else state.queue[state.playing] = action.payload;
      state.shouldPlay = true;
    },
    addToQueue: (state, action) => {
      if (!action.payload) return;

      state.queue.push(action.payload);
      if (state.playing === -1) {
        state.playing = 0;
        state.shouldPlay = true;
      }
    },
    addAllToQueue: (state, action) => {
      state.queue.push(...action.payload.filter((track: string) => track != null));
      if (state.playing === -1) {
        state.playing = 0;
        state.shouldPlay = true;
      }
    },
    nextTrack: (state) => {
      if (state.playing === -1) return;
      state.playing++;
      if (state.playing >= state.queue.length) {
        state.playing = -1;
        state.queue = [];
      }
    },
    previousTrack: (state) => {
      if (state.playing === -1) return;

      state.playing--;
      if (state.playing < 0) {
        state.playing = -1;
        state.queue = [];
      }
    },
    clearShouldPlay: (state) => {
      state.shouldPlay = false;
    }
  },
});

export const { playNow, addToQueue, addAllToQueue, nextTrack, previousTrack, clearShouldPlay } = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
