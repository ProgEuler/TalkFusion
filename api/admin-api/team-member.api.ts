import { baseApi } from "../baseApi";

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  image?: string;
  last_login: string;
  invoices_download?: string;
  new_user_added: number;
}

export interface TeamMemberResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TeamMember[];
}

export const teamMemberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMember: builder.query<TeamMemberResponse, void>({
      query: () => "/admin/team-members/",
    }),
    addTeamMember: builder.mutation({
      query: (body) => ({
         url: "/admin/create-admin/",
         method: 'POST',
         body
      })
    })
  }),
});

export const { useGetTeamMemberQuery, useAddTeamMemberMutation } = teamMemberApi;
