import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOldChat: builder.query({
      query: ({ roomId, channel }) => `/chat/old-message/${channel}/${roomId}/`,
      providesTags: ["Chat"],
    }),
    getChatProfileList: builder.query({
      query: (platform) => `/chat/chat-profile-list/?platform=${platform}`,
      providesTags: ["Chat"],
    }),
    subscribeFacebookPage: builder.mutation({
      query: (profileId) => ({
        url: `/chat/subscribe-facebook-page/?profile_id=${profileId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOldChatQuery,
  useGetChatProfileListQuery,
  useSubscribeFacebookPageMutation
} = chatApi;
