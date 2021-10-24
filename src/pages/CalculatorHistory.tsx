import { FC, ReactElement, useContext } from 'react';
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { IHistoryData } from 'shared/globalTypes';
import { HistoryDataContext } from 'components/historyData/historyDataContext';
import {
  TableWrapper,
  CustomButton,
  CustomButtonsWrapper,
  StyledTable,
  RootStyle
} from 'styles/CalculatorHistoryStyles';
import { dictionary } from 'dictionary';

export interface HistoryStylesProps {
  isOpen: boolean;
}

const { currencyHistoryDict } = dictionary;

export const CalculatorHistory: FC<HistoryStylesProps> = ({ isOpen }) => {
  const history = useHistory();
  const historyDataContext = useContext(HistoryDataContext);

  const toggleHistoryPage = () =>
    isOpen ? history.push('/') : history.push('/history');

  const transferHistoryData = historyDataContext?.get();

  return (
    <RootStyle isOpen={isOpen}>
      {isOpen ? (
        <>
          <HistoryDataTable data={transferHistoryData} />
          <CustomButtonsWrapper>
            <CustomButton
              variant="outlined"
              color="secondary"
              onClick={() => historyDataContext.clear()}
            >
              {currencyHistoryDict.clearHistoryButton}
            </CustomButton>
            <HistoryHeading
              isOpened={true}
              toggleHistoryPageCallback={() => toggleHistoryPage()}
            />
          </CustomButtonsWrapper>
        </>
      ) : (
        <CustomButtonsWrapper vertical>
          <HistoryHeading
            isOpened={false}
            toggleHistoryPageCallback={() => toggleHistoryPage()}
          />
        </CustomButtonsWrapper>
      )}
    </RootStyle>
  );
};

function HistoryDataTable({
  data
}: {
  data: Array<IHistoryData>;
}): ReactElement {
  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>
                {currencyHistoryDict.table.dateHeading}
              </TableCell>
              <TableCell style={{ width: '20%' }} align="center">
                {currencyHistoryDict.table.sourceCurrencyHeading}
              </TableCell>
              <TableCell style={{ width: '10%' }} align="center"></TableCell>
              <TableCell style={{ width: '20%' }} align="center">
                {currencyHistoryDict.table.targetCurrencyHeading}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: IHistoryData) => (
              <TableRow
                key={
                  row.dateOfConversion.toString() +
                  row.inCurrencyValue.toString() +
                  row.inCurrencyType.toString()
                }
              >
                <TableCell style={{ width: '50%' }} scope="row">
                  {row.dateOfConversion
                    .toISOString()
                    .replace('T', ' ')
                    .replace(/.\d\d\dZ/, '')}
                </TableCell>
                <TableCell style={{ width: '20%' }} align="center">
                  {(row.inCurrencyValue as number).toFixed(2) +
                    ' ' +
                    row.inCurrencyType}
                </TableCell>
                <TableCell style={{ width: '5%' }} align="center">
                  <ArrowRightAltIcon />
                </TableCell>
                <TableCell style={{ width: '20%' }} align="center">
                  {(row.outCurrencyValue as number).toFixed(2) +
                    ' ' +
                    row.outCurrencyType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </TableWrapper>
  );
}

function HistoryHeading({
  isOpened,
  toggleHistoryPageCallback
}: {
  isOpened: boolean;
  toggleHistoryPageCallback: VoidFunction;
}): ReactElement {
  return (
    <CustomButtonsWrapper>
      <CustomButton
        vertical={!isOpened}
        color="secondary"
        variant="outlined"
        size="small"
        startIcon={isOpened ? <CloseIcon /> : undefined}
        onClick={toggleHistoryPageCallback}
      >
        {isOpened
          ? currencyHistoryDict.toggleHistoryView.hide
          : currencyHistoryDict.toggleHistoryView.show}
      </CustomButton>
    </CustomButtonsWrapper>
  );
}
