import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Avatar from '@mui/material/Avatar';
import { coinsApi } from '../services/CoinsService';
import { popularCoins } from '../constants';
import { roundValue, getIconsLink, getErrorText } from '../utils';
import { getPortfolio } from '../utils/localStorage';
import { IPortfolio } from '../models/IPortfolio';
import { ICoin } from '../models/ICoins';
import CustomButton from './Button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { portfolioSlice } from '../store/reducers/PortfolioSlice';
import Error from './Error';
import Loader from './Loader';

const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const portfolio = getPortfolio();
    dispatch(portfolioSlice.actions.setPortfolioData(portfolio));
  }, []);

  const { data, error, isLoading } = coinsApi.useFetchPopularCoinsQuery(
    popularCoins.join(',')
  );

  const { portfolio } = useAppSelector((state) => state.portfolio);

  const coinsIds = Array.from(
    new Set(portfolio.map((item: IPortfolio) => item.id))
  );

  const {
    data: portfolioCoins,
    error: portfolioCoinsError,
    isLoading: isLaodingportfolioCoins,
  } = coinsApi.useFetchPopularCoinsQuery(coinsIds.join(','));

  let currentCoinsPrice = 0;
  let purchasePrice = 0;

  portfolioCoins?.data?.forEach((coin: ICoin) => {
    const filteredPortfolio = portfolio.filter(
      (portfolioCoin: IPortfolio) => portfolioCoin.id === coin.id
    );
    
    filteredPortfolio?.forEach(
      (portfolioCoin: IPortfolio) =>
        (currentCoinsPrice += +portfolioCoin.count * +coin.priceUsd)
    );
  });

  portfolio.forEach(
    (portfolioCoin: IPortfolio) =>
      (purchasePrice += +portfolioCoin.price * +portfolioCoin.count)
  );

  const difference = currentCoinsPrice - purchasePrice;
  const percentageDifference = (difference / currentCoinsPrice) * 100 || 0;
  const coins = data?.data;

  const buttonText = `${roundValue(currentCoinsPrice)} USD ${
    difference > 0 ? '+' : ''
  }${roundValue(difference)}$ (${roundValue(Math.abs(percentageDifference))}%)`;

  const handlePortfolioClick = () => {
    dispatch(portfolioSlice.actions.openPortfolioModal());
  };

  return (
    <Box
      sx={{
        m: 'auto',
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          flex: '1 1 400px',
          alignItems: 'center',
          justifyContent: 'flex-start',
          '@media (max-width: 750px)': {
            justifyContent: 'center',
          },
        }}
      >
        {error && <Error text={getErrorText(error)} />}
        {isLoading && <Loader />}
        {coins?.map((coin) => {
          return (
            <Box
              key={coin.id}
              sx={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
              }}
            >
              {
                <Avatar
                  sx={{ width: '20px', height: '20px' }}
                  alt={coin.symbol}
                  src={getIconsLink(coin.symbol)}
                />
              }
              <Typography sx={{ mr: 0.5 }} align="left" variant="subtitle2">
                {coin?.symbol}:
              </Typography>
              <Typography align="left" variant="subtitle2">{`${roundValue(
                +coin?.priceUsd
              )} $`}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '5px',
          flex: '1 1 250px',
          alignItems: 'center',
          justifyContent: 'flex-end',
          '@media (max-width: 750px)': {
            justifyContent: 'center',
          },
        }}
      >
        {portfolioCoinsError && (
          <Error text={getErrorText(portfolioCoinsError)} />
        )}
        {isLaodingportfolioCoins && <Loader />}
        {data && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkHistoryIcon />
            <CustomButton
              onClick={handlePortfolioClick}
              variant={'text'}
              text={buttonText}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
