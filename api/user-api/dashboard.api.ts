import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "/dashboard/?timezone=Asia/Dhaka",
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
