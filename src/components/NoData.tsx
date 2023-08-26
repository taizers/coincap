import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

interface INoData {
  text?: string;
  variant?: Variant;
}

const NoData: FC<INoData> = ({ text = 'No Data', variant = 'h4' }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
      <Typography component="span" variant={variant}>
        {text}
      </Typography>
    </Box>
  );
};

export default NoData;
