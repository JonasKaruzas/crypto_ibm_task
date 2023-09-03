import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import Typography from "@mui/material/Typography";
import SearchItem from "./components/SearchItem";
import Stack from "@mui/material/Stack";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [searchedCurrency, setSearchedCurrency] = useState("");
  const [currencyPrice, setCurrencyPrice] = useState(() => ({ value: "", loading: false }));
  const [btcHistory, setBtcHistory] = useState("");

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
    console.log("get currency price");

    if (!searchedCurrency) return;
    setCurrencyPrice({ ...currencyPrice, loading: true });
    console.log(currencyPrice);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getCurrencyData?curr=${searchedCurrency}`);
        if (!response.ok) {
          throw new Error("Failed");
        }

        const jsonData = await response.json();
        setCurrencyPrice({ value: jsonData, loading: false });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(currencyPrice);
  }, [searchedCurrency]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/getCurrencyHistoryPrices");
  //       if (!response.ok) {
  //         throw new Error("Failed");
  //       }

  //       const jsonData = await response.json();
  //       setBtcHistory(jsonData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h1" gutterBottom>
          Crypto info
        </Typography>
        <SearchInput currencies={currencies} setSearchedCurrency={setSearchedCurrency} />
        <SearchItem searchedCurrency={searchedCurrency} currencyPrice={currencyPrice.value} loading={currencyPrice.loading} />
      </Stack>
    </>
  );
}

export default App;
