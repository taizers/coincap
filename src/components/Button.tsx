import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface IButton {
    text: string;
    onClick: () => void;
    size: 'small' | 'medium' | 'large' | undefined;
    variant: 'contained' | 'text' | 'outlined' | undefined;
}

const CustomButton: FC<IButton> = ({text, onClick, size, variant}) => {
  return <Button variant={variant} onClick={onClick} size={size}>{text}</Button>;
}

export default CustomButton;