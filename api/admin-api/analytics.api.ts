import { baseApi } from "../baseApi";

export const adminAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAnalytics: builder.query({
      query: (time_scope = "today") => `/admin/performance-analytics/?timezone=Asia/Dhaka&time_scope=${time_scope}`,
    }),
  }),
});

export const { useGetAdminAnalyticsQuery } = adminAnalyticsApi;
