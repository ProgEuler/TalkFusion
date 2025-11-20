import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/users/",
        method: "POST",
        body: credentials,
      }),
    }),
    getOtp: builder.mutation({
      query: (email) => ({
        url: "/get-otp/",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp/",
        method: "POST",
        body: data,
      }),
    }),
    googleSignin: builder.mutation({
      query: (data) => ({
        url: "/auth/google/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
   useLoginMutation,
   useSignupMutation,
   useGetOtpMutation,
   useVerifyOtpMutation,
   useGoogleSigninMutation
} = apiSlice;
