import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";

import authReducer from "./authSlice";
import channelReducer from "./channelSlice";
import chatReducer from "./chat.slice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    channel: channelReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
