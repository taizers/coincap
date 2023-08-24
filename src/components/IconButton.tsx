import React, { FC, MouseEvent } from 'react';
import { SvgIconComponent } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

interface IIconButton {
    Icon: SvgIconComponent;
    onClick: (event?: MouseEvent<unknown>) => void;
    size?: 'small' | 'medium' | 'large';
}

const CustomIconButton: FC<IIconButton> = ({ Icon, onClick, size = 'medium' }) => {
  return (<IconButton onClick={onClick} size={size}><Icon /></IconButton>);
}

export default CustomIconButton;
