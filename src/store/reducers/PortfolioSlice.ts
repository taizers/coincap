import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPortfolio } from '../../models/IPortfolio';

type PortfolioState = {
  portfolio: IPortfolio[];
  isOpen: boolean;
};

const initialState: PortfolioState = {
  portfolio: [],
  isOpen: false,
};

export const portfolioSlice = createSlice({
  name: 'portfoli',
  initialState,
  reducers: {
    openPortfolioModal: (state) => {
      state.isOpen = true;
    },
    closePortfolioModal: (state) => {
      state.isOpen = false;
    },
    setPortfolioData: (state, action: PayloadAction<IPortfolio[]>) => {
      state.portfolio = action.payload;
    },
  },
});

export default portfolioSlice.reducer;
