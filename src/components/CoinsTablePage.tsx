import React, { useState } from 'react';
import { Box } from '@mui/material';
import CoinsTable from './CoinsTable';
import SearchBar from './SearchBar';
import { ICoin } from '../models/ICoins';
import Loader from './Loader';
import { coinsApi } from '../services/CoinsService';
import { defaultPage, defaultLimit } from '../constants';
import Error from './Error';
import { getErrorText } from '../utils';

const getRows = (list: ICoin[]) => {
  return list.map(
    ({ id, name, symbol, marketCapUsd, priceUsd, changePercent24Hr }) => ({
      id,
      name,
      symbol,
      marketCapUsd: +marketCapUsd,
      priceUsd: +priceUsd,
      changePercent24Hr: +changePercent24Hr,
    })
  );
};

const CoinsTablePage = () => {
  const [page, setPage] = useState<number>(defaultPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data, error, isLoading } = coinsApi.useFetchAllCoinsQuery({
    offset: page * limit,
    limit,
    search: searchQuery,
  });
  const { data: list } = coinsApi.useFetchCoinsCountQuery(searchQuery);

  const requestSearch = (searchValue: string) => {
    setPage(defaultPage);
    setLimit(defaultLimit);
    setSearchQuery(searchValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 3,
        gap: '20px',
      }}
    >
      <SearchBar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '@media (max-width: 550px)': {
            justifyContent: 'center',
          },
        }}
        requestSearch={requestSearch}
      />
      {!!data?.data?.length && (
        <CoinsTable
          rows={getRows(data.data)}
          itemsCount={list?.data?.length}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      )}
      {error && <Error text={getErrorText(error)} />}
      {isLoading && <Loader />}
    </Box>
  );
};

export default CoinsTablePage;
