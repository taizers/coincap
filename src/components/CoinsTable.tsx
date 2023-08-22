import React, { useEffect, useState } from 'react';
import Table from './Table';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCoins } from '../store/reducers/ActionCreator';
import SearchBar from './SearchBar';
import { ITableCoin, ICoin } from '../models/ICoins';
import { Box } from '@mui/material';

const getRows = (list: ICoin[]) => {
  return list.map(({id, name, symbol, marketCapUsd, priceUsd, changePercent24Hr}) => ({id, name, symbol, marketCapUsd: +marketCapUsd, priceUsd: +priceUsd, changePercent24Hr: +changePercent24Hr}));
}

const CoinsTable = () => {
    const [rows, setRows] = useState<ITableCoin[]>([]);
    const dispatch =useAppDispatch();
    const { list, isLoading, error } = useAppSelector(state => state.coins);

    useEffect (() => {
      dispatch(fetchCoins())
    }, []);

    useEffect (() => {
      setRows(getRows(list));
    }, [list]);
    
    const requestSearch = (searchedVal: string) => {
      const filteredRows = getRows(list).filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };

    return (
      <Box sx={{display: 'flex', flexDirection: 'column', width: '90%', pt: 5, m: 'auto', gap: '20px'}}>
        <SearchBar sx={{ml: 'auto'}} requestSearch={requestSearch} />
        <Table rows={rows} />
      </Box>
    );
}

export default CoinsTable;
