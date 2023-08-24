import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { coinModalSlice } from '../store/reducers/CoinModalSlice';

export const roundValue = (price: number) => {
  if (+price.toFixed(2) !== 0) {
    return price.toFixed(2);
  }
  return price.toString();
};

export const handleAddButtonClick = (
  id: string,
  dispatch: AppDispatch,
  event?: React.MouseEvent<unknown>
) => {
  event?.stopPropagation();
  dispatch(coinModalSlice.actions.openCoinModal(id));
};

export const getIconsLink = (id: string) =>
  `https://assets.coincap.io/assets/icons/${id.toLowerCase()}@2x.png`;

export const getErrorText = (error: FetchBaseQueryError | SerializedError) => {
  if ('error' in error) {
    return error.error;
  }

  return '';
}