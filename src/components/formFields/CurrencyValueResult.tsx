import { ReactElement } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { useWatch } from 'react-hook-form';

interface IProps<T> {
  placeholder: string;
  name: Extract<keyof T, string>;
  adormentFieldName: Extract<keyof T, string>;
  disabled?: boolean;
}

export function CurrencyValueResult<T>({
  name,
  placeholder,
  adormentFieldName,
  disabled = false
}: IProps<T>): ReactElement {
  const watchFieldValue = useWatch({
    name
  });
  const adormentFieldValue = useWatch({
    name: adormentFieldName
  });

  return (
    <TextField
      placeholder={placeholder}
      fullWidth
      name={name}
      value={watchFieldValue}
      InputProps={{
        readOnly: disabled,
        endAdornment: (
          <InputAdornment position="end">{adormentFieldValue}</InputAdornment>
        )
      }}
    />
  );
}
