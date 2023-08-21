import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface IButton {
    text: string;
    onClick: () => void;
    size: 'small' | 'medium' | 'large' | undefined;
}

const CustomButton: FC<IButton> = ({text, onClick, size}) => {
  return <Button onClick={onClick} size={size}>{text}</Button>;
}

export default CustomButton;