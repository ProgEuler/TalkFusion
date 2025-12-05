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
  }),
});

export const { useGetCalendarUrlMutation } = integrationsApi;
