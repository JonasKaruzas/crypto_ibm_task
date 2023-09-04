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
  if (currency === "") return;

  try {
    const currencyData = await exchange.fetchTicker(`${currency}/USDT`);

    return currencyData.last;
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
  }
}

function fetchTimeFrames() {
  return (availableTimeframes = exchange.timeframes);
}

async function fetchHistoryPrices(query) {
  console.log("fetching history");
  const symbol = `${query.curr}/USDT`;
  const timeframe = query.timeframe;
  const limit = query.limit;

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

module.exports = { fetchAllcurrencies, fetchCurrencyData, fetchTimeFrames, fetchHistoryPrices };
