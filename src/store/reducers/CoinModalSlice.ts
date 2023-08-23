import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CoinModalState = {
    coinId: string;
    isOpen: boolean;
}

const initialState: CoinModalState = {
    coinId: '',
    isOpen: false,
}

export const coinModalSlice = createSlice({
    name: 'coinmodal',
    initialState,    
    reducers: {
        openCoinModal: (state, action: PayloadAction<string>) => {
            state.isOpen = true;
            state.coinId = action.payload;
        },
        closeCoinModal: (state) => {
            state.isOpen = false;
            state.coinId = '';
        }
    },
});

export default coinModalSlice.reducer;