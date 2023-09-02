import { useEffect, useState } from 'react'

function App() {
  const [currencies, setCurrencies] = useState([])

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

  return (
    <>
      <div>
        {currencies.map(item => 
        <div key={item}>{item}</div>
        )}
      </div>
    </>
  )
}

export default App
