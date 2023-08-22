import React, { FC, useMemo, useState, MouseEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from "react-router-dom";
import CustomIconButton from './IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ITableCoin } from '../models/ICoins';
import { Link } from 'react-router-dom';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof ITableCoin;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'priceUsd',
    label: 'Price USD',
  },
  {
    id: 'marketCapUsd',
    label: 'Market Cap',
  },
  {
    id: 'changePercent24Hr',
    label: '24h',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof ITableCoin) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = ({ order, orderBy, rowCount, onRequestSort }) => {
  const createSortHandler =
    (property: keyof ITableCoin) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell align='right'>
        </TableCell>
        <TableCell
          key='symbol'
          align='right'
        >
          {'Symbol'}
        </TableCell>
                <TableCell
          key='logo'
          align='right'
        >
          {'Logo'}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='right'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const roundValue = (price: number) => {
  if (+price.toFixed(2) !== 0) {
    return price.toFixed(2);
  }
  return price.toString();
} 

interface IEnhancedTable {
  rows: ITableCoin[];
}

const EnhancedTable:FC<IEnhancedTable> = ({rows}) =>  {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ITableCoin>('symbol');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof ITableCoin,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (id: string) => {
    navigate(`coins/${id}`);
  };

  const handleAddButtonClick = (event: React.MouseEvent<unknown>, id: string) => {
    //
    event.stopPropagation();
    console.log(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', m: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 550 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row:any, index) => {
                return (
                  <TableRow
                    hover
                    onClick={() => handleRowClick(row.id)}
                    role="coinRow"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <CustomIconButton size='medium' onClick={(event: React.MouseEvent<unknown>) => handleAddButtonClick(event, row.id)} Icon={AddShoppingCartIcon} />
                    </TableCell>
                    <TableCell align="right">{row.symbol}</TableCell>
                    <TableCell align="right">{row.symbol}</TableCell>
                    <TableCell align="right">{`${roundValue(row.priceUsd)} $`}</TableCell>
                    <TableCell align="right">{`${roundValue(row.marketCapUsd)} $`}</TableCell>
                    <TableCell align="right">{`${roundValue(row.changePercent24Hr)} %`}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable;
