import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICoin } from "../../models/ICoins";

export const fetchCoins = createAsyncThunk(
    'coins/fetchAll',
    async(_, thunkApi) => {
        try {
            const responce = await axios.get<{data: ICoin[]}>('https://api.coincap.io/v2/assets');
            return responce.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot load Coins');
        }
    }  
);

export const fetchCoin = createAsyncThunk(
    'coins/fetchOne',
    async(id: string, thunkApi) => {
        try {
            const responce = await axios.get<{data: ICoin[]}>(`https://api.coincap.io/v2/assets/${id}`);
            return responce.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue('Cannot load Coin');
        }
    }  
);
