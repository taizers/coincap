import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { coinsApi } from '../services/CoinsService';
import { popularCoins } from '../constants';
import { roundValue } from '../utils';
import { getPortfolio } from '../utils/localStorage';
import { IPortfolio } from '../models/IPortfolio';
import { ICoin } from '../models/ICoins';

const Header = () => {
    const {data, error, isLoading} = coinsApi.useFetchPopularCoinsQuery(popularCoins.join(','));
    
    const portfolio = getPortfolio();
    const coinsNames = Array.from(new Set(portfolio.map((item:IPortfolio) => item.id)));
    
    const {data: portfolioCoins } = coinsApi.useFetchPopularCoinsQuery(coinsNames.join(','));

    let currentCoinsPrice = 0;
    let startCoinsPrice = 0;

    portfolioCoins?.data?.forEach((coin: ICoin) => {
        const filteredPortfolio = portfolio.filter((portfolioCoin: IPortfolio) => portfolioCoin.id === coin.id);
        filteredPortfolio?.forEach((portfolioCoin: IPortfolio) => currentCoinsPrice += +portfolioCoin.count * +coin.priceUsd);       
    });

    portfolio.forEach((portfolioCoin: IPortfolio) => startCoinsPrice += +portfolioCoin.price * +portfolioCoin.count);

    const difference = currentCoinsPrice - startCoinsPrice;
    const percentageDifference = difference/currentCoinsPrice * 100 || 0;
    const coins = data?.data;
    
    return (
        <Box sx={{
            width: '90%',
            m: 'auto',
            p: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',

        }}>
            <Box sx={{
                display: 'flex',
                gap: '10px',
                
            }}>
                {
                    coins?.map((coin) => {
                        return(
                            <Box key={coin.id} sx={{
                                display: 'flex',
                                gap: '5px',
                                alignItems: 'center'
                            }}>
                                Logo
                                <Typography sx={{mr: .5}} align='left' variant='subtitle2'>{coin?.symbol}:</Typography>
                                <Typography align='left' variant='subtitle2'>{`${roundValue(+coin?.priceUsd)} $`}</Typography>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box sx={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center'
            }}>
                <WorkHistoryIcon />
                <Typography align='left' variant='subtitle2'>{`${roundValue(currentCoinsPrice)} USD`}</Typography>
                <Typography align='left' variant='subtitle2'>{`${difference > 0 ? '+' : ''}${roundValue(difference)} $`}</Typography>
                <Typography align='left' variant='subtitle2'>{`(${roundValue(Math.abs(percentageDifference))} %)`}</Typography>
            </Box>
        </Box>
    );
}

export default Header;
