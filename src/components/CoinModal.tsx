import React, { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getPortfolio, setPortfolio } from '../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../hooks';
import { coinsApi } from '../services/CoinsService';
import { IPortfolio } from '../models/IPortfolio';
import { portfolioSlice } from '../store/reducers/PortfolioSlice';

interface ICoinModal {
    handleClose: () => void;
}

const CoinModal: FC<ICoinModal> = ({handleClose}) => {
    const dispatch = useAppDispatch();
    const [count, setCount] = React.useState<string>('');

    const { coinId } = useAppSelector(state => state.coinModal);
    const {data, error, isLoading} = coinsApi.useFetchCoinQuery(coinId);

    const handleBuyButton = () => {
        if (!count || +count < 0 || +count > 1000) {
            return;
        }
        
        let updated = false;

        const portfolio = getPortfolio().map((item: IPortfolio) => {
            if (item?.id === coinId && item?.price === data?.data.priceUsd) {
                updated= true;
                return {
                    id: coinId,
                    price: data?.data.priceUsd,
                    count: +item.count + +count,
                }
            }
            return item;
        });

        if (!updated) {
            portfolio.push({
                    id: coinId,
                    price: data?.data.priceUsd,
                    count,
            })
        }
        
        setPortfolio(portfolio);
        dispatch(portfolioSlice.actions.setPortfolioData(portfolio));
        handleClose();
    };

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>{`Do you want to buy ${data?.data.name}?`}</DialogTitle>
            <DialogContent sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <TextField
                    id="outlined-count"
                    label="Count"
                    sx={{
                        m:2,
                    }}

                    inputProps={{
                        step: 1,
                        min: 0,
                        max: 1000,
                        type: 'number',
                        pattern: '[0-9]*',
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCount(event.target.value) }
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleBuyButton}>Buy</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CoinModal;