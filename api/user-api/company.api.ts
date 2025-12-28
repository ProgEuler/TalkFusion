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
    getCompany: builder.query({
      query: () => "/auth/company/",
      providesTags: ["Company"],
    }),
    getServices: builder.query({ query: () => "/auth/company/service/" }),
    getOpeningHours: builder.query({ query: () => "/opening-hours/" }),
    uploadAiFiles: builder.mutation({
      query: (file) => ({
         url: "/ai-training-files/",
         method: 'POST',
         body: file
      }),
      invalidatesTags: ["UploadedFiles"],
    }),
    getUploadedFiles: builder.query({
      query: () => "ai-training-files/",
      providesTags: ["UploadedFiles"],
    }),
    getActivity: builder.query({ query: () => "/log/" }),
    getKnowledgeBase: builder.query({ query: () => "/knowledge-category/" })
  }),
});

export const {
  useUpdateCompanyMutation,
  useGetCompanyQuery,
  useAddOpenningHourMutation,
  useGetServicesQuery,
  useGetOpeningHoursQuery,
  useAddServiceMutation,
  useUploadAiFilesMutation,
  useGetUploadedFilesQuery,
  useGetActivityQuery,
  useGetKnowledgeBaseQuery
} = companyApi;
