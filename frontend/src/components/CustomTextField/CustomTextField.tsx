import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <TextField
      sx={{ width: '20rem' }}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
