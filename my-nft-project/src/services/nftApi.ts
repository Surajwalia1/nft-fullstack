// services/nftApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/nfts' }), // Replace with your backend URL
  endpoints: (builder) => ({
    createNft: builder.mutation<any, { name: string; description: string; price: number; image: File }>({
      query: ({ name, description, price, image }) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('image', image);
        
        return {
          url: '/create',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getNfts: builder.query<any[], void>({
      query: () => '/list',
    }),
  }),
});

export const { useCreateNftMutation, useGetNftsQuery } = nftApi;
