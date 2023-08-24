import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import CoinPage from './components/CoinPage';
import CoinsTablePage from './components/CoinsTablePage';
import Header from './components/Header';
import CoinModal from './components/CoinModal';
import PortfolioModal from './components/PortfolioModal';
import { useAppDispatch, useAppSelector } from './hooks';
import { coinModalSlice } from './store/reducers/CoinModalSlice';
import { portfolioSlice } from './store/reducers/PortfolioSlice';

function App() {
  const { isOpen: isCoinModalOpen } = useAppSelector(
    (state) => state.coinModal
  );
  const { isOpen: isPortfolioModalOpen } = useAppSelector(
    (state) => state.portfolio
  );
  const dispatch = useAppDispatch();

  return (
    <Box className={'container'}>
      <Header />
      <Routes>
        <Route path="/" element={<CoinsTablePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>

      {isCoinModalOpen && (
        <CoinModal
          handleClose={() => dispatch(coinModalSlice.actions.closeCoinModal())}
        />
      )}
      {isPortfolioModalOpen && (
        <PortfolioModal
          handleClose={() =>
            dispatch(portfolioSlice.actions.closePortfolioModal())
          }
        />
      )}
    </Box>
  );
}

export default App;
