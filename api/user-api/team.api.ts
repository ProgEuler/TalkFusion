import { baseApi } from "../baseApi";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/auth/company/employee/",
      providesTags: ["Employee"],
    }),
    updateEmployeeRoles: builder.mutation({
      query: ({ id, body }: { id: number; body: any }) => ({
         url: `/auth/company/employee/update-permissions/${id}/`,
         method: "POST",
         body
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id: number) => ({
         url: `/auth/company/employee/update-permissions/${id}/`,
         method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    addEmployee: builder.mutation({
      query: (body) => ({
         url: "/auth/company/employee/",
         method: "POST",
         body
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const { 
  useGetEmployeesQuery, 
  useUpdateEmployeeRolesMutation, 
  useDeleteEmployeeMutation,
  useAddEmployeeMutation 
} = teamApi;
