import { baseApi } from "../baseApi";

interface GetUsersParams {
  search?: string;
  page?: number;
  role?: string;
  is_active?: boolean | string;
}

interface User {
  id: number;
  name: string | null;
  role: string;
  email: string;
  company_name: string;
  is_active: boolean;
}

interface UsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, GetUsersParams>({
      query: ({ search, page = 1, role, is_active }) => {
        const params: Record<string, any> = { page };

        if (search) params.search = search;
        if (role && role !== 'all') params.role = role;
        if (is_active !== undefined && is_active !== 'all') {
          params.is_active = is_active;
        }

        return {
          url: `/admin/users/`,
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

export const { useGetUsersQuery } = usersApi;
