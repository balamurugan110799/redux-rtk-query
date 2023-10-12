import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CRUD_API = createApi({
  reducerPath: "CRUD",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  tagTypes: ["CRUD"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => "/read",
      providesTags: ["CRUD"],
    }),

    addDataTodo: builder.mutation({
      query: (todo) => ({
        url: "/create",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["CRUD"],
    }),

    updateDataTodo: builder.mutation({
      query: (todo) => ({
        url: `/update/${todo?._id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["CRUD"],
    }),

    deleteDatatodo: builder.mutation({
      query: (todo) => ({
        url: `/delete/${todo?._id}`,
        method: "DELETE",
        body: todo,
      }),
    }),
  }),
});

export const {
  useGetAllQuery,
  useAddDataTodoMutation,
  useUpdateDataTodoMutation,
  useDeleteDatatodoMutation,
} = CRUD_API;
