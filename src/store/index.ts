import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { coinsApi } from "../services/CoinsService";

const RootReducer = combineReducers({
    [coinsApi.reducerPath]: coinsApi.reducer,
});


export const setupStore = () => {
    return configureStore({
        reducer: RootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(coinsApi.middleware)
    });
}

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
