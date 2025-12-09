import { baseApi } from "../baseApi";

export const calendarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDaysData: builder.query({
      query: ({ month, year }) => {
       return `/bookings/days/?month=${month}&year=${year}&timezone=Asia/Dhaka`;
      },
    }),
    getBookingsByDate: builder.query({
      query: ({ day, month, year }) => {
        return `/bookings/monthly/?month=${month}&year=${year}&timezone=Asia/Dhaka&day=${day}`;
      },
    }),
  }),
});

export const { useGetDaysDataQuery, useGetBookingsByDateQuery } = calendarApi;
