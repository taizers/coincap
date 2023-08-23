import React, { useEffect, useState } from 'react';
import Table from './Table';
import SearchBar from './SearchBar';
import { ICoin } from '../models/ICoins';
import { Box, Typography } from '@mui/material';
import Loader from './Loader';
import { coinsApi } from '../services/CoinsService';
import { defaultPage, defaultLimit } from '../constants';

const getRows = (list: ICoin[]) => {
  return list.map(({id, name, symbol, marketCapUsd, priceUsd, changePercent24Hr}) => ({id, name, symbol, marketCapUsd: +marketCapUsd, priceUsd: +priceUsd, changePercent24Hr: +changePercent24Hr}));
}

const CoinsTable = () => {
    const [page, setPage] = useState<number>(defaultPage);
    const [limit, setLimit] = useState<number>(defaultLimit);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const {data, error, isLoading} = coinsApi.useFetchAllCoinsQuery({offset: page * limit, limit, search: searchQuery });
    const {data: list} = coinsApi.useFetchCoinsCountQuery('');
    
    const requestSearch = (searchValue: string) => {
      setPage(defaultPage);
      setLimit(defaultLimit);
      setSearchQuery(searchValue);
    }

    return (
      <Box sx={{display: 'flex', flexDirection: 'column', width: '90%', pt: 5, m: 'auto', gap: '20px'}}>
        <SearchBar sx={{ml: 'auto'}} requestSearch={requestSearch} />
        {!!data?.data?.length && <Table rows={getRows(data.data)} itemsCount={list?.data?.length} page={page} limit={limit} setPage={setPage} setLimit={setLimit} />}
        {error && <Typography align='center' variant='h2'>{'error'}</Typography>}
        {isLoading && <Loader/>}
      </Box>
    );
}

export default CoinsTable;
