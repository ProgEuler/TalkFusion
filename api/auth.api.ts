import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
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
    refresh: builder.mutation({
      query: ({ refreshToken, accessToken }) => ({
        url: "/validate-token/",
        method: "POST",
        body: {
          refresh: refreshToken,
          access: accessToken,
        },
      }),
    }),
    resetPass: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body,
      }),
    }),
    chnagePass: builder.mutation({
      query: (body) => ({
         url: "/auth/users/me/",
         method: "PATCH",
         body
      })
    })
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetOtpMutation,
  useVerifyOtpMutation,
  useGoogleSigninMutation,
  useRefreshMutation,
  useResetPassMutation,
  useChnagePassMutation
} = authApi;
