import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CoinsTable from './components/CoinsTable';
import Coin from './components/Coin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CoinsTable />} />
      <Route path='/coins/:id' element={<Coin/>} />
    </Routes>
  );
}

export default App;
