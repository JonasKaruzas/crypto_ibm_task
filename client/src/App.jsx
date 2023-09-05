import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import SearchItem from "./components/SearchItem";
import Stack from "@mui/material/Stack";
import PriceGraph from "./components/PriceGraph";
import { Box, Fab, Paper } from "@mui/material";
import AnalyticsDialog from "./components/AnalyticsDialog";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [searchedCurrency, setSearchedCurrency] = useState(null);
  const [currencyPrice, setCurrencyPrice] = useState(() => ({ value: -1, loading: false }));
  const [showHistory, setShowHistory] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllCurrencies");
        if (!response.ok) {
          throw new Error("Failed");
        }

        const jsonData = await response.json();
        setCurrencies(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchedCurrency) {
      setShowHistory(false);
      return;
    }

    setCurrencyPrice({ ...currencyPrice, loading: true });

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getCurrencyData?curr=${searchedCurrency}`);

        if (!response.ok) {
          setCurrencyPrice({ currencyPrice: -1, loading: false });
          return;
        }

        const jsonData = await response.json();
        setCurrencyPrice({ value: jsonData, loading: false });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchedCurrency]);

  return (
    <>
      <Paper className="app">
        <Fab variant="extended" onClick={() => setOpenDialog(true)}>
          Analysis
        </Fab>
        <Stack spacing={2}>
          <Box className="app__title">
            <Box className="app__title--top">CRYPTO</Box>
            <Box className="app__title--bottom">INFO</Box>
          </Box>

          <SearchInput currencies={currencies} setSearchedCurrency={setSearchedCurrency} />

          {searchedCurrency && (
            <SearchItem
              searchedCurrency={searchedCurrency}
              currencies={currencies}
              currencyPrice={currencyPrice.value}
              loading={currencyPrice.loading}
              setShowHistory={setShowHistory}
              showHistory={showHistory}
            />
          )}

          {showHistory && <PriceGraph searchedCurrency={searchedCurrency} />}
        </Stack>
      </Paper>
      <AnalyticsDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}

export default App;
