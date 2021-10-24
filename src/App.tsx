import { ReactElement, useRef } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrencyCalcualtor } from 'pages/CurrencyCalcualtor';
import { CalculatorHistory } from 'pages/CalculatorHistory';
import { HistoryDataProvider } from 'components/historyData/historyDataProvider';
import { RootElementStyle } from 'styles/app';
import { theme } from 'styles/defualtTheme';

function App(): ReactElement {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          retry: 2,
          staleTime: 2 * 60 * 1000
        }
      }
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <HistoryDataProvider loader={<CircularProgress />}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RootElementStyle>
            <BrowserRouter>
              <Switch>
                <Route path="/history">
                  <CurrencyCalcualtor />
                  <CalculatorHistory isOpen={true} />
                </Route>
                <Route path="/">
                  <CurrencyCalcualtor />
                  <CalculatorHistory isOpen={false} />
                </Route>
              </Switch>
            </BrowserRouter>
          </RootElementStyle>
        </ThemeProvider>
      </HistoryDataProvider>
    </QueryClientProvider>
  );
}

export default App;
