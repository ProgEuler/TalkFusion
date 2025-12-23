import { baseApi } from "../baseApi";

export const adminIntegrationsApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      enableAll: builder.mutation({
         query: (channel) => ({
            url: "/admin/enable-channels/",
            method: 'POST',
            body: channel
         })
      }),
      disableAll: builder.mutation({
         query: (channel) => ({
            url: "/admin/disable-channels/",
            method: 'POST',
            body: channel
         })
      }),
   })
})

export const { useEnableAllMutation, useDisableAllMutation } = adminIntegrationsApi
