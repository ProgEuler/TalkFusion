import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminData: builder.query({
      query: () => "/admin/dashboard/",
    }),
  }),
});

export const { useGetAdminDataQuery } = dashboardApi;
