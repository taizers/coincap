import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loader = () => {
  return (
    <Box sx={{ width: '95%', m: 2 }}>
      <LinearProgress />
    </Box>
  );
};

export default Loader;
