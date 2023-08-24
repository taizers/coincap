import React, { FC } from 'react';
import Button from '@mui/material/Button';

interface IButton {
  text: string;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'text' | 'outlined';
}

const CustomButton: FC<IButton> = ({
  text,
  onClick,
  size = 'medium',
  variant = 'contained',
}) => {
  return (
    <Button variant={variant} onClick={onClick} size={size}>
      {text}
    </Button>
  );
};

export default CustomButton;
