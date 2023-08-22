import { configureStore, combineReducers } from "@reduxjs/toolkit";
import coinsReducer from './reducers/CoinsSlice';
import coinReducer from './reducers/CoinSlice';

const RootReducer = combineReducers({
    coins: coinsReducer,
    coin: coinReducer,
});


export const setupStore = () => {
    return configureStore({
        reducer: RootReducer,
    });
}

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
