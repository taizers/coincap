import React, { FC, useState, MouseEvent, ChangeEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import CustomIconButton from './IconButton';
import { ITableCoin } from '../models/ICoins';
import { getIconsLink, handleAddButtonClick, roundValue } from '../utils';
import { defaultPage, rowsPerPageOptions } from '../constants';
import { useAppDispatch } from '../hooks';

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
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
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
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof ITableCoin
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = ({
  order,
  orderBy,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler =
    (property: keyof ITableCoin) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="right"></TableCell>
        <TableCell key="symbol" align="left">
          {'Name'}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
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
};

interface ICoinsTable {
  rows: ITableCoin[];
  setLimit: (data: number) => void;
  setPage: (data: number) => void;
  limit: number;
  page: number;
  itemsCount?: number;
}

const CoinsTable: FC<ICoinsTable> = ({
  rows,
  page,
  limit,
  itemsCount = 0,
  setPage,
  setLimit,
}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ITableCoin>('symbol');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof ITableCoin
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (id: string) => {
    navigate(`coins/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(defaultPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * limit - itemsCount) : 0;

  const visibleRows = stableSort(rows, getComparator(order, orderBy));

  return (
    <Box>
      <Paper sx={{ m: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 550 }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={itemsCount}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    onClick={() => handleRowClick(row.id)}
                    role="coinRow"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="left">
                      {!!row.priceUsd && (
                        <CustomIconButton
                          size="medium"
                          onClick={(event?: MouseEvent<unknown>) =>
                            handleAddButtonClick(row.id, dispatch, event)
                          }
                          Icon={AddShoppingCartIcon}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                      }}
                      align="left"
                    >
                      <Avatar
                        sx={{ display: 'inline-block', mr: 1 }}
                        alt={row.symbol}
                        src={getIconsLink(row.symbol)}
                      />
                      <Typography variant="subtitle1">{row.symbol}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      {!!row.priceUsd && `${roundValue(row.priceUsd)} $`}
                    </TableCell>
                    <TableCell align="right">
                      {!!row.marketCapUsd &&
                        `${roundValue(row.marketCapUsd)} $`}
                    </TableCell>
                    <TableCell align="right">
                      {!!row.changePercent24Hr &&
                        `${roundValue(row.changePercent24Hr)} %`}
                    </TableCell>
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
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={itemsCount}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CoinsTable;
