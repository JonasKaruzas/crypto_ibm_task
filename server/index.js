const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const { fetchAllcurrencies, fetchCurrencyData, fetchTimeFrames, fetchHistoryPrices } = require("./cctx_handler");
const { fetchCryptoNamesAndIcons } = require("./cryptoComparison_handler");

const { addSearch, addSelect, getSearchData, getSelectData } = require("./mongodb_handler");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getAllCurrencies", async (req, res) => {
  const allCurrencies = await fetchAllcurrencies();
  const allCurrenciesData = await fetchCryptoNamesAndIcons();

  const mergedInfo = allCurrencies.map((item) => ({
    symbol: item,
    FullName: allCurrenciesData[item]?.FullName || `(${item})`,
    imageUrl: allCurrenciesData[item]?.ImageUrl || "",
  }));

  res.json(mergedInfo);
});

app.get("/getCurrencyData", async (req, res) => {
  console.log(`User searched for - ${req.query.curr}`);
  addSearch(req.query.curr);
  const currencyData = await fetchCurrencyData(req.query.curr);

  if (currencyData === undefined) {
    res.send("-1");
    return;
  }

  res.json(currencyData);
});

app.get("/getTimeframes", async (req, res) => {
  const currencyData = await fetchTimeFrames();
  res.json(currencyData);
});

app.get("/getCurrencyHistoryPrices", async (req, res) => {
  console.log(`User selected - ${req.query.curr}`);
  addSelect(req.query.curr);
  const currencyData = await fetchHistoryPrices(req.query);
  res.json(currencyData);
});

app.get("/userSearch", async (req, res) => {
  const data = await getSearchData();
  res.json(data);
});

app.get("/userSelect", async (req, res) => {
  const data = await getSelectData();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
