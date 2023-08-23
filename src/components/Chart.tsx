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
        xAxis={[{ 
            data: time, 
            scaleType: 'time',
            valueFormatter: (date: number) => moment.unix(date).format('MM/D/YY, h a'),
            tickNumber: 4,
        }]}
        series={[
            {
                data: prices,
                type: 'line',
                stack: 'total',
            },
        ]}
        width={800}
        height={500}
        sx={{
            '& .MuiMarkElement-root': {
              display: 'none',
            },

          }}
    />
  );
}

export default Chart;