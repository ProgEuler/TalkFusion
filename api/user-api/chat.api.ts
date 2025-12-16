import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOldChat: builder.query({
      query: ({ id, channel }) => `/chat/old-message/${channel}/${id}/`,
    }),
  }),
});

export const { useGetOldChatQuery } = chatApi;
