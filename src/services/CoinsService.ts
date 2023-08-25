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
      query: ({ limit = 5, offset = 0, search }) => {
        if (search) {
          return {
            url: '/assets',
            params: {
              limit,
              offset,
              search
            },
          }
        }

        return {
          url: '/assets',
          params: {
            limit,
            offset,
          },
        }
      },
    }),
    fetchCoinsCount: build.query<{ data: ICoin[] }, string>({
      query: (search = '') => {
        if (search) {
          return {
            url: '/assets',
            params: {
              search
            },
          }
        }

        return {
          url: '/assets',
        }
      },
    }),
    fetchCoin: build.query<{ data: ICoin }, string>({
      query: (id: string) => ({
        url: `/assets/${id}`,
      }),
    }),
    fetchPopularCoins: build.query<{ data: ICoin[] }, string>({
      query: (ids: string) => {
        if (ids) {
          return {
            url: '/assets',
            params: {
              ids
            },
          }
        }

        return {
          url: '/assets',
        }
      },
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
