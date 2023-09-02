var ccxt = require("ccxt");

const exchange = new ccxt.binance();

async function fetchAllcurrencies() {
  try {
    const markets = await exchange.loadMarkets();
    let currencies = exchange.currencies;

    const currencyList = Object.keys(currencies);

    return currencyList;
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
  }
}

module.exports = { fetchAllcurrencies };
