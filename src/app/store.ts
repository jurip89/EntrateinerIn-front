import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import jobReducer from "./jobs/slice";
import talentReducer from "./talents/slice";
import authReducer from './user/slice'
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    talents: talentReducer,
    auth:authReducer
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
