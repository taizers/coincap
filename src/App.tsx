import React, { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './hook';
import { fetchCoins } from './store/reducers/ActionCreator';

function App() {
  
  const dispatch =useAppDispatch();
  const { list, isLoading, error } = useAppSelector(state => state.coins);
  useEffect (() => {
    dispatch(fetchCoins())
  }, [])
  return (
    <div className="App">
      {!isLoading && !error && JSON.stringify(list)}
      {isLoading && <h1>Идёт загрузка</h1>}
      {error && <h1>{error}</h1>}
    </div>
  );

  // return (
  //   <Routes>
  //     <Route path='/coins' element={<CoinsTable />} />
  //     <Route path='/coins/:id' element={<Coin/>} />
  //   </Routes>
  // );
}

export default App;
