# Crypto IBM task

## Overview

This is a technical challange task.
The main task was to use cctx library, get crypto currencies, add a selector, show the price.

Additionaly:

- Created API endpoints, to have all calculations in Node.
- Added a price graph for historical prices.
- Used CryptoCompare endpoint, to fetch full names and icons for the currancies
- Added Analysis dialog, to show what currencies were most searched and selected (to view the graph)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation) (if applicable)

## Installation

```bash
# Clone the repository
git clone https://github.com/JonasKaruzas/crypto_ibm_task.git

# Navigate to the client directory
cd client

# Install client dependencies
npm install

# Navigate to the server directory
cd ../server

# Install server dependencies
npm install

# Run both client and server concurrently.
npm run dev
```

## API Documentation

### API Endpoints

#### `GET /getAllCurrencies`

Retrieve a list of all crypto currencies.

**Response:**

- Status Code: 200 OK
- Body:

```json
[
  {
    "symbol": "1000FLOKI",
    "FullName": "(1000FLOKI)",
    "imageUrl": ""
  },
  {
    "symbol": "ALICE",
    "FullName": "My Neighbor Alice (ALICE)",
    "imageUrl": "https://www.cryptocompare.com/media/37746591/alice.png"
  }
]
```

#### `GET /getCurrencyData`

Retrieve a number of last price for currency.

**Request:**

- Query Parameters:
  - `curr`: Currency for which we want to fetch the price.

**Response:**

- Status Code: 200 OK
- Body:

```json
0.001824
```

#### `GET /getTimeframes`

Retrieve a list of timeframes, that will be used for fetching history data.

**Response:**

- Status Code: 200 OK
- Body:

```json
{
  "1s": "1s",
  "1m": "1m",
  "3m": "3m",
  "5m": "5m",
  "15m": "15m",
  "30m": "30m",
  "1h": "1h",
  "2h": "2h",
  "4h": "4h",
  "6h": "6h",
  "8h": "8h",
  "12h": "12h",
  "1d": "1d",
  "3d": "3d",
  "1w": "1w",
  "1M": "1M"
}
```

#### `GET /getCurrencyHistoryPrices`

Retrieve a list of hitorical data of crypto price.

**Request:**

- Query Parameters:
  - `curr` : Currency for which we want to fetch the data.
  - `timeframe` : What is the timeframe between data ponts.
  - `limit` : The number of data points.

**Response:**

- Status Code: 200 OK
- Body:

```json
[
  [1693814400000, 0.001831, 0.001855, 0.001828, 0.001844, 47057442],
  [1693828800000, 0.001844, 0.001853, 0.001807, 0.001814, 91181420]
]
```

#### `GET /userSearch`

Retrieve a list searches made by user.

**Response:**

- Status Code: 200 OK
- Body:

```json
[
  {
    "_id": "DOGE",
    "count": 2
  },
  {
    "_id": "ADA",
    "count": 1
  }
]
```

#### `GET /userSelect`

Retrieve a list selects made by user.

**Response:**

- Status Code: 200 OK
- Body:

```json
[
  {
    "_id": "DOGE",
    "count": 2
  },
  {
    "_id": "ADA",
    "count": 1
  }
]
```
