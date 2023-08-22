import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoin } from '../../models/ICoins';
import { fetchCoin } from './ActionCreator';

type CoinState = {
    coin: ICoin | null;
    isLoading: boolean;
    error: string;
}

const initialState: CoinState = {
    coin: null,
    isLoading: false,
    error: '',
}

const coinSlice = createSlice({
    name: 'coin',
    initialState,    
    reducers: {},
    extraReducers: {
        [fetchCoin.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCoin.fulfilled.type]: (state, action: PayloadAction<ICoin>) => {
            state.isLoading = false;
            state.error = '';
            state.coin = action.payload;
        },
        [fetchCoin.rejected.type]:(state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default coinSlice.reducer;
