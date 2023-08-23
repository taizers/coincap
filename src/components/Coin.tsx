import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';
import CustomIconButton from './IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { handleAddButtonClick, roundValue } from '../utils';
import CustomButton from './Button';
import Loader from './Loader';
import { coinsApi } from '../services/CoinsService';

const Coin = () => {
    const { id } = useParams();

    const {data, error, isLoading} = coinsApi.useFetchCoinQuery(id ? id : '');
    const coin = data?.data;
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/')
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
            {error && <Typography align='center' variant='h2'>{'error'}</Typography>}
            {!!coin && <Box sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                }}> 
                    <Box sx={{border: 'solid black 1px', display: 'flex', flexDirection: 'column', flex: '1 1 300px'}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            ml: 2,
                        }}
                        >
                            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                            {'Logo'}
                            <Typography sx={{ml: 1, mr: 1}} align='left' variant='h4'>{coin.name}</Typography>
                            <Typography  sx={{mr: 1, color: '#616e85'}} align='left' variant='subtitle1'>{coin.symbol}</Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                                <Typography sx={{m: 3}} align='left' variant='h3'>{`${roundValue(+coin.priceUsd)} $`}</Typography>
                                <Box>
                                    <CustomIconButton size='large' onClick={(event: React.MouseEvent<unknown>) => handleAddButtonClick(event, coin?.id)} Icon={AddShoppingCartIcon} />
                                </Box>
                            </Box>

                        </Box>
                        {coin.rank && <Typography align='left' variant='h4'>Rank: {coin.rank}</Typography>}
                        {coin.supply && <Typography align='left' variant='h4'>Supply: {`${roundValue(+coin.supply)} $`}</Typography>}
                        {coin.maxSupply && <Typography align='left' variant='h4'>Max supply: {`${roundValue(+coin.maxSupply)} $`}</Typography>}
                        {coin.marketCapUsd && <Typography align='left' variant='h4'>Market cap: {`${roundValue(+coin.marketCapUsd)} $`}</Typography>}
                    </Box>
                    <Box sx={{ overflowX: 'overlay', border: 'solid black 1px', flex: '1 1 500px'}}>
                        <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                            <Box sx={{ display: 'flex', mt: 1, gap: '10px' }}>
                                <CustomButton text={'1D'} size={'small'} onClick={() => {}} variant={'outlined'} />
                                <CustomButton text={'7D'} size={'small'} onClick={() => {}} variant={'outlined'} />
                                <CustomButton text={'1M'} size={'small'} onClick={() => {}} variant={'outlined'} />
                            </Box>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    area: true,
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </Box>
                    </Box>
            </Box>}
            
        </Box>
    );
}

export default Coin;
