import { styled } from '@mui/system';

export const RootElementStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  height: 'inherit',
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  },
  minHeight: 'inherit',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const FormLayoutWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',

  flexDirection: 'column',
  '& > *': {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  [theme.breakpoints.up('sm')]: {
    '& > *': {
      marginBottom: 15,
      marginTop: 15,
      marginLeft: 20,
      marginRight: 20
    }
  },
  '& > .currencyTypeSelectors': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
}));
