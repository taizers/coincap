import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

interface IError {
  text: string;
  variant?: Variant;
}

const Error: FC<IError> = ({ text, variant = 'h5' }) => {
  return (
    <Box>
      <Typography align="center" variant={variant}>
        {text}
      </Typography>
    </Box>
  );
};

export default Error;
