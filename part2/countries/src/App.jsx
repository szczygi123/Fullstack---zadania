import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesList =({countries}) => {
  return(
    <ul>
        {countries.map(country => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => { setFilter(event.target.value) }

  const FiltrCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
      <CountriesList countries={FiltrCountries}/>
    </div>
  )
}

export default App
