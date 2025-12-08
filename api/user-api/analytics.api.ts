import { baseApi } from "../baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsData: builder.query({
      query: ({ time, channel, type }: { time?: string; channel?: string; type?: string }) => {
        const params = new URLSearchParams();

        if(time) params.append("time", time);
        if(channel) params.append("channel", channel);
        if(type) params.append("type", type);

        return `analytics/?${params.toString()}&timezone=Asia/Dhaka`;
      // return "analytics/?timezone=Asia/Dhaka"
      },
    }),
    getFinanceData: builder.query({
      query: ({ time, channel, type }: { time?: string; channel?: string; type?: string }) => {
        const params = new URLSearchParams();

        if(time) params.append("time", time);
        if(channel) params.append("channel", channel);
        if(type) params.append("type", type);

      //   return `analytics/?${params.toString()}&timezone=Asia/Dhaka`;
        return `/finance-data/?${params.toString()}&timezone=Asia/Dhaka`;
      // return "analytics/?timezone=Asia/Dhaka"
      },
    }),
    getQuerriesData: builder.query({
      query: () => {
        return "/chat/question-leaderboard/";
      }
    })
  }),
});

export const {
   useGetAnalyticsDataQuery,
   useGetFinanceDataQuery,
   useGetQuerriesDataQuery
} = analyticsApi;
