import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoin } from '../../models/ICoins';
import { fetchCoins } from './ActionCreator';

type CoinsState = {
    list: ICoin[];
    isLoading: boolean;
    error: string;
}

const initialState: CoinsState = {
    list: [],
    isLoading: false,
    error: '',
}

const coinsSlice = createSlice({
    name: 'coins',
    initialState,    
    reducers: {},
    extraReducers: {
        [fetchCoins.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCoins.fulfilled.type]: (state, action: PayloadAction<ICoin[]>) => {
            state.isLoading = false;
            state.error = '';
            state.list = action.payload;
        },
        [fetchCoins.rejected.type]:(state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default coinsSlice.reducer;
