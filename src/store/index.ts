import { configureStore, combineReducers } from "@reduxjs/toolkit";
import coinsReducer from './reducers/CoinsSlice';

const RootReducer = combineReducers({
    coins: coinsReducer,
});


export const setupStore = () => {
    return configureStore({
        reducer: RootReducer,
    });
}

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
