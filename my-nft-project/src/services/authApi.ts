// services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/users' }), // Updated to your backend base URL
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    signup: builder.mutation<{ message: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/register',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
