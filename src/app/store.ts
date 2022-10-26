import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducers } from "store";

export const store = configureStore({
  reducer: {
    ...reducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
