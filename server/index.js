const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const { fetchAllcurrencies, fetchCurrencyData, fetchHistoryPrices } = require("./cctx_handler");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getAllCurrencies", async (req, res) => {
  const allCurrencies = await fetchAllcurrencies();
  res.json(allCurrencies);
});

app.get("/getCurrencyData", async (req, res) => {
  const currencyData = await fetchCurrencyData();
  res.json(currencyData);
});

app.get("/getCurrencyHistoryPrices", async (req, res) => {
  const currencyData = await fetchHistoryPrices();
  res.json(currencyData);
});

app.post("/userSearch", (req, res) => {
  res.send("This is userSearch");
});

app.post("/userSelection", (req, res) => {
  res.send("This is userSelection");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
