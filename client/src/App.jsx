import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import Typography from "@mui/material/Typography";
import SearchItem from "./components/SearchItem";
import Stack from "@mui/material/Stack";
import PriceGraph from "./components/PriceGraph";
import { Paper } from "@mui/material";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [searchedCurrency, setSearchedCurrency] = useState("");
  const [currencyPrice, setCurrencyPrice] = useState(() => ({ value: -1, loading: false }));
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    console.log("get all currencies");
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
    console.log("searched for - ", searchedCurrency);

    console.log("get currency price");

    if (!searchedCurrency) return;
    setCurrencyPrice({ ...currencyPrice, loading: true });

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getCurrencyData?curr=${searchedCurrency}`);
        console.log(response);

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
      <Paper>
        <Stack spacing={2}>
          <Typography variant="h1" gutterBottom>
            Crypto info
          </Typography>
          <SearchInput currencies={currencies} setSearchedCurrency={setSearchedCurrency} />
          {searchedCurrency === "" || searchedCurrency === null ? null : (
            <SearchItem
              searchedCurrency={searchedCurrency}
              currencyPrice={currencyPrice.value}
              loading={currencyPrice.loading}
              setShowHistory={setShowHistory}
              showHistory={showHistory}
            />
          )}
          {showHistory ? <PriceGraph searchedCurrency={searchedCurrency} /> : null}
        </Stack>
      </Paper>
    </>
  );
}

export default App;
