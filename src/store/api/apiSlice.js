import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  reducerPath: "backend",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      login: builder.mutation({
        // invalidatesTags: ["profile"],
        query: ({ email, password }) => ({
          url: "/api/users/login",
          method: "POST",
          body: { email, password },
        }),
      }),
      signup: builder.mutation({
        query: ({ email, username, password }) => ({
          url: "/api/users",
          method: "POST",
          body: { email, username, password },
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: "/api/users/logout",
          method: "POST",
        }),
      }),
      searchUser: builder.mutation({
        query: (username) => ({
          url: "/api/users",
          method: "GET",
          params: {
            where: {
              username: {
                like: username,
              },
            },
          },
        }),
      }),
    };
  },
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation, useSearchUserMutation } =
  backendApi;
