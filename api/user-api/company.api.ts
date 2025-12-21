import { baseApi } from "../baseApi";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCompany: builder.mutation({
      query: (body) => ({
        url: `/auth/company/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    addOpenningHour: builder.mutation({
      query: (body) => ({
        url: "/opening-hours/",
        method: "POST",
        body,
      }),
    }),
    addService: builder.mutation({
      query: (body) => ({
        url: "/auth/company/service/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    getServices: builder.query({ query: () => "/auth/company/service/" }),
    getOpeningHours: builder.query({ query: () => "/opening-hours/" }),
    uploadAiFiles: builder.mutation({
      query: (file) => ({
         url: "/ai-training-files/",
         method: 'POST',
         body: file
      })
    })
  }),
});

export const {
  useUpdateCompanyMutation,
  useAddOpenningHourMutation,
  useGetServicesQuery,
  useGetOpeningHoursQuery,
  useAddServiceMutation,
  useUploadAiFilesMutation
} = companyApi;
