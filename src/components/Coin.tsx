import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';
import CustomIconButton from './IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { handleAddButtonClick, roundValue, getIconsLink } from '../utils';
import CustomButton from './Button';
import Loader from './Loader';
import { coinsApi } from '../services/CoinsService';
import moment from 'moment';
import Chart from './Chart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { monthInSeconds, oneDayInSeconds, weekInSeconds, oneSecondInMs } from '../constants';
import { useAppDispatch } from '../hooks';

const Coin = () => {
    const { id } = useParams();
    const [period, setPeriod] = React.useState(oneDayInSeconds);
    const [interval, setHistoryInterval] = React.useState<string>('h1');
    const dispatch = useAppDispatch();


    const {data: coinData, error, isLoading} = coinsApi.useFetchCoinQuery(id || '');
    const {data: coinHistoryData, error: historyError, isLoading: historyIsLoading} = coinsApi.useFetchCoinHistoryQuery({id: id || '', interval, start: (moment().unix() - period) * oneSecondInMs, end: moment().unix() * oneSecondInMs});
    
    const coin = coinData?.data;
    const coinHistory = coinHistoryData?.data;

    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate('/')
    };

    const time = coinHistory?.map((item) => +item?.time/oneSecondInMs);
    const prices = coinHistory?.map((item) => +item?.priceUsd);

    const handlePeriod = (
        event: React.MouseEvent<HTMLElement>,
        newPeriod: number | null,
      ) => {
        if (newPeriod !== null) {
            newPeriod === monthInSeconds ? setHistoryInterval('d1') : setHistoryInterval('h1');

            setPeriod(newPeriod);
        }
    };
    
    return (
        <Box sx={{
            width: '90%', 
            height: '100vh',
            m: 'auto',
        }}>
            <Box sx={{}}>
                    <CustomIconButton size='medium' onClick={() => handleBackButtonClick()} Icon={ArrowBackIcon} />
            </Box>
            {isLoading && <Loader />}
            {(error || historyError) && <Typography align='center' variant='h2'>Ошибка</Typography>}
            {!!coin && <Box sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                }}> 
                    <Box sx={{border: 'solid black 1px', display: 'flex', flexDirection: 'column', flex: '1 1 300px', }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            ml: 2,
                        }}
                        >
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                                {<Avatar alt={coin.symbol} src={getIconsLink(coin.symbol)} />}
                                <Typography sx={{ml: 1, mr: 1, wordWrap: 'break-word'}} align='left' variant='h4'>{coin.name}</Typography>
                                <Typography  sx={{mr: 1, color: '#616e85', wordWrap: 'break-word'}} align='left' variant='subtitle1'>{coin.symbol}</Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                                <Typography sx={{m: 3}} align='left' variant='h3'>{`${roundValue(+coin.priceUsd)} $`}</Typography>
                                <Box>
                                    <CustomIconButton size='large' onClick={(event?: React.MouseEvent<unknown>) => handleAddButtonClick(coin?.id, dispatch, event)} Icon={AddShoppingCartIcon} />
                                </Box>
                            </Box>

                        </Box>
                        {coin.rank && <Typography sx={{wordWrap: 'break-word'}} align='left' variant='h4'>Rank: {coin.rank}</Typography>}
                        {coin.supply && <Typography sx={{wordWrap: 'break-word'}} align='left' variant='h4'>Supply: {`${roundValue(+coin.supply)} $`}</Typography>}
                        {coin.maxSupply && <Typography sx={{wordWrap: 'break-word'}} align='left' variant='h4'>Max supply: {`${roundValue(+coin.maxSupply)} $`}</Typography>}
                        {coin.marketCapUsd && <Typography sx={{wordWrap: 'break-word'}} align='left' variant='h4'>Market cap: {`${roundValue(+coin.marketCapUsd)} $`}</Typography>}
                    </Box>
                    <Box sx={{ overflowX: 'overlay', border: 'solid black 1px', flex: '1 1 800px'}}>
                        <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                            <ToggleButtonGroup
                                value={period}
                                exclusive
                                onChange={handlePeriod}
                                aria-label="period"
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
                            {historyIsLoading && <Loader />}
                            {(time?.length && prices?.length) && !historyIsLoading && <Chart prices={prices} time={time}/>}
                        </Box>
                    </Box>
            </Box>}
            
        </Box>
    );
}

export default Coin;
