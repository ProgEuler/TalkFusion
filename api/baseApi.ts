import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { logOut, setToken } from "../store/authSlice";
import { updateAccessToken } from "../utils/storage";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const deviceName = Device.modelName;
    const brand = Device.brand;
    const token = (getState() as any).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("User-Agent", `${brand}, ${deviceName}, ${Platform.OS}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as any).auth.refreshToken;

    if (refreshToken) {
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: "/token/refresh/",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newToken = (refreshResult.data as any).access;
        // store the new token
        api.dispatch(setToken({ token: newToken }));
        await updateAccessToken(newToken);

        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  refetchOnReconnect: true,
  tagTypes: ["Topics", "Company", "UploadedFiles", "Chat", "User"],
  endpoints: () => ({}),
});
