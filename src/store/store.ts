import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import bookingReducer from "./bookingSlice";
import authReducer from "./authSlice";
import { loadState, saveState } from "./localStorage";

const rootReducer = combineReducers({
  search: searchReducer,
  booking: bookingReducer,
  auth: authReducer
});

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    search: store.getState().search, // Saves bus seat availability
    auth: store.getState().auth // Saves users and booking history
  });
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
