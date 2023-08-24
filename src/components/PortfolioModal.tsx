import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { setPortfolio } from '../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../hooks';
import { coinsApi } from '../services/CoinsService';
import { IPortfolio, IPortfolioTableItem } from '../models/IPortfolio';
import PortfolioTable from './PortfolioTable';
import { portfolioSlice } from '../store/reducers/PortfolioSlice';
import Loader from './Loader';

interface IPortfolioModal {
    handleClose: () => void;
}

const PortfolioModal: FC<IPortfolioModal> = ({handleClose}) => {
    const dispatch = useAppDispatch();

    const { portfolio } = useAppSelector(state => state.portfolio);
    const coinsIds = Array.from(new Set(portfolio.map((item:IPortfolio) => item.id)));
    
    const {data: currentPortfolioCoins, isLoading } = coinsApi.useFetchPopularCoinsQuery(coinsIds.join(','));

    const handleDeleteCoinButton = (index: number) => {
        const newPortfolio = [...portfolio];
        newPortfolio.splice(index, 1);
        console.log(index);
        console.log(portfolio);
        console.log(newPortfolio);
        setPortfolio(newPortfolio);
        dispatch(portfolioSlice.actions.setPortfolioData(newPortfolio));
    };

    const tableData = portfolio?.map((item, index) => {
        const coin = currentPortfolioCoins?.data.find(coin => item.id === coin.id);
        if (coin) {
            return ({
                id: item.id,
                name: coin.name,
                purchasePrice: item.price,
                currentPrice: coin.priceUsd,
                count: item.count,
                index
            });
        };
    });

    return (
        <Dialog open onClose={handleClose} maxWidth={'lg'}>
            <DialogTitle>{`Portfolio list`}</DialogTitle>
            <DialogContent sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                {isLoading && <Loader/>}
                {!isLoading && <PortfolioTable list={tableData as IPortfolioTableItem[]} onDeleteClick={handleDeleteCoinButton} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PortfolioModal;