import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const coinsApi= createApi({
    reducerPath: 'coinsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.coincap.io/v2'}),
    endpoints: (build) => ({
        fetchAllCoins: build.query({
            query: () => ({
                url: '/assets'
            })
        })
    })
});
