import { Button, Table } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ILabelTypeProp {
  vertical?: boolean;
}

interface IIsOpenProp {
  isOpen?: boolean;
}

export const CustomButtonsWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'vertical'
})<ILabelTypeProp>(({ vertical = false }) => ({
  display: 'flex',
  flexDirection: 'row',
  ...(vertical
    ? { alignItems: 'center', height: '100%' }
    : { justifyContent: 'space-evenly' })
}));

export const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'vertical'
})<ILabelTypeProp>(({ theme, vertical = false }) => ({
  minWidth: '30px',
  lineHeight: 1,
  '& .MuiButton-startIcon': {
    margin: theme.spacing(0.1)
  },
  ...(vertical
    ? {
        textOrientation: 'sideways',
        writingMode: 'vertical-rl',
        padding: `${theme.spacing(1)} ${theme.spacing(0.5)}`,
        margin: 0
      }
    : {
        margin: theme.spacing(0.5),
        [theme.breakpoints.down('sm')]: {
          fontSize: '1rem'
        }
      })
}));

export const TableWrapper = styled('div')(() => ({
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 1,
  padding: 1,
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  border: '1px solid white',
  '& .MuiTableCell-body,.MuiTableCell-head': {
    color: theme.palette.common.white
  },
  scrollbarColor: `${theme.palette.common.white} ${theme.palette.common.black}`
}));

export const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<IIsOpenProp>(({ theme, isOpen = false }) => ({
  backgroundColor: theme.palette.primary.main,
  border: '1px solid grey',
  boxShadow: '0px 0px 5px grey',
  borderRadius: '10px',
  height: '400px',
  width: isOpen ? '400px' : '70px',
  [theme.breakpoints.up('md')]: {
    width: isOpen ? '500px' : '70px',
    height: '500px'
  },
  margin: 4,
  padding: 8,
  paddingLeft: 30,
  transform: 'translateX(-30px)',
  [theme.breakpoints.down('sm')]: {
    transform: 'translateY(-30px)',
    paddingTop: '30px'
  },
  display: 'flex',
  flexDirection: 'column'
}));
