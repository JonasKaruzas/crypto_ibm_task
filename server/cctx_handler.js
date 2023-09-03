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

async function fetchCurrencyData(currency) {
  console.log("fetchingCurData");
  console.log(currency);
  console.log(typeof currency);
  if (currency === "") return;

  try {
    const currencyData = await exchange.fetchTicker(`${currency}/USDT`);

    return currencyData.last;
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
  }
}

async function fetchHistoryPrices() {
  const availableTimeframes = exchange.timeframes;

  console.log(availableTimeframes);

  console.log("fetching history");
  const symbol = "BTC/USDT";
  const timeframe = "1d";
  const limit = 2;

  try {
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);

    return ohlcv;
    // ohlcv.forEach((candle, index) => {
    //   console.log(`Candle ${index + 1}:`, {
    //     timestamp: new Date(candle[0]),
    //     open: candle[1],
    //     high: candle[2],
    //     low: candle[3],
    //     close: candle[4],
    //     volume: candle[5],
    //   });
    // });
  } catch (error) {
    console.error("Error fetching historical data:", error);
  }
}

module.exports = { fetchAllcurrencies, fetchCurrencyData, fetchHistoryPrices };
