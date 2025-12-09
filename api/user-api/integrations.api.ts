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
         url: "/connect/fb/",
         method: "GET",
      }),
    }),
  }),
});

export const { useGetCalendarUrlMutation, useGetFbUrlQuery } = integrationsApi;
