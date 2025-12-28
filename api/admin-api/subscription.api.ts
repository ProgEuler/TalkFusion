import { baseApi } from "../baseApi";
export interface SubscriptionPlan {
  id: number;
  name: string;
  duration: string;
  price: string;
  msg_limit: number;
  user_limit: number;
  token_limit: number;
  custom: boolean;
}

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<SubscriptionPlan[], void>({
      query: () => "/admin/subscription-plan/",
    }),

    updateSubscriptions: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/subscription-plan/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    createCustomeSubscription: builder.mutation({
      query: (body) => ({
        url: "/admin/create-custom-plan/",
        method: "POST",
        body,
      }),
    }),

    getSubscriptionRequest: builder.query({
      query: () => "/admin/user-plan-requests/"
    }),

   //  only users should hit
    subscriptionRequest: builder.mutation({
      query: (body) => ({
         url: "/admin/request-custom-plan/",
         method: 'POST',
         body
      })
    }),

    approveSubscriptionRequest: builder.mutation({
      query: (id) => ({
        url: "/admin/approve-user-plan-request/",
        method: "POST",
        body: { id },
      }),
    }),

    rejectSubscriptionRequest: builder.mutation({
      query: (id) => ({
        url: "/admin/reject-user-plan-request/",
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useUpdateSubscriptionsMutation,
  useCreateCustomeSubscriptionMutation,
  useGetSubscriptionRequestQuery,
  useSubscriptionRequestMutation,
  useApproveSubscriptionRequestMutation,
  useRejectSubscriptionRequestMutation,
} = subscriptionApi;
