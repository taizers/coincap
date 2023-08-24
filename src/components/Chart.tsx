import React, { FC } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';

interface IChart {
  prices: number[];
  time: number[];
}

const Chart: FC<IChart> = ({ prices, time }) => {
  return (
    <LineChart
      xAxis={[
        {
          data: time,
          label: 'Date',
          scaleType: 'time',
          valueFormatter: (date: number) =>
            moment.unix(date).format('MM/D/YY, h a'),
          tickNumber: 4,
        },
      ]}
      series={[
        {
          data: prices,
          label: 'Price USD',
          type: 'line',
          stack: 'total',
        },
      ]}
      width={1000}
      height={600}
      sx={{
        '& .MuiMarkElement-root': {
          display: 'none',
        },
      }}
    />
  );
};

export default Chart;
