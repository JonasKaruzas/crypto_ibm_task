var ccxt = require("ccxt");

const exchange = new ccxt.binance();

async function fetchAllcurrencies() {
  try {
    const markets = await exchange.loadMarkets();

    const cryptocurrencies = Object.keys(markets);

    return cryptocurrencies;
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
  }
}

module.exports = { fetchAllcurrencies };
