import { baseApi } from "../baseApi";

export const integrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarUrl: builder.mutation({
      query: (body) => ({
        url: "/google/calendar/connect/",
        method: "POST",
        body,
      }),
    }),
    getFbUrl: builder.query({
      query: () => ({
        url: "/connect/fb/?from=app",
        method: "Get",
      }),
    }),
    getWpUrl: builder.query({
      query: () => ({
        url: "/connect/wa/?from=app",
        method: "Get",
      }),
    }),
    getIgUrl: builder.query({
      query: () => "/connect/ig/?from=app",
    }),
    disConnect: builder.mutation({
      query: (body) => ({
        url: "/chat/chat-profile/",
        method: "PATCH",
        body,
      }),
    }),
    botActive: builder.query({
      query: (params) => ({
        url: "/chat/chat-profile/",
        params,
      }),
    }),
  }),
});

export const {
  useGetCalendarUrlMutation,
  useGetFbUrlQuery,
  useGetWpUrlQuery,
  useGetIgUrlQuery,
  useDisConnectMutation,
  useBotActiveQuery,
} = integrationsApi;
