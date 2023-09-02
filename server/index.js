const express = require("express");
const app = express();
const port = 3000;

const { fetchAllcurrencies } = require("./cctx_handler");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getAllCurrencies", async (req, res) => {
  const allCurrencies = await fetchAllcurrencies();
  res.send(allCurrencies);
});

app.get("/getCurrencyData", (req, res) => {
  res.send("This is getCurrencyData");
});

app.get("/getCurrencyHistoryPrices", (req, res) => {
  res.send("This is getCurrencyHistoryPrices");
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
