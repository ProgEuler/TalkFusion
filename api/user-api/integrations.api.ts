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
    getIgUrl: builder.query({
      query: () => "/connect/ig/"
    }),
  }),
});

export const { useGetCalendarUrlMutation, useGetFbUrlQuery, useGetIgUrlQuery } = integrationsApi;
