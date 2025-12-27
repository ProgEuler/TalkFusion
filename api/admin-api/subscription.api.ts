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
  }),
});

export const {
  useGetSubscriptionsQuery,
  useUpdateSubscriptionsMutation,
  useCreateCustomeSubscriptionMutation,
} = subscriptionApi;
