import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomIconButton from './IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPortfolioTableItem } from '../models/IPortfolio';
import { roundValue } from '../utils';

interface IPortfolioTable {
    list: IPortfolioTableItem[];
    onDeleteClick: (data: number) => void;
};

const PortfolioTable: FC<IPortfolioTable> = ({list, onDeleteClick}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Purchase Price</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!list.length && (
                <TableRow>
                  <TableCell colSpan={100}  />
                </TableRow>
              )}
          {list?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{roundValue(+item.purchasePrice)}</TableCell>
              <TableCell align="right">{roundValue(+item.currentPrice)}</TableCell>
              <TableCell align="right">{item.count}</TableCell>
              <TableCell align="right">{<CustomIconButton onClick={() => onDeleteClick(item.index)} Icon={DeleteIcon}/>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PortfolioTable;