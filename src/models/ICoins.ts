export interface  ICoin {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
};

export interface  ICoinHistory {
    priceUsd: string;
    time: number;
};

export interface  ITableCoin {
    id: string;
    name: string;
    symbol: string;
    marketCapUsd: number;
    priceUsd: number;
    changePercent24Hr: number;
};
