import { TopicItem } from "@/app/(user_dashboard)/business-topics";
import { baseApi } from "../baseApi";

export const topicsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<TopicItem[], void>({
      query: () => "/knowledge-base/",
      providesTags: ['Topics'],
    }),
    createTopic: builder.mutation({
      query: (body) => ({
        url: "/knowledge-base/",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Topics'],
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `/knowledge-base/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['Topics'],
    }),
    updateTopic: builder.mutation({
      query: (body) => ({
        url: `/knowledge-base/${body.id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['Topics'],
    }),
  }),
});

export const { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation, useUpdateTopicMutation } = topicsApi;
