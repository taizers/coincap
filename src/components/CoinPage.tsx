import React, { useState, MouseEvent } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import moment from 'moment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {
  handleAddButtonClick,
  roundValue,
  getIconsLink,
  getErrorText,
} from '../utils';
import Loader from './Loader';
import { coinsApi } from '../services/CoinsService';
import Chart from './Chart';
import CustomIconButton from './IconButton';
import {
  monthInSeconds,
  oneDayInSeconds,
  weekInSeconds,
  oneSecondInMs,
} from '../constants';
import { useAppDispatch } from '../hooks';
import Error from './Error';
import NoData from './NoData';

const CoinPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [period, setPeriod] = useState(oneDayInSeconds);
  const [interval, setHistoryInterval] = useState<string>('h1');
  const [currentTime, setCurrentTime] = useState<number>(moment().unix());

  const {
    data: coinData,
    error,
    isLoading,
  } = coinsApi.useFetchCoinQuery(id || '');
  const {
    data: coinHistoryData,
    error: historyError,
    isFetching: historyIsLoading,
  } = coinsApi.useFetchCoinHistoryQuery({
    id: id || '',
    interval,
    start: (currentTime - period) * oneSecondInMs,
    end: currentTime * oneSecondInMs,
  });

  const coin = coinData?.data;
  const coinHistory = coinHistoryData?.data;

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const time = coinHistory?.map((item) => +item?.time / oneSecondInMs);
  const prices = coinHistory?.map((item) => +item?.priceUsd);

  const handlePeriod = (
    event: MouseEvent<HTMLElement>,
    newPeriod: number | null
  ) => {
    if (newPeriod !== null) {
      newPeriod === monthInSeconds
        ? setHistoryInterval('d1')
        : setHistoryInterval('h1');

      setPeriod(newPeriod);
    }
  };

  return (
    <Box>
      <Box sx={{}}>
        <CustomIconButton
          size="medium"
          onClick={() => handleBackButtonClick()}
          Icon={ArrowBackIcon}
        />
      </Box>

      {isLoading && <Loader />}
      {error && <Error text={getErrorText(error)} />}

      {!!coin && (!error || !historyError) && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              border: 'solid gray 1px',
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 300px',
              m: 1,
              p: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {<Avatar alt={coin.symbol} src={getIconsLink(coin.symbol)} />}
                <Typography
                  sx={{ ml: 1, mr: 1, wordWrap: 'break-word' }}
                  align="left"
                  variant="h4"
                >
                  {coin.name}
                </Typography>
                <Typography
                  sx={{ mr: 1, color: '#616e85', wordWrap: 'break-word' }}
                  align="left"
                  variant="subtitle1"
                >
                  {coin.symbol}
                </Typography>
              </Box>
              {coin.priceUsd && +coin.priceUsd > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    sx={{ m: 3 }}
                    align="left"
                    variant="h3"
                  >{`${roundValue(+coin.priceUsd)} $`}</Typography>
                  <Box>
                    <CustomIconButton
                      size="large"
                      onClick={(event?: MouseEvent<unknown>) =>
                        handleAddButtonClick(coin?.id, dispatch, event)
                      }
                      Icon={AddShoppingCartIcon}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            {coin.rank && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  color={'gray'}
                >
                  Rank:{' '}
                </Typography>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  fontWeight={500}
                >
                  {coin.rank}
                </Typography>
              </Box>
            )}
            {coin.supply && +coin.supply > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  color={'gray'}
                >
                  Supply:{' '}
                </Typography>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  fontWeight={500}
                >{`${roundValue(+coin.supply)} $`}</Typography>
              </Box>
            )}
            {coin.maxSupply && +coin.maxSupply > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  color={'gray'}
                >
                  Max supply:
                </Typography>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  fontWeight={500}
                >{`${roundValue(+coin.maxSupply)} $`}</Typography>
              </Box>
            )}
            {coin.marketCapUsd && +coin.marketCapUsd > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  color={'gray'}
                >
                  Market cap:
                </Typography>
                <Typography
                  component="span"
                  variant="h4"
                  display="inline"
                  fontWeight={500}
                >{`${roundValue(+coin.marketCapUsd)} $`}</Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              overflowX: 'overlay',
              border: 'solid gray 1px',
              flex: '1 1 800px',
              alignItems: 'center',
              m: 1,
              p: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ToggleButtonGroup
                value={period}
                exclusive
                onChange={handlePeriod}
                aria-label="period"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  '@media (max-width: 1000px)': {
                    flexDirection: 'column',
                    justifyContent: 'center',
                  },
                }}
              >
                <ToggleButton value={oneDayInSeconds} aria-label="1d">
                  {'1d'}
                </ToggleButton>
                <ToggleButton value={weekInSeconds} aria-label="week">
                  {'7d'}
                </ToggleButton>
                <ToggleButton value={monthInSeconds} aria-label="month">
                  {'m'}
                </ToggleButton>
              </ToggleButtonGroup>
              <Box sx={{ overflowX: 'overlay', minHeight: '100px' }}>
                {historyIsLoading && <Loader />}
                {historyError && <Error text={getErrorText(historyError)} />}
                {!time?.length && !historyError && !historyIsLoading && (
                  <NoData />
                )}
                {!!time?.length && !!prices?.length && (
                  <Chart prices={prices} time={time} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoinPage;
