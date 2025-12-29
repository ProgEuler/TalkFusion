import NetInfo from '@react-native-community/netinfo';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
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

// Custom listener for React Native using NetInfo
setupListeners(store.dispatch, (dispatch, { onOnline, onOffline }) => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      dispatch(onOnline());
    } else {
      dispatch(onOffline());
    }
  });

  return unsubscribe;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
