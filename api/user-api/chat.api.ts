import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOldChat: builder.query({
      query: ({ roomId, channel }) => `/chat/old-message/${channel}/${roomId}/`,
    }),
  }),
});

export const { useGetOldChatQuery } = chatApi;
