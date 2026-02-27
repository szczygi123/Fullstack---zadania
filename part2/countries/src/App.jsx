import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesList =({countries, onShow}) => {
  return(
    <ul>
        {countries.map(country => (
          <li key={country.name.common}>{country.name.common}
            <button onClick={() => onShow(country)}>Show</button>          
          </li>
        ))}
    </ul>
  )
}

const CountriesDetails = ({ country }) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country && country.capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
    })}
  }, [country, api_key])


  if (!weather) {
    return <div>Pobieranie danych pogodowych...</div>
  }


  const iconCode = weather.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} width="150" />

      <h3>Weather in {country.capital}</h3>
      <p>Temperature {weather.main.temp} Celsius</p>
      
      <img src={iconUrl} alt={weather.weather[0].description} />
      
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [shownCountry, setShownCountry] = useState(null) 

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => { 
    setFilter(event.target.value) 
    setShownCountry(null)
  }

  const filtrCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  let content
  if (shownCountry) {
    content = <CountriesDetails country={shownCountry} />
  }else if (filter === '') {
    content = <p></p>
  } else if (filtrCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (filtrCountries.length > 1) {
    content = <CountriesList countries={filtrCountries} onShow={setShownCountry} />  
  } else if (filtrCountries.length === 1) {
    content = <CountriesDetails country={filtrCountries[0]} />
  }


  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
      {content}
    </div>
  )
}

export default App
