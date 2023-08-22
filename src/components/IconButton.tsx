import React, { FC } from 'react';
import { SvgIconComponent } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

interface IIconButton {
    Icon: SvgIconComponent;
    onClick: (event: React.MouseEvent<unknown>) => void;
    size: 'small' | 'medium' | 'large' | undefined;
}

const CustomIconButton: FC<IIconButton> = ({ Icon, onClick, size }) => {
  return (<IconButton onClick={onClick} size={size}><Icon /></IconButton>);
}

export default CustomIconButton;
