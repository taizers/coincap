import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const Header = () => {
    return (
        <Box sx={{
            width: '100%',

        }}>
            <Box>
                <Box sx={{
                    display: 'flex',
                    gap: '10px'
                }}>
                    Logo
                    <Typography sx={{ml: 1, mr: 1}} align='left' variant='subtitle2'>{'coin?.symbol'}</Typography>
                    <Typography align='left' variant='subtitle2'>`{'coin?.priceUsd'} $`</Typography>
                </Box>
            </Box>
            <Box sx={{
                    display: 'flex',
                    gap: '10px'
            }}>
                <WorkHistoryIcon />
                <Typography align='left' variant='subtitle2'>`{'coin?.priceUsd'} $`</Typography>
                <Typography align='left' variant='subtitle2'>`{'coin?.priceUsd'} $`</Typography>
            </Box>
        </Box>
    );
}

export default Header;
