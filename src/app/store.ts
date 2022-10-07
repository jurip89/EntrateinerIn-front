import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import jobReducer from "./jobs/slice";
export const store = configureStore({
  reducer: { jobs: jobReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
