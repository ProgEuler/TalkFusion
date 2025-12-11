import { baseApi } from "../baseApi";

export const sessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => "/auth/sessions/"
    }),
  }),
});

export const { useGetSessionsQuery } = sessionsApi;
