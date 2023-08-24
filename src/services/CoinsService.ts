import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICoin, ICoinHistory } from '../models/ICoins';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (build) => ({
    fetchAllCoins: build.query<
      { data: ICoin[] },
      { limit: number; offset: number; search?: string }
    >({
      query: ({ limit = 5, offset = 0, search = null }) => ({
        url: '/assets',
        params: {
          limit,
          offset,
          search: search && search,
        },
      }),
    }),
    fetchCoinsCount: build.query<{ data: ICoin[] }, string>({
      query: () => ({
        url: `/assets`,
      }),
    }),
    fetchCoin: build.query<{ data: ICoin }, string>({
      query: (id: string) => ({
        url: `/assets/${id}`,
      }),
    }),
    fetchPopularCoins: build.query<{ data: ICoin[] }, string>({
      query: (ids: string) => ({
        url: `/assets`,
        params: {
          ids,
        },
      }),
    }),
    fetchCoinHistory: build.query<
      { data: ICoinHistory[] },
      { id: string; interval: string; start: number; end: number }
    >({
      query: ({ id, interval, start, end }) => ({
        url: `/assets/${id}/history`,
        params: {
          interval,
          start,
          end,
        },
      }),
    }),
  }),
});
