import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "/dashboard/?timezone=Asia/Dhaka",
    }),
    getNotifications: builder.query({
      query: () => "/alerts/"
    })
  }),
});

export const { useGetDashboardDataQuery, useGetNotificationsQuery } = dashboardApi;
