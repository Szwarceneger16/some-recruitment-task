import { FC } from 'react';
import { Typography } from '@mui/material';
import { RootStyle, Heading } from 'styles/CurrencyCalcualtorStyles';
import { dictionary } from 'dictionary';

const { errorPageDict } = dictionary;

export const ErrorPage: FC = () => {
  return (
    <RootStyle>
      <Heading>{errorPageDict.mainHeading}</Heading>
      <Typography textAlign="center">{errorPageDict.subHeading}</Typography>
    </RootStyle>
  );
};
