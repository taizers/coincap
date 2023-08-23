import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Coin from './components/Coin';
import CoinsTable from './components/CoinsTable';
import Header from './components/Header';
import CoinModal from './components/CoinModal';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { coinModalSlice } from './store/reducers/CoinModalSlice';

function App() {
  const { isOpen } = useAppSelector(state => state.coinModal);
  const dispatch = useAppDispatch();
  
  return (
    <Box sx={{
        width: '100%',
        height: '100vh',

    }}>
        <Header/>
        <Routes>
          <Route path='/' element={<CoinsTable />} />
          <Route path='/coins/:id' element={<Coin/>} />
        </Routes>
        
        {isOpen && <CoinModal handleClose={() => dispatch(coinModalSlice.actions.closeCoinModal())} />}
    </Box>

  );
}

export default App;
