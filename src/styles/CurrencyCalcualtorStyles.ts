import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const Heading = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.primary.main,
  textShadow: '1px 1px grey',
  fontWeight: 'bold',
  fontSize: '1.4rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem'
  },
  padding: '40px 0'
}));

export const SubHeading = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.primary.dark,
  fontWeight: 'normal',
  fontSize: '0.8rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem'
  },
  padding: '40px 0'
}));

export const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'rgb(255, 255, 255)',
  border: '1px solid grey',
  boxShadow: '0px 0px 5px grey',
  borderRadius: '10px',
  width: '400px',
  height: '400px',
  [theme.breakpoints.up('md')]: {
    width: '500px',
    height: '500px'
  },
  margin: 4,
  padding: 8,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column'
}));

export const CustomStyledButton = styled(LoadingButton)(({ theme }) => ({
  width: '100%',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main
}));

export const MainFormButtonsWrapper = styled('div')(({ theme }) => ({
  margin: `${theme.spacing(1)} auto ${theme.spacing(3)} auto`,
  position: 'relative',
  width: 'min-content',
  alignSelf: 'center'
}));

export const CurrencyTypesWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr);',
  textAlign: 'center',
  alignItems: 'center'
}));
