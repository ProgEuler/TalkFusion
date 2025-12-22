import { baseApi } from "../baseApi";

interface GetUsersParams {
  search?: string;
  page?: number;
  role?: string;
  is_active?: boolean | string;
}

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: ({ search, page = 1, role, is_active }) => {
        const params: Record<string, any> = { page };

        if (search) params.search = search;
        if (role && role !== 'all') params.role = role;
        if (is_active !== undefined && is_active !== 'all') {
          params.is_active = is_active;
        }

        return {
          url: `/admin/companies/`,
          params,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        return {
          ...newItems,
          results: [...currentCache.results, ...newItems.results],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
