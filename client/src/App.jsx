import { useEffect, useState } from 'react'

function App() {
  const [currencies, setCurrencies] = useState([])
  const [btcPrice, setBtcPrice] = useState('')
  const [btcHistory, setBtcHistory] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getAllCurrencies')
        if (!response.ok) {
          throw new Error('Failed')
        }

        const jsonData = await response.json()
        setCurrencies(jsonData)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  },[] )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCurrencyData')
        if (!response.ok) {
          throw new Error('Failed')
        }

        const jsonData = await response.json()
        setBtcPrice(jsonData)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  },[] )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCurrencyHistoryPrices')
        if (!response.ok) {
          throw new Error('Failed')
        }

        const jsonData = await response.json()
        setBtcHistory(jsonData)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  },[] )

  return (
    <>
    <div>BTC history - {btcHistory}</div>
    <div>BTC - {btcPrice}</div>
      <div>
        {currencies.map(item => 
        <div key={item}>{item}</div>
        )}
      </div>
    </>
  )
}

export default App
